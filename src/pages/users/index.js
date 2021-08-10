import ContentArea from '@/components/ContentArea';
import {Button} from 'antd';

const Page = props =>
{
    const {history} = props;

    return <ContentArea title={'Users'}>

        <Button type={'link'}
                onClick={() => history.push('/')}>Go back to Dashboard</Button>
    </ContentArea>;
};

export default Page;