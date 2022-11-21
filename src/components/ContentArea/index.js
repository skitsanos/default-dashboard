import {PageContainer} from '@ant-design/pro-layout';
import React from 'react';
import {Link} from 'umi';

const ContentArea = props =>
{
    const {children, title, breadcrumb, subTitle, content, avatar, extra, onBack} = props;

    return <PageContainer title={title}
                          subTitle={subTitle}
                          content={content}
                          fixedHeader={true}
                          header={{
                              avatar,
                              extra,
                              onBack,
                              breadcrumb: {
                                  ...breadcrumb,
                                  itemRender: (route, params, routes, paths) =>
                                  {
                                      const last = routes.indexOf(route) === routes.length - 1;
                                      return last ? (
                                          <span>{route.breadcrumbName}</span>
                                      ) : (
                                          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
                                      );
                                  }
                              }
                          }}>
        <div className={'pt-xxl'}>
            {children}
        </div>

    </PageContainer>;
};

export default ContentArea;