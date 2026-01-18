import ContentArea from '@/components/ContentArea';
import useSession from '@/hooks/useSession';
import {
    Avatar,
    Button,
    Card,
    Col,
    Descriptions,
    Divider,
    Form,
    Input,
    Row,
    Space,
    Statistic,
    message
} from 'antd';
import {
    UserOutlined,
    MailOutlined,
    CalendarOutlined,
    EditOutlined,
    SaveOutlined,
    KeyOutlined
} from '@ant-design/icons';
import {useState} from 'react';
import {useOutletContext} from 'umi';

const ProfilePage = () =>
{
    const {session} = useOutletContext<{ session: any }>();
    const [isEditing, setIsEditing] = useState(false);
    const [form] = Form.useForm();

    const defaultUser = {
        email: 'user@example.com',
        _key: '000000',
        createdOn: Date.now(),
        lastLogin: Date.now()
    };

    const user = {
        ...defaultUser,
        ...session?.session?.user
    };

    const formatDate = (timestamp: number) =>
    {
        if (!timestamp) return 'N/A';
        return new Date(timestamp).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getInitials = (email?: string) =>
    {
        if (!email) return 'U';
        return email.substring(0, 2).toUpperCase();
    };

    const handleSave = (values: any) =>
    {
        console.log('Profile updated:', values);
        message.success('Profile updated successfully');
        setIsEditing(false);
    };

    return (
        <ContentArea title="Profile">
            <Row gutter={[24, 24]}>
                {/* Profile Header Card */}
                <Col xs={24}>
                    <Card className="dutchy-accent">
                        <div className="profile-header">
                            <Avatar
                                size={96}
                                src={user.gravatar}
                                icon={!user.gravatar && <UserOutlined/>}
                                className="profile-avatar"
                            >
                                {!user.gravatar && getInitials(user.email)}
                            </Avatar>
                            <div className="profile-info">
                                <h2 className="profile-name">{user.email}</h2>
                                <p className="profile-id">
                                    <span className="label">User ID:</span>
                                    <code>{user._key}</code>
                                </p>
                            </div>
                            <div className="profile-actions">
                                {!isEditing ? (
                                    <Button
                                        icon={<EditOutlined/>}
                                        onClick={() => setIsEditing(true)}
                                    >
                                        Edit Profile
                                    </Button>
                                ) : (
                                    <Space>
                                        <Button onClick={() => setIsEditing(false)}>
                                            Cancel
                                        </Button>
                                        <Button
                                            type="primary"
                                            icon={<SaveOutlined/>}
                                            onClick={() => form.submit()}
                                        >
                                            Save
                                        </Button>
                                    </Space>
                                )}
                            </div>
                        </div>
                    </Card>
                </Col>

                {/* Stats */}
                <Col xs={24} md={8}>
                    <Card>
                        <Statistic
                            title="Member Since"
                            value={formatDate(user.createdOn)}
                            prefix={<CalendarOutlined/>}
                        />
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Card>
                        <Statistic
                            title="Last Login"
                            value={formatDate(user.lastLogin)}
                            prefix={<CalendarOutlined/>}
                        />
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Card>
                        <Statistic
                            title="Account Status"
                            value="Active"
                            styles={{content: {color: '#16a34a'}}}
                        />
                    </Card>
                </Col>

                {/* Profile Details / Edit Form */}
                <Col xs={24} lg={16}>
                    <Card title="Account Information">
                        {!isEditing ? (
                            <Descriptions column={1} labelStyle={{fontWeight: 700}}>
                                <Descriptions.Item label="Email Address">
                                    <Space>
                                        <MailOutlined/>
                                        {user.email}
                                    </Space>
                                </Descriptions.Item>
                                <Descriptions.Item label="User ID">
                                    <code>{user._key}</code>
                                </Descriptions.Item>
                                <Descriptions.Item label="Account Created">
                                    {formatDate(user.createdOn)}
                                </Descriptions.Item>
                                <Descriptions.Item label="Last Login">
                                    {formatDate(user.lastLogin)}
                                </Descriptions.Item>
                            </Descriptions>
                        ) : (
                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={handleSave}
                                initialValues={{
                                    email: user.email,
                                    displayName: ''
                                }}
                            >
                                <Form.Item
                                    name="email"
                                    label="Email Address"
                                    rules={[
                                        {required: true, message: 'Email is required'},
                                        {type: 'email', message: 'Invalid email format'}
                                    ]}
                                >
                                    <Input
                                        prefix={<MailOutlined/>}
                                        placeholder="your@email.com"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="displayName"
                                    label="Display Name"
                                >
                                    <Input
                                        prefix={<UserOutlined/>}
                                        placeholder="Your display name"
                                    />
                                </Form.Item>
                            </Form>
                        )}
                    </Card>
                </Col>

                {/* Security */}
                <Col xs={24} lg={8}>
                    <Card title="Security">
                        <div className="security-section">
                            <div className="security-item">
                                <div className="security-icon">
                                    <KeyOutlined/>
                                </div>
                                <div className="security-info">
                                    <h4>Password</h4>
                                    <p>Last changed 30 days ago</p>
                                </div>
                            </div>
                            <Divider/>
                            <Button block icon={<KeyOutlined/>}>
                                Change Password
                            </Button>
                        </div>
                    </Card>
                </Col>
            </Row>

            <style>{`
                .profile-header {
                    display: flex;
                    align-items: center;
                    gap: 24px;
                    flex-wrap: wrap;
                }

                .profile-avatar {
                    background-color: #7c3aed;
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 700;
                }

                .profile-info {
                    flex: 1;
                    min-width: 200px;
                }

                .profile-name {
                    font-family: 'Space Grotesk', sans-serif;
                    font-size: 1.5rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: -0.025em;
                    margin: 0 0 8px 0;
                }

                .profile-id {
                    color: #737373;
                    margin: 0;
                    font-size: 0.875rem;
                }

                .profile-id .label {
                    margin-right: 8px;
                }

                .profile-id code {
                    font-family: 'JetBrains Mono', monospace;
                    background-color: #f5f5f5;
                    padding: 2px 8px;
                }

                .profile-actions {
                    margin-left: auto;
                }

                .security-section {
                    padding: 8px 0;
                }

                .security-item {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }

                .security-icon {
                    width: 48px;
                    height: 48px;
                    background-color: #f5f5f5;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.25rem;
                    color: #737373;
                }

                .security-info h4 {
                    margin: 0;
                    font-weight: 700;
                    text-transform: uppercase;
                    font-size: 0.875rem;
                    letter-spacing: 0.025em;
                }

                .security-info p {
                    margin: 4px 0 0 0;
                    color: #737373;
                    font-size: 0.75rem;
                }

                @media (max-width: 768px) {
                    .profile-header {
                        flex-direction: column;
                        text-align: center;
                    }

                    .profile-actions {
                        margin-left: 0;
                        width: 100%;
                    }

                    .profile-actions button {
                        width: 100%;
                    }
                }
            `}</style>
        </ContentArea>
    );
};

export default ProfilePage;
