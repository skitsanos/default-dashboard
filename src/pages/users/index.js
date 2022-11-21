import ContentArea from '@/components/ContentArea';
import {Avatar, Button, Space, Table} from 'antd';
import chance from 'chance';

const generateUser = function* ()
{
    yield {
        id: chance().guid(),
        name: chance().name(),
        email: chance().email(),
        avatar: chance().avatar()
    };
};

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        render: (_, row) => <Space>
            <Avatar src={`${row.avatar}?d=retro`}/>
            <span>{row.name}</span>
        </Space>
    },
    {
        title: 'Email',
        dataIndex: 'email'
    }
];

const Page = props =>
{
    const {history} = props;

    const data = Array.from({length: 20}, () => generateUser().next().value);
    console.log(data);

    return <ContentArea title={'Users'}>

        <Table columns={columns}
               rowKey={'uid'}
               dataSource={data}/>

        <Button type={'link'}
                onClick={() => history.push('/')}>Go back to Dashboard</Button>
    </ContentArea>;
};

export default Page;