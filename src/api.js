import request from 'umi-request';

const url = '/api';

export const endpoints = {
    login: `${url}/auth/login`,
    users: `${url}/users`
};

const authorizationHeader = () =>
{
    const token = localStorage.getItem('token');

    return token ? {'Authorization': `Bearer ${token}`} : undefined;
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
        location.href = '/logout';
    }

    return response;
});

export const apiGet = (apiUrl, options) => request.get(apiUrl, options);

export const apiPost = (apiUrl, options) => request.post(apiUrl, options);

export const apiPut = (apiUrl, options) => request.put(apiUrl, options);

export const apiDelete = (apiUrl, options) => request.delete(apiUrl, options);