import {Breadcrumb, Col, Divider, Row, Space} from 'antd';
import {FC, ReactNode} from 'react';

export interface ContentAreaProps
{
    children?: ReactNode;
    className?: string;
    title: string;
    subTitle?: string | ReactNode;
    breadcrumbs?: any[];
    content?: ReactNode;
    avatar?: ReactNode;
    extra?: ReactNode;
    onBack?: () => {};
}

const ContentArea: FC<ContentAreaProps> = ({
                                               children,
                                               className,
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
        <div className={className} style={{
            flex: 1
        }}>
            {breadcrumbs && <Breadcrumb items={breadcrumbs.map(el => ({
                key: `route-${el.path}`,
                title: el.title,
                href: el.path
            }))}>
            </Breadcrumb>}

            <div className={`h-box`}>
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