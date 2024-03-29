import {AvatarProps, BreadcrumbProps} from 'antd';
import {FC, ReactNode} from 'react';
import {PageHeader} from '@ant-design/pro-layout';

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
    return <>
        <PageHeader className={className}
                    avatar={avatar}
                    onBack={onBack}
                    title={title}
                    subTitle={subTitle}
                    breadcrumb={breadcrumb}
                    extra={extra}/>

        {content && <div className={'mt'}>{content}</div>}

        {children}
    </>;
};

export default ContentArea;