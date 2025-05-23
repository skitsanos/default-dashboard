import {apiPost, endpoints} from '@/api';
import useSession from '@/hooks/useSession';
import {useRequest} from 'ahooks';
import {Avatar, Button, Divider, Flex, Form, Input} from 'antd';
import {useEffect, useState} from 'react';
import {history} from 'umi';
import {ReactComponent as IconLogo} from '@/assets/logo.svg';
import {ApiResponse, ApiError, LoginResponse, LoginRequest} from '@/@types/api';

const Index = () =>
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

    //submit the form data to an API
    const onFinish = (values: LoginRequest) =>
    {
        run(values);
    };

    //watch for the possible API errors
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
            const apiResponse = responseData as ApiResponse<LoginResponse>;
            const {session} = apiResponse?.result || {};
            const {token} = session || {};
            if (token)
            {
                login(apiResponse.result);

                history.push('/');
            }
        }
    }, [data, login]);

    return <div className={'page-login'}>
        <Flex align={'center'}
              gap={'middle'}>
            <Avatar icon={<IconLogo/>}
                    className={'logo'}
                    size={128}/>
            <Divider type={'vertical'}
                     style={{height: 100}}/>

            <div className={'login-box'}>
                <h1>{APP_NAME}</h1>

                {!authError && (<Form onFinish={onFinish}
                                      autoCapitalize={'off'}
                                      autoComplete={'off'}
                                      initialValues={{remember: true}}>
                    <Form.Item name={'username'}
                               rules={[
                                   {
                                       required: true,
                                       message: 'Username is required'
                                   }
                               ]}>
                        <Input placeholder={'Username'}/>
                    </Form.Item>

                    <Form.Item name={'password'}
                               rules={[
                                   {
                                       required: true,
                                       message: 'Password is missing'
                                   }
                               ]}>
                        <Input.Password placeholder={'Password'}/>
                    </Form.Item>

                    <Form.Item>
                        <Button loading={loading}
                                type={'primary'}
                                htmlType={'submit'}>Let me in</Button>
                    </Form.Item>
                </Form>)}

                {authError && <div>
                    <div className={'mb align-center mb'}><h3 className={'red'}>{errMessage}</h3></div>
                    <div className={'mt'}>
                        <Button loading={loading}
                                type={'default'}
                                onClick={() => setAuthError(false)}>
                            Try again
                        </Button>
                    </div>
                </div>}
            </div>
        </Flex>
    </div>;
};

export default Index;
