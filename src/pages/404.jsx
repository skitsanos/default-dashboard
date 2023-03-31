import {Result} from 'antd';

const Page404 = () =>
{
    return <Result status={404}
                   title={'Not found'}
                   subTitle={'The page you are looking for is not found'}/>;
};

export default Page404;