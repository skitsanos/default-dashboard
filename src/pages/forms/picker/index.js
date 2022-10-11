import DatePicker from '@/components/DatePicker';
import {Button, Form, Space} from 'antd';

import dayjs from 'dayjs';

const DATE_FORMAT = 'YYYY-MM-DD';

const page = () =>
{
    const [form] = Form.useForm();

    const onFinish = values =>
    {
        console.log(values.createdOn);
    };

    return <>
        <h2>Form</h2>
        <Form form={form}
              initialValues={{
                  createdOn: dayjs()
              }}
              onFinish={onFinish}>
            <Form.Item name={'createdOn'}>
                <DatePicker format={DATE_FORMAT}/>
            </Form.Item>
        </Form>

        <Space>
            <Button onClick={() =>
            {
                form.submit();
            }
            }>Save</Button>
        </Space>
    </>;
};

export default page;