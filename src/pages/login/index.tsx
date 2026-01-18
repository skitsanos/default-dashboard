import {apiPost, endpoints} from '@/api';
import useSession from '@/hooks/useSession';
import {useRequest} from 'ahooks';
import {Button, Form, Input, Alert} from 'antd';
import {useEffect, useState} from 'react';
import {history} from 'umi';
import {LockOutlined, UserOutlined, ArrowRightOutlined} from '@ant-design/icons';

const LoginPage = () =>
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

    const onFinish = (values: any) =>
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
            } = error as Record<string, any>;
            const {status} = response;
            setAuthError(true);

            if (status === 401)
            {
                setErrMessage(errData.message);
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
            const {session} = responseData?.result || {};
            const {token} = session || {};
            if (token)
            {
                login(responseData.result);
                history.push('/');
            }
        }
    }, [data]);

    return (
        <div className="login-page">
            {/* Left Panel - Branding */}
            <div className="login-branding">
                {/* Decorative Elements */}
                <div className="decor-block decor-top-right"/>
                <div className="decor-block decor-bottom-left"/>
                <div className="decor-line decor-vertical"/>
                <div className="decor-line decor-horizontal"/>

                {/* Logo */}
                <div className="branding-logo">
                    <div className="logo-icon">
                        {APP_NAME.charAt(0)}
                    </div>
                    <span className="logo-text">{APP_NAME}</span>
                </div>

                {/* Main Tagline */}
                <div className="branding-content">
                    <h1>
                        Welcome<br/>
                        <span className="accent">Back.</span>
                    </h1>
                    <p>
                        Sign in to access your dashboard and manage your resources with ease.
                    </p>
                </div>

                {/* Footer Quote */}
                <div className="branding-footer">
                    <p className="quote">
                        "Simplicity is the ultimate sophistication."
                    </p>
                    <div className="attribution">
                        <div className="avatar">LC</div>
                        <div className="info">
                            <span className="name">Leonardo da Vinci</span>
                            <span className="title">Renaissance Polymath</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel - Login Form */}
            <div className="login-form-panel">
                <div className="login-form-container">
                    {/* Mobile Logo */}
                    <div className="mobile-logo">
                        <div className="logo-icon">{APP_NAME.charAt(0)}</div>
                        <span className="logo-text">{APP_NAME}</span>
                    </div>

                    {/* Form Header */}
                    <div className="form-header">
                        <h2>Sign In</h2>
                        <div className="header-underline"/>
                    </div>

                    {/* Error Alert */}
                    {authError && (
                        <Alert
                            message={errMessage}
                            type="error"
                            showIcon
                            className="login-error"
                            closable
                            onClose={() => setAuthError(false)}
                        />
                    )}

                    {/* Login Form */}
                    <Form
                        onFinish={onFinish}
                        autoCapitalize="off"
                        autoComplete="off"
                        layout="vertical"
                        requiredMark={false}
                        className="login-form"
                    >
                        <Form.Item
                            name="username"
                            label="Username (demo)"
                            rules={[
                                {
                                    required: true,
                                    message: 'Username is required'
                                }
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined/>}
                                placeholder="Enter your username"
                                size="large"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Password (demodemo)"
                            rules={[
                                {
                                    required: true,
                                    message: 'Password is required'
                                }
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined/>}
                                placeholder="Enter your password"
                                size="large"
                            />
                        </Form.Item>

                        <Form.Item className="form-submit">
                            <Button
                                loading={loading}
                                type="primary"
                                htmlType="submit"
                                size="large"
                                block
                                icon={<ArrowRightOutlined/>}
                                iconPlacement="end"
                            >
                                Sign In
                            </Button>
                        </Form.Item>
                    </Form>

                    {/* Footer */}
                    <div className="form-footer">
                        <span>Version {APP_VERSION}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
