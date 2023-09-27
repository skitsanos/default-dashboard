import {DatePicker, Form} from 'antd';

const DATE_FORMAT = 'YYYY-MM-DD';

const EmbeddedForm = ({form, onFinish, initialValues}) =>
{
    return <Form form={form}
                 initialValues={initialValues}
                 onFinish={onFinish}>
        <Form.Item name={'createdOn'}>
            <DatePicker format={DATE_FORMAT}/>
        </Form.Item>
    </Form>;
};

export default EmbeddedForm;