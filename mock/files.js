import chance from 'chance';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'fs';

const generateFile = function* ()
{
    yield {
        key: chance().guid(),
        name: chance().string({
            alpha: true,
            number: false,
            symbols: false,
            length: 12
        }),
        type: 'PDF'
    };
};

export default {
    'GET /api-local/files': (req, res) =>
    {
        const {
            skip = 0,
            pageSize = 10,
            q
        } = req.query;

        if (!existsSync('./.data'))
        {
            mkdirSync('./.data');

        }

        //check if the file exists
        if (!existsSync('./.data/files.json'))
        {
            const generatedUsers = [
                ...Array.from({length: 100}, () => generateFile().next().value)
            ];

            writeFileSync('./.data/files.json', JSON.stringify(generatedUsers));
        }

        const dataset = JSON.parse(readFileSync('./.data/files.json', 'utf8').toString());

        const current = Number(skip);
        const next = Number(skip) + Number(pageSize);

        const resultingDataset = q ? dataset.filter(user => user.name.toLowerCase().includes(q.toLowerCase())).slice(current, next) : dataset.slice(current, next);

        res.status(200).json({
            data: resultingDataset,
            total: dataset.length,
            pageSize: Number(pageSize)
        });
    }
};
