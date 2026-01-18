import ContentArea from '@/components/ContentArea';
import {
    DeleteOutlined,
    DownloadOutlined,
    EyeOutlined,
    FileExcelOutlined,
    FileImageOutlined,
    FileOutlined,
    FilePdfOutlined,
    FileTextOutlined,
    FileZipOutlined,
    FolderOutlined,
    PlusOutlined,
    ReloadOutlined,
    SearchOutlined
} from '@ant-design/icons';
import {
    Avatar,
    Button,
    Card,
    Col,
    Dropdown,
    Input,
    Row,
    Space,
    Statistic,
    Table,
    Tag,
    Tooltip,
    message
} from 'antd';
import {useState} from 'react';
import {Link} from 'umi';
import type {ColumnsType} from 'antd/es/table';

interface FileItem
{
    key: string;
    name: string;
    type: string;
    size: string;
    modified: string;
    status: 'active' | 'archived' | 'processing';
}

// Mock data for demonstration
const mockFiles: FileItem[] = [
    {key: '1', name: 'Annual Report 2024.pdf', type: 'pdf', size: '2.4 MB', modified: '2024-01-15', status: 'active'},
    {key: '2', name: 'Project Assets.zip', type: 'zip', size: '156 MB', modified: '2024-01-14', status: 'processing'},
    {key: '3', name: 'Team Photo.jpg', type: 'image', size: '4.2 MB', modified: '2024-01-13', status: 'active'},
    {key: '4', name: 'Budget Spreadsheet.xlsx', type: 'excel', size: '1.2 MB', modified: '2024-01-12', status: 'active'},
    {key: '5', name: 'Meeting Notes.txt', type: 'text', size: '24 KB', modified: '2024-01-11', status: 'archived'},
    {key: '6', name: 'Product Mockups.zip', type: 'zip', size: '89 MB', modified: '2024-01-10', status: 'active'},
    {key: '7', name: 'Invoice Q4.pdf', type: 'pdf', size: '156 KB', modified: '2024-01-09', status: 'active'},
    {key: '8', name: 'Logo Assets.png', type: 'image', size: '2.1 MB', modified: '2024-01-08', status: 'active'},
    {key: '9', name: 'Contract Draft.pdf', type: 'pdf', size: '890 KB', modified: '2024-01-07', status: 'archived'},
    {key: '10', name: 'Database Backup.zip', type: 'zip', size: '1.2 GB', modified: '2024-01-06', status: 'active'},
];

const getFileIcon = (type: string) =>
{
    const icons: Record<string, React.ReactNode> = {
        pdf: <FilePdfOutlined style={{color: '#dc2626'}}/>,
        zip: <FileZipOutlined style={{color: '#f59e0b'}}/>,
        image: <FileImageOutlined style={{color: '#7c3aed'}}/>,
        excel: <FileExcelOutlined style={{color: '#16a34a'}}/>,
        text: <FileTextOutlined style={{color: '#737373'}}/>,
    };
    return icons[type] || <FileOutlined/>;
};

const FilesPage = () =>
{
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const filteredFiles = mockFiles.filter(file =>
        file.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleRefresh = () =>
    {
        setLoading(true);
        setTimeout(() =>
        {
            setLoading(false);
            message.success('Files refreshed');
        }, 800);
    };

    const handleDelete = (key: string) =>
    {
        message.success('File deleted');
    };

    const columns: ColumnsType<FileItem> = [
        {
            title: 'File',
            dataIndex: 'name',
            key: 'name',
            render: (name: string, row) => (
                <Space>
                    <Avatar
                        icon={getFileIcon(row.type)}
                        style={{backgroundColor: '#f5f5f5'}}
                    />
                    <div>
                        <div style={{fontWeight: 600}}>{name}</div>
                        <div style={{
                            fontSize: '0.75rem',
                            color: '#737373',
                            fontFamily: 'JetBrains Mono, monospace'
                        }}>
                            {row.type.toUpperCase()}
                        </div>
                    </div>
                </Space>
            )
        },
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
            width: 120,
            render: (size: string) => (
                <span style={{fontFamily: 'JetBrains Mono, monospace'}}>{size}</span>
            )
        },
        {
            title: 'Modified',
            dataIndex: 'modified',
            key: 'modified',
            width: 140,
            render: (date: string) => (
                <span style={{fontFamily: 'JetBrains Mono, monospace', fontSize: '0.875rem'}}>
                    {date}
                </span>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 120,
            render: (status: string) =>
            {
                const config: Record<string, { color: string }> = {
                    active: {color: 'green'},
                    archived: {color: 'default'},
                    processing: {color: 'blue'}
                };
                return <Tag color={config[status]?.color}>{status.toUpperCase()}</Tag>;
            }
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 120,
            render: (_, row) => (
                <Space>
                    <Tooltip title="View">
                        <Button
                            type="text"
                            icon={<EyeOutlined/>}
                            onClick={() => message.info(`Viewing ${row.name}`)}
                        />
                    </Tooltip>
                    <Tooltip title="Download">
                        <Button
                            type="text"
                            icon={<DownloadOutlined/>}
                            onClick={() => message.success(`Downloading ${row.name}`)}
                        />
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined/>}
                            onClick={() => handleDelete(row.key)}
                        />
                    </Tooltip>
                </Space>
            )
        }
    ];

    return (
        <ContentArea
            title="Files"
            subTitle="Manage your files and documents"
            avatar={{
                icon: <FolderOutlined/>,
                style: {backgroundColor: '#7c3aed'}
            }}
            breadcrumb={{
                items: [
                    {title: <Link to="/">Dashboard</Link>},
                    {title: 'Files'}
                ]
            }}
            extra={[
                <Button
                    key="refresh"
                    icon={<ReloadOutlined/>}
                    onClick={handleRefresh}
                >
                    Refresh
                </Button>,
                <Button
                    key="upload"
                    type="primary"
                    icon={<PlusOutlined/>}
                >
                    Upload
                </Button>
            ]}
        >
            {/* Stats Row */}
            <Row gutter={[24, 24]} style={{marginBottom: 24}}>
                <Col xs={24} sm={8}>
                    <Card>
                        <Statistic
                            title="Total Files"
                            value={mockFiles.length}
                            prefix={<FileOutlined style={{color: '#7c3aed'}}/>}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card>
                        <Statistic
                            title="Storage Used"
                            value={256.8}
                            suffix="MB"
                            prefix={<FolderOutlined style={{color: '#7c3aed'}}/>}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card>
                        <Statistic
                            title="Active Files"
                            value={mockFiles.filter(f => f.status === 'active').length}
                            styles={{content: {color: '#16a34a'}}}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Search & Table */}
            <Card
                title="All Files"
                styles={{header: {borderLeft: '4px solid #7c3aed', marginLeft: '-1px'}}}
                extra={
                    <Input
                        placeholder="Search files..."
                        prefix={<SearchOutlined style={{color: '#737373'}}/>}
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                        style={{width: 250}}
                        allowClear
                    />
                }
            >
                <Table
                    loading={loading}
                    dataSource={filteredFiles}
                    columns={columns}
                    rowKey="key"
                    rowSelection={{
                        selectedRowKeys,
                        onChange: setSelectedRowKeys
                    }}
                    pagination={{
                        total: filteredFiles.length,
                        pageSize: 10,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) =>
                            `${range[0]}-${range[1]} of ${total} files`
                    }}
                />

                {selectedRowKeys.length > 0 && (
                    <div style={{
                        marginTop: 16,
                        padding: '12px 16px',
                        backgroundColor: '#f5f5f5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <span>
                            <strong>{selectedRowKeys.length}</strong> file(s) selected
                        </span>
                        <Space>
                            <Button icon={<DownloadOutlined/>}>Download</Button>
                            <Button danger icon={<DeleteOutlined/>}>Delete</Button>
                        </Space>
                    </div>
                )}
            </Card>
        </ContentArea>
    );
};

export default FilesPage;
