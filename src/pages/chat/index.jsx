import ContentArea from '@/components/ContentArea';
import {SendOutlined, UserOutlined} from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import {useMount, useWebSocket} from 'ahooks';
import {Button, Form, Input, Space} from 'antd';
import dayjs from 'dayjs';
import {useMemo, useRef} from 'react';

const ReadyState = {
    Connecting: 0,
    Open: 1,
    Closing: 2,
    Closed: 3
};

const spacing = 16;

const uiMessage = (raw, index) =>
{
    console.log(raw);

    return <div key={`message-${index}`}
                className={'h-box'}>
        <div>
            <UserOutlined/>
        </div>
        <div className={'ml mb'}>
            <div>{dayjs().format('YYYY-MM-DD HH:mm:ss')}</div>
            {raw.data}
        </div>
    </div>;
};

const Page = () =>
{
    const [form] = Form.useForm();

    const {readyState, sendMessage, latestMessage, disconnect, connect} = useWebSocket(
        'wss://socketsbay.com/wss/v2/1/demo/'
    );

    const messageHistory = useRef([]);

    messageHistory.current = useMemo(() =>
    {
        if (latestMessage)
        {
            messageHistory.current.push(latestMessage);
        }

        return messageHistory.current;
    }, [latestMessage]);

    useMount(() =>
    {
        //connect to websocket server when UI is ready
        connect();
    });

    const onFinish = values =>
    {
        const {message} = values;
        sendMessage(JSON.stringify({
            message
        }));

        messageHistory.current.push({data: JSON.stringify({message})});

        form.resetFields();
    };

    return <ContentArea title={'Chat'}
                        subTitle={'Websockets demonstration'}>
        <ProCard className={'chat'}
                 ghost={false}
                 bordered={true}
                 direction={'column'}
                 gutter={[spacing, spacing]}>
            <ProCard className={'chat-messages'}>
                {messageHistory.current.map((message, index) => uiMessage(message, index))}
            </ProCard>

            <ProCard bordered={true}>
                <Form form={form}
                      onFinish={onFinish}
                      inputMode={'text'}
                      layout={'inline'}>
                    <Form.Item name={'message'}>
                        <Input title={'Type'}/>
                    </Form.Item>

                    <Button htmlType={'submit'}
                            loading={readyState === ReadyState.Connecting || readyState === ReadyState.Closing}
                            disabled={readyState !== ReadyState.Open}
                            type={'primary'}
                            icon={<SendOutlined/>}>Send</Button>
                </Form>
            </ProCard>
        </ProCard>
    </ContentArea>;
};

export default Page;