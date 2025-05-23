import ContentArea from '@/components/ContentArea';
import GradientButton from '@/components/GradientButton';
import {DeleteOutlined, FileOutlined, FileTextOutlined, FolderOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Avatar, Button, Card, Dropdown, Input, Pagination, Space, Table} from 'antd';
import {usePagination} from 'ahooks';
import getTableData from '@/utils/getTableData';
import {endpoints} from '@/api';
import {history, Link} from 'umi';
import {ColumnsType} from 'antd/es/table';

interface FilesItem
{
    key: string
    name: string;
    type: string,

    [key: string]: any;
}

const columns: ColumnsType<FilesItem> = [
    {
        title: 'File',
        dataIndex: 'name',
        render: (_, row) => <Space> <Avatar icon={<FileOutlined/>}/> <span>{row.name}</span> </Space>
    },
    {
        title: 'Type',
        width: 120,
        dataIndex: 'type'
    },
    {
        title: 'Actions',
        width: 100,
        render: (_value, row) =>
        {
            const items: MenuProps['items'] = [
                {
                    key: 'view',
                    label: <Space><FileTextOutlined/> View</Space>
                },

                {
                    key: 'delete',
                    label: <Space><DeleteOutlined/> Delete</Space>
                }
            ];

            const onClick: MenuProps['onClick'] = ({key}) =>
            {
                switch (key)
                {
                    case 'view':
                        history.push(`/files/${row.key}`, row);
                        break;

                    default:
                        break;
                }
            };

            return <Dropdown menu={{
                items,
                onClick
            }}>
                <Button shape={'circle'}>...</Button>
            </Dropdown>;
        }
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
                       }) => getTableData(endpoints.files, {
        current,
        pageSize,
        query
    }), {
        defaultPageSize: 10
    });

    return <ContentArea title={'Files'}
                        subTitle={'File management zone'}
                        avatar={{
                            icon: <FolderOutlined/>,
                            shape: 'square'
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
                                    title: 'Files'
                                }
                            ]
                        }}
                        content={<Card>
                            <Input.Search/>
                        </Card>}
                        extra={[
                            <GradientButton key={'refresh'}
                                    type="default"
                                    onClick={() =>
                                    {
                                        run(pagination);
                                    }}>Refresh</GradientButton>,
                            <GradientButton key={'add'}
                                    onClick={() =>
                                    {
                                        history.push('/files/upload');
                                    }}>Upload</GradientButton>
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