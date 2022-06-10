import {SendOutlined, UserOutlined} from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import {useMount, useWebSocket} from 'ahooks';
import {Button, Comment, Form, Input} from 'antd';
import dayjs from 'dayjs';
import {useEffect, useMemo, useRef} from 'react';
import {Scrollbars} from 'react-custom-scrollbars';

const ReadyState = {
    Connecting: 0,
    Open: 1,
    Closing: 2,
    Closed: 3
};

const spacing = 16;

const uiMessage = (raw, index) =>
{
    try
    {
        const {message} = JSON.parse(raw.data);

        return <Comment key={index}
                        datetime={dayjs().format('YYYY-MM-DD HH:mm:ss')}
                        avatar={<UserOutlined/>}
                        content={message}/>;
    } catch (ex)
    {
        //skip if someone sent something non-json
    }

    return null;
};

const Page = () =>
{
    const [form] = Form.useForm();
    const refScroll = useRef();

    const {readyState, sendMessage, latestMessage, connect} = useWebSocket(
        'ws://demo-chat.anyscripts.com/pubsub/mydemochatroom'
    );

    const messageHistory = useRef([]);
    messageHistory.current = useMemo(() => messageHistory.current.concat(latestMessage), [
        latestMessage
    ]);

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

        form.resetFields();
    };

    return <ProCard className={'chat'}
                    title={'Chat'}
                    ghost={false}
                    bordered={true}
                    direction={'column'}
                    gutter={[spacing, spacing]}>
        <ProCard className={'chat-messages'}>
            <Scrollbars ref={refScroll}>
                {messageHistory.current.map(uiMessage)}
            </Scrollbars>
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
    </ProCard>;
};

export default Page;