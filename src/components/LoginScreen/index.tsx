import {apiPost, endpoints} from '@/api';
import useSession from '@/hooks/useSession';
import {useRequest} from 'ahooks';
import {Form, Input, Typography, Space, Alert} from 'antd';
import {useEffect, useState} from 'react';
import {ReactComponent as IconLogo} from '@/assets/logo.svg';
import {ApiResponse, ApiError, LoginResponse, LoginRequest} from '@/@types/api';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import GradientButton from '@/components/GradientButton';
import './style.less';

const {Title, Text} = Typography;

const LoginScreen = () =>
{
    const {login} = useSession();

    const {
        data,
        error,
        loading,
        run
    } = useRequest(payload => apiPost(endpoints.login, {
        data: payload,
        getResponse: true
    }), {manual: true});

    const [authError, setAuthError] = useState(false);
    const [errMessage, setErrMessage] = useState<string | null>(null);

    const onFinish = (values: LoginRequest) =>
    {
        setAuthError(false);
        run(values);
    };

    useEffect(() =>
    {
        if (error)
        {
            const {
                response,
                data: errData
            } = error as unknown as ApiError;
            const {status} = response;
            setAuthError(true);

            if (status === 401)
            {
                setErrMessage(errData.message || 'Invalid credentials');
            }
            else
            {
                setErrMessage(`Network error occurred. Err#${status}`);
            }
        }
    }, [error]);

    useEffect(() =>
    {
        const {data: responseData} = data || {};
        if (responseData)
        {
            const apiResponse = responseData as ApiResponse<LoginResponse>;
            const {session} = apiResponse?.result || {};
            const {token} = session || {};
            if (token)
            {
                login(apiResponse.result);
            }
        }
    }, [data, login]);

    return <div className="login-screen">
        <div className="login-screen-left">
            <div className="animated-background">
                <div className="gradient-sphere sphere-1"></div>
                <div className="gradient-sphere sphere-2"></div>
                <div className="gradient-sphere sphere-3"></div>
            </div>
            <div className="left-content">
                <IconLogo className="large-logo"/>
                <Title level={1} className="welcome-title">Welcome to {APP_NAME}</Title>
                <Text className="welcome-subtitle">
                    Your powerful dashboard for managing everything in one place
                </Text>
            </div>
        </div>

        <div className="login-screen-right">
            <div className="login-form-container">
                <Space direction="vertical" size="large" className="login-form-wrapper">
                    <div className="form-header">
                        <Title level={2}>Sign In</Title>
                        <Text type="secondary">Enter your credentials to continue</Text>
                    </div>

                    {authError && (
                        <Alert 
                            message={errMessage} 
                            type="error" 
                            showIcon 
                            closable
                            onClose={() => setAuthError(false)}
                            style={{
                                backgroundColor: '#fff2f0',
                                borderColor: '#ffccc7'
                            }}
                        />
                    )}

                    <Form
                        name="login"
                        onFinish={onFinish}
                        autoComplete="off"
                        layout="vertical"
                        size="large"
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please enter your username' }]}
                        >
                            <Input 
                                prefix={<UserOutlined />} 
                                placeholder="Username" 
                                autoFocus
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please enter your password' }]}
                        >
                            <Input.Password 
                                prefix={<LockOutlined />} 
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item>
                            <GradientButton 
                                htmlType="submit" 
                                block 
                                loading={loading}
                                size="large"
                            >
                                Sign In
                            </GradientButton>
                        </Form.Item>
                    </Form>

                    <div className="form-footer">
                        <Text type="secondary">
                            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
                        </Text>
                        {process.env.NODE_ENV === 'development' && (
                            <div style={{marginTop: '1rem'}}>
                                <Text type="secondary" style={{fontSize: '12px'}}>
                                    Test accounts: admin/admin123, demo/demo123, user/user123
                                </Text>
                            </div>
                        )}
                    </div>
                </Space>
            </div>
        </div>
    </div>;
};

export default LoginScreen;