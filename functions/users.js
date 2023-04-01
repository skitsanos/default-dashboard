const requestResult = require('./requestResult');
const chance = require('chance');

const generateUser = function* (seed)
{
    yield {
        key: chance(seed).guid(),
        name: chance(seed).name(),
        email: chance(seed).email({domain: 'mock.local'}),
        uuid: chance(seed).guid(),
        avatar: chance(seed).avatar(),
        contact: {
            phone: chance(seed).phone(),
            cell: chance(seed).phone(),
            address: chance(seed).address(),
            city: chance(seed).city(),
            state: chance(seed).state(),
            country: chance(seed).country(),
            postcode: chance(seed).postal()
        }
    };
};

exports.handler = async (event, _context) =>
{
    const {
        seed = 0,
        q,
        pageSize = 10,
        skip = 0
    } = event.queryStringParameters;

    // Set headers to enable CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
    };

    // Return empty response for preflight requests
    if (event.httpMethod === 'OPTIONS')
    {
        return requestResult(204, null);
    }

    // Handle GET request
    if (event.httpMethod === 'GET')
    {

        const generatedUsers = [
            ...Array.from({length: 101}, () => generateUser(seed).next().value)
        ];
        generatedUsers[0].name = 'Evgenios Skitsanos';
        generatedUsers[0].email = 'info@skitsanos.com';

        const current = Number(skip);
        const next = Number(skip) + Number(pageSize);

        const resultingDataset = q ? generatedUsers.filter(user => user.name.toLowerCase().includes(q.toLowerCase())).slice(current, next) : generatedUsers.slice(current, next);

        try
        {
            // Your logic to handle the GET request goes here
            const data = {
                data: resultingDataset,
                total: generatedUsers.length,
                pageSize: Number(pageSize),
                skip
            };

            // Return response with JSON payload
            return requestResult(200, data);
        }
        catch (error)
        {
            // Return error response with JSON payload
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({
                    error: error.message
                })
            };
        }
    }

    // Handle unsupported HTTP methods
    return requestResult(405, {message: 'Method Not Allowed'});
};