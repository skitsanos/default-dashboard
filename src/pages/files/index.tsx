import ContentArea from '@/components/ContentArea';
import {FileOutlined, FolderOutlined} from '@ant-design/icons';
import {Avatar, Button, Card, Input, Pagination, Space, Table} from 'antd';
import {usePagination} from 'ahooks';
import getTableData from '@/utils/getTableData';
import {endpoints} from '@/api';
import {history} from 'umi';

const columns = [
    {
        title: 'File',
        dataIndex: 'name',
        render: (_, row) => <Space> <Avatar icon={<FileOutlined/>}/> <span>{row.name}</span> </Space>
    },
    {
        title: 'Type',
        dataIndex: 'type'
    }
];

const Page = () =>
{
    const {
        data,
        run,
        loading,
        pagination,
        refresh
    } = usePagination(({
                           current,
                           pageSize,
                           query
                       }) => getTableData(endpoints.files, {
        current,
        pageSize,
        query
    }), {
        defaultPageSize: 10
    });

    return <ContentArea title={'Files'}
                        subTitle={'File management zone'}
                        avatar={<Avatar icon={<FolderOutlined/>}
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
                                title: 'Files'
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
                                    type={'primary'}
                                    onClick={() =>
                                    {
                                        history.push('/files/upload');
                                    }}>Upload</Button>
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