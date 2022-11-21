import {app, ApplicationTheme} from '@/defaults';
import sidebarMenu from '@/sidebarMenu';
import {UserOutlined} from '@ant-design/icons';
import ProLayout from '@ant-design/pro-layout';
import {Avatar, ConfigProvider} from 'antd';
import React, {useState} from 'react';
import {Outlet, history} from 'umi';
import enUS from 'antd/locale/en_US';

const Container = () =>
{
    const [pathname, setPathname] = useState(document.location.pathname);

    return <ConfigProvider locale={enUS}
                           theme={ApplicationTheme}>
        <ProLayout {...sidebarMenu}
                   token={ApplicationTheme}
                   fixSiderbar={true}
                   fixedHeader={true}
                   title={app.title}
                   location={{
                       pathname
                   }}
                   menuItemRender={(item, dom) => <a onClick={() =>
                   {
                       history.push(item.path || '/');
                       setPathname(item.path || '/');
                   }}>{dom}</a>}
                   siderMenuType="group"
                   menu={{
                       collapsedShowGroupTitle: true
                   }}
                   avatarProps={{
                       src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
                       size: 'small',
                       title: 'Profile'
                   }}>
            <ConfigProvider theme={ApplicationTheme}>
                <Outlet context={{
                    debug: true
                }}/>
            </ConfigProvider>

        </ProLayout>
    </ConfigProvider>;
};

export default Container;
