import ContentArea from '@/components/ContentArea';
import {ApplicationTheme} from '@/defaults';
import {UserOutlined} from '@ant-design/icons';
import {Avatar, Button, Card, Input, Pagination, Space, Table} from 'antd';
import {usePagination} from 'ahooks';
import getTableData from '@/utils/getTableData';
import {endpoints} from '@/api';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        render: (_, row) => <Space> <Avatar src={`${row.avatar}?d=retro`}/> <span>{row.name}</span> </Space>
    }, {
        title: 'Email',
        dataIndex: 'email'
    },
    {
        title: 'Uuid',
        dataIndex: 'uuid'
    }
];

const Page = props =>
{
    const {history} = props;

    const {
        data,
        run,
        loading,
        pagination,
        refresh
    } = usePagination(({
                           current,
                           pageSize,
                           sorter,
                           query
                       }) => getTableData(endpoints.users, {
        current,
        pageSize,
        sorter,
        query,
        filter: ''
    }), {
        defaultPageSize: 10
    });

    return <ContentArea title={'Users'}
                        subTitle={'User management zone'}
                        avatar={<Avatar icon={<UserOutlined/>}
                                        shape={'square'}
                                        style={{
                                            backgroundColor: '#af98d4'
                                        }}/>}
                        breadcrumbs={[
                            {
                                title: 'Dashboard',
                                path: '/'
                            },
                            {
                                title: 'Management',
                                path: '/management'
                            },
                            {
                                title: 'Users'
                            }
                        ]}
                        content={<Card>
                            <Input.Search/>
                        </Card>}
                        extra={[
                            <Button key={'refresh'}
                                    onClick={() =>
                                    {
                                        run(pagination);
                                    }}>Refresh</Button>,
                            <Button key={'add'}
                                    type={'primary'}>Add</Button>
                        ]}>
        <Card>
            <Table loading={loading}
                   dataSource={data?.data}
                   pagination={false}
                   columns={columns}
                   rowKey={'key'}/>

            <Pagination{...pagination}
                       showQuickJumper={true}
                       showSizeChanger={true}
                       style={{
                           marginTop: 16,
                           textAlign: 'right'
                       }}/>

            <Button type={'link'}
                    onClick={() => history.push('/')}>Go back to Dashboard</Button>
        </Card>
    </ContentArea>;
};

export default Page;