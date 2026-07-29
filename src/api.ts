import request, {type RequestOptionsInit} from 'umi-request';
import {readStoredSession, SESSION_STORAGE_KEY} from '@/hooks/useSession';

const url = '/api-local';

const REQUEST_TIMEOUT = 60000;

export const endpoints = {
    login: `${url}/auth/login`,
    files: `${url}/files`,
    users: `${url}/users`
};

const authorizationHeader = (): Record<string, string> =>
{
    const token = readStoredSession()?.token;

    return token ? {Authorization: `Bearer ${token}`} : {};
};

request.interceptors.request.use(
    (requestUrl, options) =>
    ({
        url: requestUrl,
        options: {
            ...options,
            timeout: REQUEST_TIMEOUT,
            headers: {
                ...(options.headers as Record<string, string>),
                ...authorizationHeader()
            }
        }
    }),
    {global: true}
);

request.interceptors.response.use(response =>
{
    // The login service answers 401 on bad credentials; that is for the login page to handle, not a dead session.
    const isLoginRequest = response.url.endsWith(endpoints.login);
    const isRejected = response.status === 401 || response.status === 403;

    if (isRejected && !isLoginRequest && location.pathname !== '/logout')
    {
        localStorage.removeItem(SESSION_STORAGE_KEY);
        location.href = '/logout';
    }

    return response;
});

export const apiGet = (apiUrl: string, options?: RequestOptionsInit) => request.get(apiUrl, options);

export const apiPost = (apiUrl: string, options?: RequestOptionsInit) => request.post(apiUrl, options);

export const apiPut = (apiUrl: string, options?: RequestOptionsInit) => request.put(apiUrl, options);

export const apiDelete = (apiUrl: string, options?: RequestOptionsInit) => request.delete(apiUrl, options);
