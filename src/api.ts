import request, {RequestOptionsInit} from 'umi-request';
import {SESSION_STORAGE_KEY} from '@/hooks/useSession';

const url = '/api-local';

export const endpoints = {
    login: `${url}/auth/login`,
    files: `${url}/files`,
    users: `${url}/users`
};

const authorizationHeader = () =>
{
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw || raw.length === 0)
    {
        return {};
    }

    let rawParsed = {};
    try
    {
        rawParsed = JSON.parse(raw);
    }
    catch (e)
    {
        //
    }

    const {session} = rawParsed as Record<string, any>;

    const {token} = session as Record<string, any>;

    return token ? {'Authorization': `Bearer ${token}`} : {};
};

request.interceptors.request.use(
    (requestUrl, options) =>
    {
        options.headers = {
            ...options.headers,
            ...authorizationHeader()
        };

        return {
            url: requestUrl,
            options: {
                ...options,
                timeout: 60000
            }
        };
    },
    {global: true}
);

request.interceptors.response.use(response =>
{
    //const data = await response.clone().json();
    //skip 403s from login service itself
    if ((response.status === 403 || response.status === 401) && !response.url.endsWith(endpoints.login))
    {
        localStorage.clear();
        location.href = '/logout';
    }

    return response;
});

export const apiGet = (apiUrl: string, options?: RequestOptionsInit) => request.get(apiUrl, options);

export const apiPost = (apiUrl: string, options?: RequestOptionsInit) => request.post(apiUrl, options);

export const apiPut = (apiUrl: string, options?: RequestOptionsInit) => request.put(apiUrl, options);

export const apiDelete = (apiUrl: string, options?: RequestOptionsInit) => request.delete(apiUrl, options);