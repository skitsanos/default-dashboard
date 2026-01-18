import ContentArea from '@/components/ContentArea';
import {
    Card,
    Col,
    Row,
    Statistic,
    Table,
    Tag,
    Progress,
    Space,
    Avatar
} from 'antd';
import {
    ArrowUpOutlined,
    ArrowDownOutlined,
    UserOutlined,
    FileOutlined,
    CloudServerOutlined,
    ThunderboltOutlined
} from '@ant-design/icons';
import {useOutletContext} from 'umi';

const Dashboard = () =>
{
    const {session} = useOutletContext<{ session: any }>();
    const userName = session?.session?.user?.email?.split('@')[0] || 'User';

    // Mock data for recent activity
    const recentActivity = [
        {key: '1', action: 'File uploaded', target: 'report-q4.pdf', time: '2 min ago', type: 'file'},
        {key: '2', action: 'User logged in', target: 'john@example.com', time: '15 min ago', type: 'user'},
        {key: '3', action: 'Settings updated', target: 'Email notifications', time: '1 hour ago', type: 'setting'},
        {key: '4', action: 'File deleted', target: 'old-backup.zip', time: '2 hours ago', type: 'file'},
        {key: '5', action: 'New user invited', target: 'sarah@example.com', time: '3 hours ago', type: 'user'},
    ];

    // Mock data for recent files
    const recentFiles = [
        {key: '1', name: 'Annual Report 2024.pdf', size: '2.4 MB', status: 'completed', date: 'Jan 15'},
        {key: '2', name: 'Project Assets.zip', size: '156 MB', status: 'processing', date: 'Jan 14'},
        {key: '3', name: 'Team Photos.zip', size: '89 MB', status: 'completed', date: 'Jan 13'},
        {key: '4', name: 'Budget Draft.xlsx', size: '1.2 MB', status: 'completed', date: 'Jan 12'},
        {key: '5', name: 'Presentation.pptx', size: '8.5 MB', status: 'failed', date: 'Jan 11'},
    ];

    const fileColumns = [
        {
            title: 'File',
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => (
                <Space>
                    <FileOutlined/>
                    <span style={{fontFamily: 'JetBrains Mono, monospace', fontSize: '0.875rem'}}>{text}</span>
                </Space>
            )
        },
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
            render: (text: string) => (
                <span style={{fontFamily: 'JetBrains Mono, monospace'}}>{text}</span>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) =>
            {
                const colors: Record<string, string> = {
                    completed: 'green',
                    processing: 'blue',
                    failed: 'red'
                };
                return <Tag color={colors[status]}>{status.toUpperCase()}</Tag>;
            }
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date'
        }
    ];

    return (
        <ContentArea
            title="Dashboard"
            subTitle={`Welcome back, ${userName}`}
        >
            {/* Stats Grid - Dutchy tight grid pattern */}
            <div className="dutchy-stats-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '2px',
                backgroundColor: '#e5e5e5',
                marginBottom: '24px'
            }}>
                <div style={{backgroundColor: '#fff', padding: '24px'}}>
                    <Statistic
                        title="Total Users"
                        value={1284}
                        prefix={<UserOutlined style={{color: '#7c3aed'}}/>}
                        suffix={
                            <span style={{fontSize: '14px', color: '#16a34a', marginLeft: '8px'}}>
                                <ArrowUpOutlined/> 12%
                            </span>
                        }
                    />
                </div>
                <div style={{backgroundColor: '#fff', padding: '24px'}}>
                    <Statistic
                        title="Files Stored"
                        value={8432}
                        prefix={<FileOutlined style={{color: '#7c3aed'}}/>}
                        suffix={
                            <span style={{fontSize: '14px', color: '#16a34a', marginLeft: '8px'}}>
                                <ArrowUpOutlined/> 8%
                            </span>
                        }
                    />
                </div>
                <div style={{backgroundColor: '#fff', padding: '24px'}}>
                    <Statistic
                        title="Storage Used"
                        value={156}
                        suffix="GB"
                        prefix={<CloudServerOutlined style={{color: '#7c3aed'}}/>}
                    />
                    <Progress
                        percent={62}
                        strokeColor="#7c3aed"
                        railColor="#e5e5e5"
                        showInfo={false}
                        style={{marginTop: '12px'}}
                    />
                    <span style={{fontSize: '12px', color: '#737373'}}>156 GB of 250 GB used</span>
                </div>
                <div style={{backgroundColor: '#fff', padding: '24px'}}>
                    <Statistic
                        title="API Requests"
                        value={24500}
                        prefix={<ThunderboltOutlined style={{color: '#7c3aed'}}/>}
                        suffix={
                            <span style={{fontSize: '14px', color: '#dc2626', marginLeft: '8px'}}>
                                <ArrowDownOutlined/> 3%
                            </span>
                        }
                    />
                </div>
            </div>

            <Row gutter={[24, 24]}>
                {/* Recent Files Table */}
                <Col xs={24} lg={16}>
                    <Card
                        title="Recent Files"
                        className="dutchy-accent"
                        styles={{header: {borderLeft: '4px solid #7c3aed', marginLeft: '-1px'}}}
                    >
                        <Table
                            dataSource={recentFiles}
                            columns={fileColumns}
                            pagination={false}
                            size="middle"
                        />
                    </Card>
                </Col>

                {/* Activity Feed */}
                <Col xs={24} lg={8}>
                    <Card
                        title="Recent Activity"
                        styles={{header: {borderLeft: '4px solid #0a0a0a', marginLeft: '-1px'}}}
                    >
                        <div className="activity-feed">
                            {recentActivity.map((item) => (
                                <div key={item.key} className="activity-item">
                                    <div
                                        className="activity-dot"
                                        style={{
                                            backgroundColor: item.type === 'user' ? '#7c3aed' :
                                                             item.type === 'file' ? '#16a34a' : '#f59e0b'
                                        }}
                                    />
                                    <div className="activity-content">
                                        <p className="activity-action">{item.action}</p>
                                        <p className="activity-target">{item.target}</p>
                                        <p className="activity-time">{item.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </Col>

                {/* Quick Stats Row */}
                <Col xs={24} md={8}>
                    <Card>
                        <div style={{textAlign: 'center'}}>
                            <div style={{
                                width: '64px',
                                height: '64px',
                                backgroundColor: '#7c3aed',
                                margin: '0 auto 16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <UserOutlined style={{fontSize: '28px', color: '#fff'}}/>
                            </div>
                            <Statistic title="Active Users" value={847} suffix="/ 1284"/>
                            <Progress
                                percent={66}
                                strokeColor="#7c3aed"
                                railColor="#e5e5e5"
                                style={{marginTop: '16px'}}
                            />
                        </div>
                    </Card>
                </Col>

                <Col xs={24} md={8}>
                    <Card>
                        <div style={{textAlign: 'center'}}>
                            <div style={{
                                width: '64px',
                                height: '64px',
                                backgroundColor: '#16a34a',
                                margin: '0 auto 16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <FileOutlined style={{fontSize: '28px', color: '#fff'}}/>
                            </div>
                            <Statistic title="Uploads Today" value={156}/>
                            <p style={{color: '#16a34a', marginTop: '8px', fontWeight: 700}}>
                                <ArrowUpOutlined/> 23% vs yesterday
                            </p>
                        </div>
                    </Card>
                </Col>

                <Col xs={24} md={8}>
                    <Card>
                        <div style={{textAlign: 'center'}}>
                            <div style={{
                                width: '64px',
                                height: '64px',
                                backgroundColor: '#0a0a0a',
                                margin: '0 auto 16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <ThunderboltOutlined style={{fontSize: '28px', color: '#fff'}}/>
                            </div>
                            <Statistic title="Uptime" value={99.9} suffix="%" precision={1}/>
                            <p style={{color: '#737373', marginTop: '8px', fontSize: '12px'}}>
                                Last 30 days
                            </p>
                        </div>
                    </Card>
                </Col>
            </Row>

            <style>{`
                .activity-feed {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .activity-item {
                    display: flex;
                    gap: 12px;
                    align-items: flex-start;
                }

                .activity-dot {
                    width: 8px;
                    height: 8px;
                    margin-top: 6px;
                    flex-shrink: 0;
                }

                .activity-content {
                    flex: 1;
                    min-width: 0;
                }

                .activity-action {
                    margin: 0;
                    font-weight: 600;
                    font-size: 0.875rem;
                }

                .activity-target {
                    margin: 2px 0 0 0;
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 0.75rem;
                    color: #737373;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .activity-time {
                    margin: 4px 0 0 0;
                    font-size: 0.75rem;
                    color: #737373;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
            `}</style>
        </ContentArea>
    );
};

export default Dashboard;
