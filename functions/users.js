exports.handler = async (event, context) =>
{
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data: [],
            pageSize: 10,
            total: 0
        })
    };
};