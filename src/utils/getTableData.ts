import {apiGet} from '@/api';

export interface TableRequest
{
    current?: number;
    pageSize?: number;
    query?: string;
}

export interface TableData<T>
{
    total: number;
    list: T[];
}

/**
 * Adapts the `{data, total}` payload served by the mock/Netlify endpoints to the `{list, total}` shape
 * ProTable-style components expect.
 */
const getTableData = async <T = unknown>(url: string, {
    current = 1,
    pageSize = 10,
    query = ''
}: TableRequest): Promise<TableData<T>> =>
{
    const skip = Math.max(0, current - 1) * pageSize;

    const params = new URLSearchParams({
        skip: String(skip),
        pageSize: String(pageSize),
        q: query
    });

    const {
        total = 0,
        data = []
    } = (await apiGet(`${url}?${params}`)) as {total?: number; data?: T[]};

    return {
        total,
        list: data
    };
};

export default getTableData;
