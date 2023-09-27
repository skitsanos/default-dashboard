import {apiGet} from '@/api';

const getTableData = async (url: string, {
    current,
    pageSize,
    query = ''
}) =>
{
    const skip = current === 1 ? 0 : current * pageSize - pageSize;

    const q = query !== '' ? `${query}` : '';

    try
    {
        const apiCallResult = await apiGet(`${url}?skip=${skip}&pageSize=${pageSize}&q=${q}`);
        const {
            total,
            data
        } = apiCallResult as Record<string, any>;

        if (apiCallResult)
        {
            return ({
                total,
                list: data
            });
        }

        return {
            total: 0,
            list: []
        };
    }
    catch (e)
    {
        return Promise.reject(e);
    }
};

export default getTableData;