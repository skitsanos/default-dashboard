import ContentArea from '@/components/ContentArea';
import GradientButton from '@/components/GradientButton';
import useSession from '@/hooks/useSession';
import ProCard from '@ant-design/pro-card';
import {
    BellOutlined,
    GlobalOutlined,
    LockOutlined,
    MailOutlined,
    MobileOutlined,
    SafetyOutlined,
    SettingOutlined,
    UserOutlined
} from '@ant-design/icons';
import {
    Avatar,
    Button,
    Card,
    Col,
    Divider,
    Form,
    Input,
    Radio,
    Row,
    Select,
    Space,
    Switch,
    TimePicker,
    Typography,
    Upload,
    message
} from 'antd';
import dayjs from 'dayjs';
import {useState} from 'react';

const {Title, Text} = Typography;
const {Option} = Select;

const SettingsPage = () => {
    const {session} = useSession();
    const [activeTab, setActiveTab] = useState('profile');
    const [profileForm] = Form.useForm();
    const [preferencesForm] = Form.useForm();
    const [notificationsForm] = Form.useForm();
    const [securityForm] = Form.useForm();

    // Initial values for forms
    const profileInitialValues = {
        firstName: 'John',
        lastName: 'Doe',
        email: session?.user?.email || 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        bio: 'Product designer with a passion for creating intuitive user experiences.',
        timezone: 'America/New_York',
        language: 'en'
    };

    const preferencesInitialValues = {
        theme: 'light',
        dashboardLayout: 'grid',
        itemsPerPage: '25',
        defaultView: 'cards',
        autoRefresh: true,
        refreshInterval: 30,
        compactMode: false,
        showTips: true
    };

    const notificationsInitialValues = {
        emailNotifications: true,
        pushNotifications: false,
        smsNotifications: false,
        weeklyDigest: true,
        marketingEmails: false,
        securityAlerts: true,
        fileActivity: true,
        userActivity: false,
        systemUpdates: true,
        quietHoursEnabled: true,
        quietHoursStart: dayjs('22:00', 'HH:mm'),
        quietHoursEnd: dayjs('08:00', 'HH:mm')
    };

    const securityInitialValues = {
        twoFactorEnabled: false,
        sessionTimeout: '30',
        passwordExpiry: '90',
        ipWhitelist: '',
        apiAccess: true
    };

    const menuItems = [
        {key: 'profile', icon: <UserOutlined />, label: 'Profile'},
        {key: 'preferences', icon: <SettingOutlined />, label: 'Preferences'},
        {key: 'notifications', icon: <BellOutlined />, label: 'Notifications'},
        {key: 'security', icon: <SafetyOutlined />, label: 'Security'}
    ];

    const handleFinish = (values: any, formName: string) => {
        message.success(`${formName} settings would be saved here`);
        console.log(`${formName} values:`, values);
    };

    const renderProfileSettings = () => (
        <Form
            form={profileForm}
            layout="vertical"
            initialValues={profileInitialValues}
            onFinish={(values) => handleFinish(values, 'Profile')}
        >
            <Row gutter={24}>
                <Col span={24}>
                    <div style={{textAlign: 'center', marginBottom: 24}}>
                        <Upload
                            name="avatar"
                            listType="picture-circle"
                            className="avatar-uploader"
                            showUploadList={false}
                            beforeUpload={() => false}
                        >
                            <Avatar
                                size={100}
                                src={session?.user?.gravatar}
                                icon={<UserOutlined />}
                                style={{cursor: 'pointer'}}
                            />
                        </Upload>
                        <div style={{marginTop: 8}}>
                            <Text type="secondary">Click to change avatar</Text>
                        </div>
                    </div>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="First Name"
                        name="firstName"
                        rules={[{required: true, message: 'Please enter your first name'}]}
                    >
                        <Input prefix={<UserOutlined />} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[{required: true, message: 'Please enter your last name'}]}
                    >
                        <Input prefix={<UserOutlined />} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {required: true, message: 'Please enter your email'},
                            {type: 'email', message: 'Please enter a valid email'}
                        ]}
                    >
                        <Input prefix={<MailOutlined />} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Phone"
                        name="phone"
                    >
                        <Input prefix={<MobileOutlined />} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        label="Bio"
                        name="bio"
                    >
                        <Input.TextArea rows={4} maxLength={200} showCount />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Timezone"
                        name="timezone"
                    >
                        <Select prefix={<GlobalOutlined />}>
                            <Option value="America/New_York">Eastern Time (ET)</Option>
                            <Option value="America/Chicago">Central Time (CT)</Option>
                            <Option value="America/Denver">Mountain Time (MT)</Option>
                            <Option value="America/Los_Angeles">Pacific Time (PT)</Option>
                            <Option value="Europe/London">London (GMT)</Option>
                            <Option value="Europe/Paris">Paris (CET)</Option>
                            <Option value="Asia/Tokyo">Tokyo (JST)</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Language"
                        name="language"
                    >
                        <Select>
                            <Option value="en">English</Option>
                            <Option value="es">Spanish</Option>
                            <Option value="fr">French</Option>
                            <Option value="de">German</Option>
                            <Option value="zh">Chinese</Option>
                            <Option value="ja">Japanese</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Space>
                    <GradientButton htmlType="submit">
                        Save Changes
                    </GradientButton>
                    <Button onClick={() => profileForm.resetFields()}>
                        Reset
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );

    const renderPreferencesSettings = () => (
        <Form
            form={preferencesForm}
            layout="vertical"
            initialValues={preferencesInitialValues}
            onFinish={(values) => handleFinish(values, 'Preferences')}
        >
            <Title level={5}>Appearance</Title>
            <Row gutter={24}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Theme"
                        name="theme"
                    >
                        <Radio.Group>
                            <Radio.Button value="light">Light</Radio.Button>
                            <Radio.Button value="dark">Dark</Radio.Button>
                            <Radio.Button value="auto">Auto</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Compact Mode"
                        name="compactMode"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>
                </Col>
            </Row>

            <Divider />
            
            <Title level={5}>Dashboard Settings</Title>
            <Row gutter={24}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Default Layout"
                        name="dashboardLayout"
                    >
                        <Select>
                            <Option value="grid">Grid View</Option>
                            <Option value="list">List View</Option>
                            <Option value="kanban">Kanban View</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Items Per Page"
                        name="itemsPerPage"
                    >
                        <Select>
                            <Option value="10">10 items</Option>
                            <Option value="25">25 items</Option>
                            <Option value="50">50 items</Option>
                            <Option value="100">100 items</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Default View"
                        name="defaultView"
                    >
                        <Select>
                            <Option value="cards">Cards</Option>
                            <Option value="table">Table</Option>
                            <Option value="timeline">Timeline</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Show Tips"
                        name="showTips"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>
                </Col>
            </Row>

            <Divider />

            <Title level={5}>Data & Performance</Title>
            <Row gutter={24}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Auto Refresh"
                        name="autoRefresh"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Refresh Interval (seconds)"
                        name="refreshInterval"
                        dependencies={['autoRefresh']}
                    >
                        <Select disabled={!preferencesForm.getFieldValue('autoRefresh')}>
                            <Option value={15}>15 seconds</Option>
                            <Option value={30}>30 seconds</Option>
                            <Option value={60}>1 minute</Option>
                            <Option value={300}>5 minutes</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item>
                <Space>
                    <GradientButton htmlType="submit">
                        Save Preferences
                    </GradientButton>
                    <Button onClick={() => preferencesForm.resetFields()}>
                        Reset
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );

    const renderNotificationSettings = () => (
        <Form
            form={notificationsForm}
            layout="vertical"
            initialValues={notificationsInitialValues}
            onFinish={(values) => handleFinish(values, 'Notifications')}
        >
            <Title level={5}>Notification Channels</Title>
            <Row gutter={24}>
                <Col span={24}>
                    <Form.Item
                        label="Email Notifications"
                        name="emailNotifications"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        label="Push Notifications"
                        name="pushNotifications"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        label="SMS Notifications"
                        name="smsNotifications"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>
                </Col>
            </Row>

            <Divider />

            <Title level={5}>Notification Types</Title>
            <Row gutter={24}>
                <Col span={24}>
                    <Form.Item
                        label="Security Alerts"
                        name="securityAlerts"
                        valuePropName="checked"
                        extra="Get notified about suspicious login attempts and security events"
                    >
                        <Switch />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        label="File Activity"
                        name="fileActivity"
                        valuePropName="checked"
                        extra="Notifications when files are uploaded, shared, or modified"
                    >
                        <Switch />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        label="User Activity"
                        name="userActivity"
                        valuePropName="checked"
                        extra="Updates about team member activities and collaborations"
                    >
                        <Switch />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        label="System Updates"
                        name="systemUpdates"
                        valuePropName="checked"
                        extra="Important system maintenance and feature updates"
                    >
                        <Switch />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        label="Weekly Digest"
                        name="weeklyDigest"
                        valuePropName="checked"
                        extra="Summary of your activity and highlights sent every Monday"
                    >
                        <Switch />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        label="Marketing Emails"
                        name="marketingEmails"
                        valuePropName="checked"
                        extra="Product news, tips, and promotional offers"
                    >
                        <Switch />
                    </Form.Item>
                </Col>
            </Row>

            <Divider />

            <Title level={5}>Quiet Hours</Title>
            <Row gutter={24}>
                <Col span={24}>
                    <Form.Item
                        label="Enable Quiet Hours"
                        name="quietHoursEnabled"
                        valuePropName="checked"
                        extra="Pause non-critical notifications during specified hours"
                    >
                        <Switch />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Start Time"
                        name="quietHoursStart"
                        dependencies={['quietHoursEnabled']}
                    >
                        <TimePicker 
                            format="HH:mm" 
                            disabled={!notificationsForm.getFieldValue('quietHoursEnabled')}
                            style={{width: '100%'}}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="End Time"
                        name="quietHoursEnd"
                        dependencies={['quietHoursEnabled']}
                    >
                        <TimePicker 
                            format="HH:mm" 
                            disabled={!notificationsForm.getFieldValue('quietHoursEnabled')}
                            style={{width: '100%'}}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item>
                <Space>
                    <GradientButton htmlType="submit">
                        Save Notification Settings
                    </GradientButton>
                    <Button onClick={() => notificationsForm.resetFields()}>
                        Reset
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );

    const renderSecuritySettings = () => (
        <Form
            form={securityForm}
            layout="vertical"
            initialValues={securityInitialValues}
            onFinish={(values) => handleFinish(values, 'Security')}
        >
            <Title level={5}>Authentication</Title>
            <Row gutter={24}>
                <Col span={24}>
                    <Form.Item
                        label="Two-Factor Authentication"
                        name="twoFactorEnabled"
                        valuePropName="checked"
                        extra="Add an extra layer of security to your account"
                    >
                        <Switch />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Card size="small" style={{marginBottom: 16}}>
                        <Space direction="vertical" style={{width: '100%'}}>
                            <div>
                                <Text strong>Change Password</Text>
                                <br />
                                <Text type="secondary">Last changed: 45 days ago</Text>
                            </div>
                            <GradientButton type="default" icon={<LockOutlined />}>
                                Change Password
                            </GradientButton>
                        </Space>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={5}>Session Management</Title>
            <Row gutter={24}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Session Timeout (minutes)"
                        name="sessionTimeout"
                        extra="Automatically log out after period of inactivity"
                    >
                        <Select>
                            <Option value="15">15 minutes</Option>
                            <Option value="30">30 minutes</Option>
                            <Option value="60">1 hour</Option>
                            <Option value="120">2 hours</Option>
                            <Option value="never">Never</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Password Expiry (days)"
                        name="passwordExpiry"
                    >
                        <Select>
                            <Option value="30">30 days</Option>
                            <Option value="60">60 days</Option>
                            <Option value="90">90 days</Option>
                            <Option value="180">180 days</Option>
                            <Option value="never">Never</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Divider />

            <Title level={5}>Access Control</Title>
            <Row gutter={24}>
                <Col span={24}>
                    <Form.Item
                        label="IP Whitelist"
                        name="ipWhitelist"
                        extra="Enter IP addresses separated by commas (leave empty to allow all)"
                    >
                        <Input.TextArea 
                            rows={3} 
                            placeholder="e.g., 192.168.1.1, 10.0.0.0/24"
                        />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        label="API Access"
                        name="apiAccess"
                        valuePropName="checked"
                        extra="Allow third-party applications to access your account via API"
                    >
                        <Switch />
                    </Form.Item>
                </Col>
            </Row>

            <Divider />

            <Title level={5}>Active Sessions</Title>
            <Card size="small">
                <Space direction="vertical" style={{width: '100%'}}>
                    <div>
                        <Text strong>Current Session</Text>
                        <br />
                        <Text type="secondary">Chrome on macOS • San Francisco, CA</Text>
                        <br />
                        <Text type="secondary" style={{fontSize: 12}}>Last active: Just now</Text>
                    </div>
                    <Divider style={{margin: '12px 0'}} />
                    <div>
                        <Text strong>iPhone 13</Text>
                        <br />
                        <Text type="secondary">Safari on iOS • New York, NY</Text>
                        <br />
                        <Text type="secondary" style={{fontSize: 12}}>Last active: 2 hours ago</Text>
                    </div>
                    <Button type="link" danger style={{padding: 0}}>
                        Sign out all other sessions
                    </Button>
                </Space>
            </Card>

            <Form.Item style={{marginTop: 24}}>
                <Space>
                    <GradientButton htmlType="submit">
                        Save Security Settings
                    </GradientButton>
                    <Button onClick={() => securityForm.resetFields()}>
                        Reset
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return renderProfileSettings();
            case 'preferences':
                return renderPreferencesSettings();
            case 'notifications':
                return renderNotificationSettings();
            case 'security':
                return renderSecuritySettings();
            default:
                return renderProfileSettings();
        }
    };

    return (
        <ContentArea
            title="Settings"
            subTitle="Manage your account settings and preferences"
            avatar={{
                icon: <SettingOutlined />,
                shape: 'square'
            }}
        >
            <ProCard gutter={[16, 16]} ghost>
                <ProCard colSpan={{xs: 24, sm: 6, md: 5}} direction="column">
                    <Space direction="vertical" style={{width: '100%'}}>
                        {menuItems.map(item => (
                            <Button
                                key={item.key}
                                type={activeTab === item.key ? 'primary' : 'text'}
                                icon={item.icon}
                                onClick={() => setActiveTab(item.key)}
                                style={{
                                    width: '100%',
                                    justifyContent: 'flex-start',
                                    background: activeTab === item.key ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent'
                                }}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Space>
                </ProCard>
                <ProCard colSpan={{xs: 24, sm: 18, md: 19}}>
                    <Card>
                        {renderContent()}
                    </Card>
                </ProCard>
            </ProCard>
        </ContentArea>
    );
};

export default SettingsPage;