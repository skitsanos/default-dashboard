import {apiGet} from '@/api';

const getTableData = async (url, {current, pageSize, query = ''}) =>
{
    const skip = current === 1 ? 0 : current * pageSize - pageSize;

    const q = query !== '' ? `${query}` : '';

    try
    {
        const apiCallResult = await apiGet(`${url}?skip=${skip}&pageSize=${pageSize}&q=${q}`);
        const {total, data} = apiCallResult;

        if (apiCallResult)
        {
            return ({
                total,
                data
            });
        }

        return {total: 0, data: []};
    }
    catch (e)
    {
        return Promise.reject(e);
    }
};

export default getTableData;