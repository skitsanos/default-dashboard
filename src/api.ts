import request, {RequestOptionsWithResponse} from 'umi-request';

const url = '/api-local';

export const endpoints = {
    login: `${url}/auth/login`,
    files: `${url}/files`,
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

export const apiGet = (apiUrl: string, options?: RequestOptionsWithResponse) => request.get(apiUrl, options);

export const apiPost = (apiUrl: string, options?: RequestOptionsWithResponse) => request.post(apiUrl, options);

export const apiPut = (apiUrl: string, options?: RequestOptionsWithResponse) => request.put(apiUrl, options);

export const apiDelete = (apiUrl: string, options?: RequestOptionsWithResponse) => request.delete(apiUrl, options);