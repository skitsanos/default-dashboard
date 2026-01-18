import {Button, Space} from 'antd';
import {HomeOutlined, ArrowLeftOutlined} from '@ant-design/icons';
import {history} from 'umi';

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

            <style>{`
                .page-404 {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #0a0a0a;
                    position: relative;
                    overflow: hidden;
                }

                .content-404 {
                    text-align: center;
                    position: relative;
                    z-index: 10;
                    padding: 2rem;
                }

                .error-code {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                    margin-bottom: 2rem;
                }

                .digit {
                    font-family: 'Space Grotesk', sans-serif;
                    font-size: 10rem;
                    font-weight: 700;
                    line-height: 1;
                    color: #fff;
                }

                .digit.accent {
                    color: #7c3aed;
                }

                .content-404 h1 {
                    font-family: 'Space Grotesk', sans-serif;
                    font-size: 2rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: -0.025em;
                    color: #fff;
                    margin: 0 0 1rem 0;
                }

                .content-404 p {
                    font-family: 'Inter', sans-serif;
                    font-size: 1rem;
                    color: rgba(255, 255, 255, 0.6);
                    margin: 0 0 2rem 0;
                    line-height: 1.6;
                }

                /* Decorative blocks */
                .decor-block {
                    position: absolute;
                }

                .decor-1 {
                    top: 0;
                    right: 0;
                    width: 20rem;
                    height: 20rem;
                    background-color: rgba(124, 58, 237, 0.1);
                }

                .decor-2 {
                    bottom: 0;
                    left: 0;
                    width: 25rem;
                    height: 25rem;
                    background-color: rgba(124, 58, 237, 0.05);
                }

                /* Decorative lines */
                .decor-line {
                    position: absolute;
                    background-color: rgba(255, 255, 255, 0.05);
                }

                .decor-h {
                    top: 50%;
                    left: 0;
                    width: 100%;
                    height: 1px;
                }

                .decor-v {
                    top: 0;
                    left: 50%;
                    width: 1px;
                    height: 100%;
                }

                @media (max-width: 768px) {
                    .digit {
                        font-size: 5rem;
                    }

                    .content-404 h1 {
                        font-size: 1.5rem;
                    }

                    .content-404 p {
                        font-size: 0.875rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default Page404;
