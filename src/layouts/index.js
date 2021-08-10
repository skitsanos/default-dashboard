import ProLayout from '@ant-design/pro-layout';
import React from 'react';

const Container = props =>
{
    const {children} = props;
    return <ProLayout fixSiderbar={true}
                      fixedHeader={true}>
        {children}
    </ProLayout>;
};

export default Container;