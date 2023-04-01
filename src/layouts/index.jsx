import {app, ApplicationTheme} from '@/defaults';
import useLayoutSwitcher from '@/hooks/useLayoutSwitcher';
import sidebarMenu from '@/sidebarMenu';
import ProLayout from '@ant-design/pro-layout';
import {ConfigProvider} from 'antd';
import React, {useState} from 'react';
import {history, Link, Outlet} from 'umi';
import enUS from 'antd/locale/en_US';

const Container = () =>
{
    const [pathname, setPathname] = useState(document.location.pathname);

    const {layout} = useLayoutSwitcher();

    const menuItemRender = (item, dom) => <a onClick={() =>
    {
        history.push(item.path || '/');
        setPathname(item.path || '/');
    }}>{dom}</a>;

    return <ConfigProvider locale={enUS}
                           theme={ApplicationTheme}>
        <ProLayout {...sidebarMenu}
                   token={ApplicationTheme}
                   layout={layout}
                   fixSiderbar={true}
                   fixedHeader={true}
                   title={app.title}
                   location={{
                       pathname
                   }}
                   menuItemRender={menuItemRender}
                   siderMenuType={'group'}
                   menu={{
                       //collapsedShowGroupTitle: true
                   }}
                   onPageChange={console.log}>
            <ConfigProvider theme={ApplicationTheme}>
                <Outlet context={{
                    debug: true
                }}/>
            </ConfigProvider>

        </ProLayout>
    </ConfigProvider>;
};

export default Container;
