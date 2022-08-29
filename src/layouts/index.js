import {app} from '@/defaults';
import sidebarMenu from '@/sidebarMenu';
import {UserOutlined} from '@ant-design/icons';
import ProLayout from '@ant-design/pro-layout';
import {Avatar, ConfigProvider} from 'antd';
import enUS from 'antd/lib/locale/en_US';
import React, {useState} from 'react';
import {Outlet, history} from "umi";

const Container = props =>
{
    console.log(history)

    const [pathname, setPathname] = useState(document.location.pathname);

    return <ConfigProvider locale={enUS}>
        <ProLayout {...sidebarMenu}
                   fixSiderbar={true}
                   fixedHeader={true}
                   title={app.title}
                   location={{
                       pathname
                   }}
                   menuItemRender={(item, dom) =>
                       <a onClick={() =>
                       {
                           history.push(item.path || '/');
                           setPathname(item.path || '/');
                       }}>{dom}</a>}
                   rightContentRender={() =>
                       <div>
                           <Avatar shape={'square'}
                                   size={'small'}
                                   icon={<UserOutlined/>}/>
                       </div>
                   }>
            <Outlet />
        </ProLayout>
    </ConfigProvider>;
};

export default Container;
