import {app, hasNoLayout, publicRoutes} from '@/defaults';
import useLayoutSwitcher from '@/hooks/useLayoutSwitcher';
import useSession from '@/hooks/useSession';
import sidebarMenu from '@/sidebarMenu';
import ProLayout from '@ant-design/pro-layout';
import {ConfigProvider} from 'antd';
import enUS from 'antd/locale/en_US';
import {useEffect, useState} from 'react';
import {history, Link, Outlet, useLocation} from 'umi';
import ApplicationTheme from '@/theme';

const Container = () =>
{
    const location = useLocation();

    const allowed = publicRoutes.includes(location.pathname);

    const {session} = useSession();

    useEffect(() =>
    {
        if (!session && !allowed)
        {
            history.push('/login');
        }
        else if (session && allowed)
        {
            history.push('/');
        }
    }, [session, allowed]);

    const [pathname, setPathname] = useState(location.pathname);

    const {layout} = useLayoutSwitcher();

    const menuItemRender = (item, dom) => <Link to={item.path}
                                                onClick={() =>
                                                {
                                                    setPathname(item.path || '/');
                                                }}>{dom}</Link>;

    return <ConfigProvider locale={enUS}
                           theme={ApplicationTheme}>
        {!hasNoLayout.includes(location.pathname) && Boolean(session) && <ProLayout {...sidebarMenu}
            //token={ApplicationTheme.token}
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
                                                                                    }}>
            <ConfigProvider theme={ApplicationTheme}>
                <Outlet context={{
                    debug: true
                }}/>
            </ConfigProvider>
        </ProLayout>}

        {hasNoLayout.includes(document.location.pathname) && !session && <Outlet/>}
    </ConfigProvider>;
};

export default Container;
