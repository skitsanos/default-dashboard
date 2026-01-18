import ContentArea from '@/components/ContentArea';
import {
    DeleteOutlined,
    EditOutlined,
    LockOutlined,
    MailOutlined,
    PlusOutlined,
    ReloadOutlined,
    SearchOutlined,
    TeamOutlined,
    UserOutlined
} from '@ant-design/icons';
import {
    Avatar,
    Button,
    Card,
    Col,
    Input,
    Row,
    Space,
    Statistic,
    Table,
    Tag,
    Tooltip,
    Badge,
    message
} from 'antd';
import {useState} from 'react';
import {Link} from 'umi';
import type {ColumnsType} from 'antd/es/table';

interface UserItem
{
    key: string;
    name: string;
    email: string;
    role: 'admin' | 'editor' | 'viewer';
    status: 'active' | 'inactive' | 'pending';
    lastActive: string;
    avatar?: string;
}

// Mock data for demonstration
const mockUsers: UserItem[] = [
    {key: '1', name: 'John Smith', email: 'john.smith@example.com', role: 'admin', status: 'active', lastActive: '2 min ago'},
    {key: '2', name: 'Sarah Johnson', email: 'sarah.j@example.com', role: 'editor', status: 'active', lastActive: '15 min ago'},
    {key: '3', name: 'Mike Wilson', email: 'mike.wilson@example.com', role: 'viewer', status: 'active', lastActive: '1 hour ago'},
    {key: '4', name: 'Emily Davis', email: 'emily.d@example.com', role: 'editor', status: 'inactive', lastActive: '2 days ago'},
    {key: '5', name: 'Robert Brown', email: 'r.brown@example.com', role: 'viewer', status: 'pending', lastActive: 'Never'},
    {key: '6', name: 'Lisa Anderson', email: 'lisa.a@example.com', role: 'admin', status: 'active', lastActive: '5 min ago'},
    {key: '7', name: 'David Miller', email: 'david.m@example.com', role: 'viewer', status: 'active', lastActive: '3 hours ago'},
    {key: '8', name: 'Jennifer Taylor', email: 'jen.taylor@example.com', role: 'editor', status: 'inactive', lastActive: '1 week ago'},
    {key: '9', name: 'Chris Martinez', email: 'chris.m@example.com', role: 'viewer', status: 'active', lastActive: '30 min ago'},
    {key: '10', name: 'Amanda White', email: 'amanda.w@example.com', role: 'editor', status: 'pending', lastActive: 'Never'},
];

const getInitials = (name: string) =>
{
    return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

const getRoleColor = (role: string) =>
{
    const colors: Record<string, string> = {
        admin: '#7c3aed',
        editor: '#16a34a',
        viewer: 'default'
    };
    return colors[role] || 'default';
};

const UsersPage = () =>
{
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const filteredUsers = mockUsers.filter(user =>
        user.name.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleRefresh = () =>
    {
        setLoading(true);
        setTimeout(() =>
        {
            setLoading(false);
            message.success('Users refreshed');
        }, 800);
    };

    const columns: ColumnsType<UserItem> = [
        {
            title: 'User',
            dataIndex: 'name',
            key: 'name',
            render: (name: string, row) => (
                <Space>
                    <Badge
                        dot
                        status={row.status === 'active' ? 'success' : row.status === 'pending' ? 'warning' : 'default'}
                        offset={[-4, 32]}
                    >
                        <Avatar
                            style={{
                                backgroundColor: row.status === 'active' ? '#7c3aed' : '#e5e5e5',
                                color: row.status === 'active' ? '#fff' : '#737373'
                            }}
                        >
                            {getInitials(name)}
                        </Avatar>
                    </Badge>
                    <div>
                        <div style={{fontWeight: 600}}>{name}</div>
                        <div style={{
                            fontSize: '0.75rem',
                            color: '#737373',
                            fontFamily: 'JetBrains Mono, monospace'
                        }}>
                            {row.email}
                        </div>
                    </div>
                </Space>
            )
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            width: 120,
            render: (role: string) => (
                <Tag color={getRoleColor(role)}>{role.toUpperCase()}</Tag>
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
                    inactive: {color: 'default'},
                    pending: {color: 'orange'}
                };
                return <Tag color={config[status]?.color}>{status.toUpperCase()}</Tag>;
            }
        },
        {
            title: 'Last Active',
            dataIndex: 'lastActive',
            key: 'lastActive',
            width: 140,
            render: (time: string) => (
                <span style={{
                    fontSize: '0.875rem',
                    color: time === 'Never' ? '#737373' : '#0a0a0a'
                }}>
                    {time}
                </span>
            )
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 140,
            render: (_, row) => (
                <Space>
                    <Tooltip title="Edit">
                        <Button
                            type="text"
                            icon={<EditOutlined/>}
                            onClick={() => message.info(`Editing ${row.name}`)}
                        />
                    </Tooltip>
                    <Tooltip title="Send Email">
                        <Button
                            type="text"
                            icon={<MailOutlined/>}
                            onClick={() => message.success(`Email sent to ${row.email}`)}
                        />
                    </Tooltip>
                    <Tooltip title="Reset Password">
                        <Button
                            type="text"
                            icon={<LockOutlined/>}
                            onClick={() => message.info('Password reset email sent')}
                        />
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined/>}
                            onClick={() => message.success('User deleted')}
                        />
                    </Tooltip>
                </Space>
            )
        }
    ];

    const activeUsers = mockUsers.filter(u => u.status === 'active').length;
    const pendingUsers = mockUsers.filter(u => u.status === 'pending').length;
    const adminUsers = mockUsers.filter(u => u.role === 'admin').length;

    return (
        <ContentArea
            title="Users"
            subTitle="Manage user accounts and permissions"
            avatar={{
                icon: <TeamOutlined/>,
                style: {backgroundColor: '#7c3aed'}
            }}
            breadcrumb={{
                items: [
                    {title: <Link to="/">Dashboard</Link>},
                    {title: 'Users'}
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
                    key="add"
                    type="primary"
                    icon={<PlusOutlined/>}
                >
                    Add User
                </Button>
            ]}
        >
            {/* Stats Row */}
            <Row gutter={[24, 24]} style={{marginBottom: 24}}>
                <Col xs={24} sm={6}>
                    <Card>
                        <Statistic
                            title="Total Users"
                            value={mockUsers.length}
                            prefix={<TeamOutlined style={{color: '#7c3aed'}}/>}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={6}>
                    <Card>
                        <Statistic
                            title="Active"
                            value={activeUsers}
                            styles={{content: {color: '#16a34a'}}}
                            prefix={<UserOutlined/>}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={6}>
                    <Card>
                        <Statistic
                            title="Pending"
                            value={pendingUsers}
                            styles={{content: {color: '#f59e0b'}}}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={6}>
                    <Card>
                        <Statistic
                            title="Admins"
                            value={adminUsers}
                            styles={{content: {color: '#7c3aed'}}}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Search & Table */}
            <Card
                title="All Users"
                styles={{header: {borderLeft: '4px solid #7c3aed', marginLeft: '-1px'}}}
                extra={
                    <Input
                        placeholder="Search users..."
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
                    dataSource={filteredUsers}
                    columns={columns}
                    rowKey="key"
                    rowSelection={{
                        selectedRowKeys,
                        onChange: setSelectedRowKeys
                    }}
                    pagination={{
                        total: filteredUsers.length,
                        pageSize: 10,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) =>
                            `${range[0]}-${range[1]} of ${total} users`
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
                            <strong>{selectedRowKeys.length}</strong> user(s) selected
                        </span>
                        <Space>
                            <Button icon={<MailOutlined/>}>Send Email</Button>
                            <Button danger icon={<DeleteOutlined/>}>Delete</Button>
                        </Space>
                    </div>
                )}
            </Card>
        </ContentArea>
    );
};

export default UsersPage;
