import {Button, Space} from 'antd';
import {HomeOutlined, ArrowLeftOutlined} from '@ant-design/icons';
import {history} from 'umi';
import '@/pages/404.less';

const Page404 = () =>
{
    return (
        <div className="page-404">
            <div className="content-404">
                {/* Large 404 Display */}
                <div className="error-code">
                    <span className="digit">4</span>
                    <span className="digit accent">0</span>
                    <span className="digit">4</span>
                </div>

                {/* Message */}
                <h1>Page Not Found</h1>
                <p>
                    The page you're looking for doesn't exist or has been moved.
                    <br/>
                    Let's get you back on track.
                </p>

                {/* Actions */}
                <Space size="middle">
                    <Button
                        icon={<ArrowLeftOutlined/>}
                        onClick={() => history.back()}
                    >
                        Go Back
                    </Button>
                    <Button
                        type="primary"
                        icon={<HomeOutlined/>}
                        onClick={() => history.push('/')}
                    >
                        Dashboard
                    </Button>
                </Space>
            </div>

            {/* Decorative Elements */}
            <div className="decor-block decor-1"/>
            <div className="decor-block decor-2"/>
            <div className="decor-line decor-h"/>
            <div className="decor-line decor-v"/>

        </div>
    );
};

export default Page404;
