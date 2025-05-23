import request, {RequestOptionsInit} from 'umi-request';
import {SESSION_STORAGE_KEY} from '@/hooks/useSession';

const url = process.env.NODE_ENV === 'development' ? '/api' : '/api';

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

    let rawParsed: { session?: import('./@types/session').Session } = {};
    try
    {
        rawParsed = JSON.parse(raw);
    }
    catch (e)
    {
        return {};
    }

    const {session} = rawParsed;

    const token = session?.token;

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
    if ((response.status === 403 || response.status === 401) && !response.url.includes('/auth/login'))
    {
        localStorage.clear();
        location.href = '/';
    }

    return response;
});

export const apiGet = (apiUrl: string, options?: RequestOptionsInit) => request.get(apiUrl, options);

export const apiPost = (apiUrl: string, options?: RequestOptionsInit) => request.post(apiUrl, options);

export const apiPut = (apiUrl: string, options?: RequestOptionsInit) => request.put(apiUrl, options);

export const apiDelete = (apiUrl: string, options?: RequestOptionsInit) => request.delete(apiUrl, options);