import ContentArea from '@/components/ContentArea';
import EmbeddedForm from '@/pages/forms/picker/EmbeddedForm';
import {Button, DatePicker, Divider, Form, Space} from 'antd';
import type {Dayjs} from 'dayjs';
import dayjs from 'dayjs';

const DATE_FORMAT = 'YYYY-MM-DD';

interface PickerValues
{
    createdOn?: Dayjs;
}

const Page = () =>
{
    const [form] = Form.useForm<PickerValues>();

    const [embeddedForm] = Form.useForm<PickerValues>();

    const onFinish = (values: PickerValues) => console.log('form:', values.createdOn?.format(DATE_FORMAT));

    return <ContentArea title={'Date picker'}
                        subTitle={'Form and embedded form sharing the same date format'}>
        <Form form={form}
              initialValues={{createdOn: dayjs()}}
              onFinish={onFinish}>
            <Form.Item name={'createdOn'}>
                <DatePicker format={DATE_FORMAT}/>
            </Form.Item>
        </Form>

        <Divider/>

        <EmbeddedForm form={embeddedForm}
                      initialValues={{createdOn: dayjs().add(22, 'd')}}
                      onFinish={values => console.log('embedded:', (values as PickerValues).createdOn?.format(DATE_FORMAT))}/>

        <Divider/>

        <Space>
            <Button onClick={() => form.submit()}>Save</Button>

            <Button onClick={() => embeddedForm.submit()}>Save embedded form</Button>
        </Space>
    </ContentArea>;
};

export default Page;
