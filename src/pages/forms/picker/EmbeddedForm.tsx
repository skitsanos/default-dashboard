import {DatePicker, Form, FormInstance} from 'antd';
import {FC} from 'react';

const DATE_FORMAT = 'YYYY-MM-DD';

export interface EmbeddedFormProps
{
    form: FormInstance;
    onFinish?: (values: Record<string, unknown>) => void;
    initialValues?: Record<string, unknown>;
}

const EmbeddedForm: FC<EmbeddedFormProps> = ({
                                                 form,
                                                 onFinish,
                                                 initialValues
                                             }) => <Form form={form}
                                                         initialValues={initialValues}
                                                         onFinish={onFinish}>
    <Form.Item name={'createdOn'}>
        <DatePicker format={DATE_FORMAT}/>
    </Form.Item>
</Form>;

export default EmbeddedForm;
