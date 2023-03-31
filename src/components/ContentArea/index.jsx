import {PageContainer} from '@ant-design/pro-layout';
import {Link} from 'umi';
import {Breadcrumb, Col, Divider, Row, Space} from 'antd';

const itemRender = (route, params, items, paths) =>
{
    const last = items.indexOf(route) === items.length - 1;
    return last ? <span>{route.title}</span> : <Link to={paths.join('/')}>{route.title}</Link>;
};


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
            <Breadcrumb>
                {breadcrumb.map((item, index) => <Breadcrumb.Item key={`crumb-${item.title}`}>{item.path ?
                                                                                               <Link to={item.path}>{item.title}</Link> : item.title}
                </Breadcrumb.Item>)}
            </Breadcrumb>

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