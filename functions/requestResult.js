const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
};

const requestResult = (status, data) =>
{
    const result = {
        headers,
        statusCode: status,
        body: null
    };

    switch (true)
    {
        case status === 200:
        case status === 201:
            result.body = JSON.stringify(data);
            break;

        case status === 204:
            result.body = null;
            break;

        case status >= 400 && status < 500:
            result.body = JSON.stringify({
                error: data
            });
            break;

        case status >= 500:
            result.body = JSON.stringify({
                status,
                error: data
            });
            break;

        default:
            result.body = JSON.stringify({
                status
            });
    }

    return result;
};

module.exports = requestResult;
