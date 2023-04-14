import {Breadcrumb, Col, Divider, Row, Space} from 'antd';

const ContentArea = ({
                         children,
                         title,
                         breadcrumbs,
                         subTitle,
                         content,
                         avatar,
                         extra,
                         onBack
                     }) =>
{
    return <>
        <div style={{
            //paddingLeft: 40,
            //paddingRight: 40
        }}>
            {breadcrumbs && <Breadcrumb items={breadcrumbs.map(el => ({
                key: `route-${el.path}`,
                title: el.title,
                href: el.path
            }))}>
            </Breadcrumb>}

            <div className={'h-box'}>
                {avatar && <span className={'mr'}>{avatar}</span>}<h1>{title}</h1>

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

            {content && <div className={'mt'}>{content}</div>}

            {children}
        </div>
    </>;
};

export default ContentArea;