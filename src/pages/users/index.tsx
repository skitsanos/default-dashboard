import ContentArea from '@/components/ContentArea';
import {UserOutlined} from '@ant-design/icons';
import {Avatar, Button, Card, Input, Pagination, Space, Table} from 'antd';
import {usePagination} from 'ahooks';
import getTableData from '@/utils/getTableData';
import {endpoints} from '@/api';
import {Link} from 'umi';

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

const Page = () =>
{
    const {
        data,
        run,
        loading,
        pagination,
    } = usePagination(({
                           current,
                           pageSize,
                           query
                       }) => getTableData(endpoints.users, {
        current,
        pageSize,
        query
    }), {
        defaultPageSize: 10
    });

    return <ContentArea title={'Users'}
                        subTitle={'User management zone'}
                        avatar={{
                            icon: <UserOutlined/>,
                            shape: 'square',
                            style: {
                                //backgroundColor: '#af98d4'
                            }
                        }}
                        breadcrumb={{
                            items: [
                                {
                                    title: <Link to={'/'}>Dashboard</Link>
                                },
                                {
                                    title: <Link to={'/management'}>Management</Link>
                                },
                                {
                                    title: 'Users'
                                }
                            ]
                        }}
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
                   dataSource={data?.list}
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
        </Card>
    </ContentArea>;
};

export default Page;