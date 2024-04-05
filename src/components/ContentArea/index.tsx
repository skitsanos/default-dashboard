import {AvatarProps, BreadcrumbProps} from 'antd';
import {FC, ReactNode} from 'react';
import {PageContainer} from '@ant-design/pro-layout';

export interface ContentAreaProps
{
    children?: ReactNode;
    className?: string;
    title: string;
    subTitle?: string | ReactNode;
    breadcrumb?: Partial<BreadcrumbProps>;
    content?: ReactNode;
    avatar?: AvatarProps;
    extra?: ReactNode;
    onBack?: () => {};
}

const ContentArea: FC<ContentAreaProps> = ({
                                               children,
                                               className,
                                               title,
                                               breadcrumb,
                                               subTitle,
                                               content,
                                               avatar,
                                               extra,
                                               onBack
                                           }) =>
{
    return <PageContainer fixedHeader={true}
                          affixProps={{
                              offsetTop: 0
                          }}
                          className={className ? `${className} page-header` : 'page-header'}
                          avatar={avatar}
                          onBack={onBack}
                          title={title}
                          subTitle={subTitle}
                          extra={extra}
                          header={{
                              breadcrumb
                          }}
                          content={<>
                              {content && <div className={'mt'}>{content}</div>}
                          </>
                          }>
        {children}
    </PageContainer>;
};

export default ContentArea;