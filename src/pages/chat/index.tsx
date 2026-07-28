import ContentArea from '@/components/ContentArea';
import Loading from '@/components/Loading';
import {SendOutlined, UserOutlined} from '@ant-design/icons';
import {useWebSocket} from 'ahooks';
import {Button, Card, Form, Input, Space} from 'antd';
import dayjs from 'dayjs';
import {useEffect, useState} from 'react';

// Mirrors ahooks' ReadyState, which is not re-exported from the package root.
const READY_STATE_OPEN = 1;

interface ChatMessage
{
    id: number;
    body: string;
    receivedAt: string;
    outgoing: boolean;
}

// Matches the `/ws` proxy declared in .umirc.ts, so the target only has to be configured in one place.
const socketUrl = () =>
{
    const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
    return `${protocol}//${location.host}/ws`;
};

const Page = () =>
{
    const [form] = Form.useForm();

    const [messages, setMessages] = useState<ChatMessage[]>([]);

    const {
        readyState,
        sendMessage,
        latestMessage,
        connect
    } = useWebSocket(socketUrl(), {manual: true});

    useEffect(() => connect(), []);

    useEffect(() =>
    {
        if (!latestMessage)
        {
            return;
        }

        setMessages(current => [...current, {
            id: current.length,
            body: String(latestMessage.data),
            receivedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            outgoing: false
        }]);
    }, [latestMessage]);

    const onFinish = (values: {message?: string}) =>
    {
        const {message} = values;
        if (!message)
        {
            return;
        }

        sendMessage(JSON.stringify({message}));

        setMessages(current => [...current, {
            id: current.length,
            body: message,
            receivedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            outgoing: true
        }]);

        form.resetFields();
    };

    const connected = readyState === READY_STATE_OPEN;

    return <ContentArea title={'Chat'}
                        subTitle={'Websockets demonstration'}>

        <Loading loading={!connected}/>

        <Card className={'chat chat-messages mb'}
              variant={'outlined'}>
            {messages.map(message => <div key={`message-${message.id}`}
                                          className={'h-box mb'}>
                <div>
                    <UserOutlined/>
                </div>
                <div className={'ml'}>
                    <div className={'silent'}>{message.receivedAt}</div>
                    {message.body}
                </div>
            </div>)}
        </Card>

        <Card variant={'outlined'}>
            <Form form={form}
                  onFinish={onFinish}
                  layout={'inline'}>
                <Space>
                    <Form.Item name={'message'}
                               noStyle={true}>
                        <Input title={'Type'}
                               placeholder={'Type a message'}/>
                    </Form.Item>

                    <Button htmlType={'submit'}
                            disabled={!connected}
                            type={'primary'}
                            icon={<SendOutlined/>}>Send</Button>
                </Space>
            </Form>
        </Card>
    </ContentArea>;
};

export default Page;
