import {Breadcrumb, Col, Divider, Row, Space} from 'antd';
import {Link} from 'umi';

const ContentArea = props =>
{
    const {
        children,
        title,
        breadcrumb,
        subTitle,
        content,
        avatar,
        extra,
        onBack
    } = props;

    return <>
        <div style={{
            //paddingLeft: 40,
            //paddingRight: 40
        }}>
            {breadcrumb && <Breadcrumb>
                {breadcrumb.map(item => <Breadcrumb.Item key={`crumb-${item.title}`}>{item.path ?
                    <Link to={item.path}>{item.title}</Link> : item.title}
                </Breadcrumb.Item>)}
            </Breadcrumb>}

            <div className={'h-box'}>
                <h1>{title}</h1>

                {subTitle && <div className={'ml'}>{subTitle}</div>}

                <Divider type={'vertical'}/>

                <Row style={{
                    flex: 1
                }}
                     justify={'end'}
                     align={'middle'}>
                    <Col>
                        <Space>
                            {extra}
                        </Space>
                    </Col>
                </Row>
            </div>

            {children}
        </div>
    </>;
};

export default ContentArea;