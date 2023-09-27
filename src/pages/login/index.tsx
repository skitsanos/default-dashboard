import {apiPost, endpoints} from '@/api';
import useSession from '@/hooks/useSession';
import {useRequest} from 'ahooks';
import {Button, Col, Form, Input, Layout, Row} from 'antd';
import {useEffect, useState} from 'react';
import {history} from 'umi';

const layout = {
    /*labelCol: {span: 8},
     wrapperCol: {span: 16}*/
};
const tailLayout = {
    wrapperCol: {offset: 6, span: 18}
};

const Index = () =>
{
    const {login} = useSession();

    const {data, error, loading, run} = useRequest(payload => apiPost(endpoints.login, {
        data: payload,
        getResponse: true
    }), {manual: true});

    console.log(data);

    const [authError, setAuthError] = useState(false);
    const [errMessage, setErrMessage] = useState(null);

    //submit the form data to an API
    const onFinish = async (values) =>
    {
        await run(values);
    };

    //watch for the possible API errors
    useEffect(() =>
    {
        if (error)
        {
            const {response, data: errData} = error;
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

    //process the login response
    useEffect(() =>
    {
        const {data: responseData} = data || {};
        if (responseData)
        {
            const {token} = responseData?.result || {};
            if (token)
            {
                login({session: responseData.result});

                history.push('/');
            }
        }
    }, [data]);

    return (<div className={'page-login'}>
        <Layout className={'transparent'}>
            <Layout.Content className={'flex'}>
                <Row>
                    <Col>
                        <div className={'shadow login-box'}>
                            <div>
                                <div style={{textAlign: 'center'}}>
                                    <h1>Login</h1>
                                </div>

                                {!authError && (<Form {...layout}
                                                      onFinish={onFinish}
                                                      initialValues={{remember: true}}>
                                    <Form.Item
                                        name={'email'}
                                        rules={[
                                            {
                                                required: true, message: 'Email is required'
                                            }
                                        ]}>
                                        <Input placeholder={'Email'}/>
                                    </Form.Item>

                                    <Form.Item
                                        name={'password'}
                                        rules={[
                                            {
                                                required: true, message: 'Password is missing'
                                            }
                                        ]}>
                                        <Input.Password placeholder={'Password'}/>
                                    </Form.Item>

                                    <Form.Item {...tailLayout}>
                                        <Button
                                            loading={loading}
                                            type={'primary'}
                                            htmlType={'submit'}>
                                            Let me in
                                        </Button>
                                    </Form.Item>
                                </Form>)}

                                {authError && <div>
                                    <div className={'mb align-center mb'}><h3 className={'red'}>{errMessage}</h3></div>
                                    <div className={'mt align-center mt'}>
                                        <Button loading={loading}
                                                type={'default'}
                                                onClick={() => setAuthError(false)}>
                                            Try again
                                        </Button>
                                    </div>
                                </div>}
                            </div>

                        </div>
                    </Col>
                </Row>
            </Layout.Content>

            <Layout.Footer className={'transparent'}>
                #footer
            </Layout.Footer>
        </Layout>
    </div>);
};

export default Index;
