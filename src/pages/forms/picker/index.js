//import DatePicker from '@/components/DatePicker';
import EmbeddedForm from '@/pages/forms/picker/EmbeddedForm';
import {Button, DatePicker, Divider, Form, Space} from 'antd';

import dayjs from 'dayjs';

const DATE_FORMAT = 'YYYY-MM-DD';

const page = () =>
{
    const [form] = Form.useForm();

    const [embeddedForm] = Form.useForm();

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

        <Divider/>

        <EmbeddedForm form={embeddedForm}
                      initialValues={{
                          createdOn: dayjs().add(22, 'd')
                      }}
                      onFinish={values =>
                      {
                          console.log('embedded:', values.createdOn);
                      }
                      }/>

        <Divider/>

        <Space>
            <Button onClick={() =>
            {
                form.submit();
            }
            }>Save</Button>

            <Button onClick={() => embeddedForm.submit()}>Save embedded form</Button>
        </Space>
    </>;
};


export default page;