import ContentArea from '@/components/ContentArea';
import EmbeddedForm from '@/pages/forms/picker/EmbeddedForm';
import {Button, DatePicker, Descriptions, Divider, Form, Space} from 'antd';
import type {Dayjs} from 'dayjs';
import dayjs from 'dayjs';
import {useState} from 'react';

const DATE_FORMAT = 'YYYY-MM-DD';

interface PickerValues
{
    createdOn?: Dayjs;
}

const Page = () =>
{
    const [form] = Form.useForm<PickerValues>();

    const [embeddedForm] = Form.useForm<PickerValues>();

    const [submitted, setSubmitted] = useState<Record<string, string>>({});

    const record = (label: string) => (values: PickerValues) => setSubmitted(current => ({
        ...current,
        [label]: values.createdOn?.format(DATE_FORMAT) ?? '(empty)'
    }));

    return <ContentArea title={'Date picker'}
                        subTitle={'A standalone form and an embedded one sharing the same date format'}>
        <Form form={form}
              initialValues={{createdOn: dayjs()}}
              onFinish={record('Form')}>
            <Form.Item name={'createdOn'}>
                <DatePicker format={DATE_FORMAT}/>
            </Form.Item>
        </Form>

        <Divider/>

        <EmbeddedForm form={embeddedForm}
                      initialValues={{createdOn: dayjs().add(22, 'd')}}
                      onFinish={values => record('Embedded form')(values as PickerValues)}/>

        <Divider/>

        <Space>
            <Button onClick={() => form.submit()}>Save</Button>

            <Button onClick={() => embeddedForm.submit()}>Save embedded form</Button>
        </Space>

        {Object.keys(submitted).length > 0 && <Descriptions className={'mt'}
                                                            column={1}
                                                            bordered={true}
                                                            size={'small'}>
            {Object.entries(submitted).map(([label, value]) => <Descriptions.Item key={label}
                                                                                  label={label}>
                {value}
            </Descriptions.Item>)}
        </Descriptions>}
    </ContentArea>;
};

export default Page;
