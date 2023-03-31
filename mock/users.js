import chance from 'chance';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'fs';

const generateUser = function* () {
    yield {
        key: chance().guid(),
        name: chance().name(),
        email: chance().email(),
        uuiid: chance().guid(),
        avatar: chance().avatar()
    };
};

export default {
    'GET /api/users': (req, res) => {
        const {skip = 0, pageSize = 10, q} = req.query;

        if (!existsSync('./.data')) {
            mkdirSync('./.data');


        }

        //check if the file exists
        if (!existsSync('./.data/users.json')) {
            const generatedUsers = [
                {
                    key: 'user-skitsanos',
                    name: 'Evgenios Skitsanos',
                    email: chance().email(),
                    uuiid: chance().guid()
                },
                ...Array.from({length: 100}, () => generateUser().next().value)
            ];

            writeFileSync('./.data/users.json', JSON.stringify(generatedUsers));
        }

        const dataset = JSON.parse(readFileSync('./.data/users.json', 'utf8').toString());

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
