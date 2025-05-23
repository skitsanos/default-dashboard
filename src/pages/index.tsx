import ContentArea from '@/components/ContentArea';
import GradientButton from '@/components/GradientButton';
import {gridGutter} from '@/defaults';
import useLayoutSwitcher from '@/hooks/useLayoutSwitcher';
import useSession from '@/hooks/useSession';
import ProCard from '@ant-design/pro-card';
import {StatisticCard} from '@ant-design/pro-components';
import {
    ArrowDownOutlined,
    ArrowUpOutlined,
    CheckCircleOutlined,
    CloudUploadOutlined,
    DatabaseOutlined,
    FileTextOutlined,
    SyncOutlined,
    TeamOutlined,
    WarningOutlined
} from '@ant-design/icons';
import {Avatar, Badge, List, Progress, Space, Tag, Timeline, Typography} from 'antd';
import {Column, Line} from '@ant-design/charts';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const {Text} = Typography;

// Mock data for charts
const activityData = Array.from({length: 7}, (_, i) => ({
    date: dayjs().subtract(6 - i, 'day').format('MMM DD'),
    uploads: Math.floor(Math.random() * 50) + 20,
    downloads: Math.floor(Math.random() * 100) + 50,
}));

const storageData = [
    {type: 'Documents', value: 38, color: '#5B8FF9'},
    {type: 'Images', value: 25, color: '#5AD8A6'},
    {type: 'Videos', value: 18, color: '#5D7092'},
    {type: 'Others', value: 19, color: '#F6BD16'},
];

const recentFiles = [
    {
        name: 'Q4 Report.pdf',
        size: '2.4 MB',
        modified: dayjs().subtract(2, 'hours'),
        type: 'pdf',
        status: 'completed'
    },
    {
        name: 'Product Launch.pptx',
        size: '15.8 MB',
        modified: dayjs().subtract(5, 'hours'),
        type: 'pptx',
        status: 'processing'
    },
    {
        name: 'Analytics Data.xlsx',
        size: '4.2 MB',
        modified: dayjs().subtract(1, 'day'),
        type: 'xlsx',
        status: 'completed'
    },
    {
        name: 'Design Assets.zip',
        size: '128 MB',
        modified: dayjs().subtract(2, 'days'),
        type: 'zip',
        status: 'completed'
    }
];

const activeUsers = [
    {name: 'Sarah Chen', email: 'sarah.chen@example.com', status: 'online', activity: 'Uploading files'},
    {name: 'Mike Johnson', email: 'mike.j@example.com', status: 'online', activity: 'Reviewing documents'},
    {name: 'Emma Wilson', email: 'emma.w@example.com', status: 'away', activity: 'In meeting'},
    {name: 'David Lee', email: 'david.lee@example.com', status: 'online', activity: 'Downloading reports'},
];

const systemMetrics = [
    {name: 'API Response Time', value: 142, unit: 'ms', status: 'success', trend: 'down'},
    {name: 'Server CPU Usage', value: 68, unit: '%', status: 'warning', trend: 'up'},
    {name: 'Active Connections', value: 1284, unit: '', status: 'success', trend: 'up'},
    {name: 'Error Rate', value: 0.02, unit: '%', status: 'success', trend: 'down'},
];

const Page = () =>
{
    const {layout, toggle} = useLayoutSwitcher();
    const {session} = useSession();
    const userName = session?.user?.email?.split('@')[0] || 'User';

    // Chart configurations
    const lineConfig = {
        data: activityData.flatMap(d => [
            {date: d.date, value: d.uploads, type: 'Uploads'},
            {date: d.date, value: d.downloads, type: 'Downloads'}
        ]),
        xField: 'date',
        yField: 'value',
        seriesField: 'type',
        smooth: true,
        animation: {
            appear: {
                animation: 'path-in',
                duration: 1000,
            },
        },
        color: ['#5B8FF9', '#5AD8A6'],
    };

    const columnConfig = {
        data: storageData,
        xField: 'type',
        yField: 'value',
        color: ({type}) => {
            return storageData.find(d => d.type === type)?.color || '#5B8FF9';
        },
        label: {
            position: 'middle',
            style: {
                fill: '#FFFFFF',
                opacity: 0.8,
            },
        },
        animation: {
            appear: {
                animation: 'scale-in-y',
                duration: 1000,
            },
        },
    };

    return <ContentArea 
        title={`Welcome back, ${userName}`}
        subTitle={`Here's what's happening with your content today`}
        extra={[
            <GradientButton key="upload" icon={<CloudUploadOutlined />}>
                Upload Files
            </GradientButton>,
            <GradientButton key={'toggle-layout'} 
                type="default" 
                size="small"
                onClick={toggle}>
                Layout: {layout}
            </GradientButton>
        ]}
    >
        {/* Key Metrics */}
        <ProCard gutter={gridGutter} ghost>
            <ProCard colSpan={6}>
                <StatisticCard
                    statistic={{
                        title: 'Total Files',
                        value: 1893,
                        icon: <FileTextOutlined style={{color: '#5B8FF9'}} />,
                        description: (
                            <Space>
                                <span style={{color: '#52c41a'}}>
                                    <ArrowUpOutlined /> 12%
                                </span>
                                <span>from last month</span>
                            </Space>
                        ),
                    }}
                />
            </ProCard>
            <ProCard colSpan={6}>
                <StatisticCard
                    statistic={{
                        title: 'Active Users',
                        value: 423,
                        icon: <TeamOutlined style={{color: '#5AD8A6'}} />,
                        description: (
                            <Space>
                                <span style={{color: '#52c41a'}}>
                                    <ArrowUpOutlined /> 8.5%
                                </span>
                                <span>from last week</span>
                            </Space>
                        ),
                    }}
                />
            </ProCard>
            <ProCard colSpan={6}>
                <StatisticCard
                    statistic={{
                        title: 'Storage Used',
                        value: '2.8',
                        suffix: 'TB',
                        icon: <DatabaseOutlined style={{color: '#F6BD16'}} />,
                        description: (
                            <Progress percent={68} strokeColor="#F6BD16" size="small" />
                        ),
                    }}
                />
            </ProCard>
            <ProCard colSpan={6}>
                <StatisticCard
                    statistic={{
                        title: 'Uptime',
                        value: 99.98,
                        suffix: '%',
                        precision: 2,
                        icon: <CheckCircleOutlined style={{color: '#52c41a'}} />,
                        description: 'Last 30 days',
                    }}
                />
            </ProCard>
        </ProCard>

        {/* Activity Chart and Storage Distribution */}
        <ProCard gutter={gridGutter} ghost style={{marginTop: 16}}>
            <ProCard colSpan={16} title="Activity Overview" headerBordered>
                <Line {...lineConfig} height={300} />
            </ProCard>
            <ProCard colSpan={8} title="Storage Distribution" headerBordered>
                <Column {...columnConfig} height={300} />
            </ProCard>
        </ProCard>

        {/* Recent Files and Active Users */}
        <ProCard gutter={gridGutter} ghost style={{marginTop: 16}}>
            <ProCard colSpan={12} title="Recent Files" 
                extra={<a>View all files</a>}
                headerBordered
            >
                <List
                    dataSource={recentFiles}
                    renderItem={item => (
                        <List.Item
                            actions={[
                                <Tag color={item.status === 'completed' ? 'success' : 'processing'}>
                                    {item.status === 'completed' ? 'Completed' : 'Processing'}
                                </Tag>
                            ]}
                        >
                            <List.Item.Meta
                                avatar={<FileTextOutlined style={{fontSize: 24}} />}
                                title={item.name}
                                description={
                                    <Space>
                                        <Text type="secondary">{item.size}</Text>
                                        <Text type="secondary">•</Text>
                                        <Text type="secondary">{item.modified.fromNow()}</Text>
                                    </Space>
                                }
                            />
                        </List.Item>
                    )}
                />
            </ProCard>
            
            <ProCard colSpan={12} title="Active Users" 
                extra={<a>View all users</a>}
                headerBordered
            >
                <List
                    dataSource={activeUsers}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={
                                    <Badge 
                                        dot 
                                        color={item.status === 'online' ? '#52c41a' : '#faad14'}
                                        offset={[-5, 35]}
                                    >
                                        <Avatar>{item.name.charAt(0)}</Avatar>
                                    </Badge>
                                }
                                title={item.name}
                                description={
                                    <Space direction="vertical" size={0}>
                                        <Text type="secondary" style={{fontSize: 12}}>{item.email}</Text>
                                        <Text type="secondary" style={{fontSize: 12}}>{item.activity}</Text>
                                    </Space>
                                }
                            />
                        </List.Item>
                    )}
                />
            </ProCard>
        </ProCard>

        {/* System Health and Recent Activity */}
        <ProCard gutter={gridGutter} ghost style={{marginTop: 16}}>
            <ProCard colSpan={8} title="System Health" headerBordered>
                <Space direction="vertical" style={{width: '100%'}} size="middle">
                    {systemMetrics.map((metric, index) => (
                        <div key={index}>
                            <Space style={{width: '100%', justifyContent: 'space-between'}}>
                                <Text>{metric.name}</Text>
                                <Space>
                                    <Text strong>
                                        {metric.value}{metric.unit}
                                    </Text>
                                    <Tag 
                                        icon={metric.trend === 'up' ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                                        color={metric.status}
                                    >
                                        {metric.trend}
                                    </Tag>
                                </Space>
                            </Space>
                            <Progress 
                                percent={metric.name.includes('CPU') || metric.name.includes('Error') ? metric.value : (metric.value / 20)}
                                size="small"
                                strokeColor={metric.status === 'success' ? '#52c41a' : '#faad14'}
                                showInfo={false}
                            />
                        </div>
                    ))}
                </Space>
            </ProCard>

            <ProCard colSpan={16} title="Recent Activity" 
                extra={<SyncOutlined spin />}
                headerBordered
            >
                <Timeline
                    items={[
                        {
                            dot: <CheckCircleOutlined style={{color: '#52c41a'}} />,
                            children: (
                                <>
                                    <Text strong>Sarah Chen</Text> uploaded 3 files to <Text code>Q4 Reports</Text>
                                    <br />
                                    <Text type="secondary" style={{fontSize: 12}}>2 hours ago</Text>
                                </>
                            ),
                        },
                        {
                            dot: <TeamOutlined style={{color: '#1890ff'}} />,
                            children: (
                                <>
                                    <Text strong>New team member</Text> David Lee joined the workspace
                                    <br />
                                    <Text type="secondary" style={{fontSize: 12}}>5 hours ago</Text>
                                </>
                            ),
                        },
                        {
                            dot: <WarningOutlined style={{color: '#faad14'}} />,
                            children: (
                                <>
                                    <Text strong>System maintenance</Text> scheduled for tomorrow 2:00 AM
                                    <br />
                                    <Text type="secondary" style={{fontSize: 12}}>1 day ago</Text>
                                </>
                            ),
                        },
                        {
                            color: 'gray',
                            children: (
                                <>
                                    <Text strong>Mike Johnson</Text> created new folder <Text code>2024 Archives</Text>
                                    <br />
                                    <Text type="secondary" style={{fontSize: 12}}>2 days ago</Text>
                                </>
                            ),
                        },
                    ]}
                />
            </ProCard>
        </ProCard>

        {/* Quick Actions */}
        <ProCard title="Quick Actions" style={{marginTop: 16}} headerBordered>
            <Space size="large" wrap>
                <GradientButton icon={<CloudUploadOutlined />} size="large">
                    Upload Files
                </GradientButton>
                <GradientButton gradientType="secondary" icon={<TeamOutlined />} size="large">
                    Invite Team Member
                </GradientButton>
                <GradientButton icon={<FileTextOutlined />} size="large">
                    Create Report
                </GradientButton>
                <GradientButton gradientType="danger" icon={<DatabaseOutlined />} size="large">
                    Manage Storage
                </GradientButton>
            </Space>
        </ProCard>
    </ContentArea>;
};

export default Page;