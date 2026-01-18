import {hasNoLayout, publicRoutes} from '@/defaults';
import useSession from '@/hooks/useSession';
import sidebarMenu from '@/sidebarMenu';
import ProLayout from '@ant-design/pro-layout';
import {App, ConfigProvider} from 'antd';
import enUS from 'antd/locale/en_US';
import {useEffect} from 'react';
import {history, Link, Outlet, useLocation} from 'umi';
import dutchyTheme from '@/theme/dutchyTheme';
import {ReactComponent as IconLogo} from '@/assets/logo.svg';
import {LogoutOutlined, UserOutlined} from '@ant-design/icons';

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

    const menuItemRender = (item, dom) => <Link to={item.path}>{dom}</Link>;

    return <App message={{maxCount: 1}}>
        <ConfigProvider locale={enUS}
                        theme={dutchyTheme}>

            {!hasNoLayout.includes(location.pathname) && Boolean(session) && <ProLayout {...sidebarMenu}
                                                                                        layout={'side'}
                                                                                        fixSiderbar={true}
                                                                                        fixedHeader={true}
                                                                                        title={APP_NAME}
                                                                                        logo={<IconLogo width={24}/>}
                                                                                        location={{
                                                                                            pathname: location.pathname
                                                                                        }}
                                                                                        menuItemRender={menuItemRender}
                                                                                        siderMenuType={'group'}
                                                                                        menu={{
                                                                                            //collapsedShowGroupTitle:
                                                                                            // true
                                                                                        }}
                                                                                        menuFooterRender={(props) => (
                                                                                            <div className="sidebar-footer">
                                                                                                <Link to="/profile" className="footer-link">
                                                                                                    <UserOutlined/>
                                                                                                    {!props?.collapsed && <span>Profile</span>}
                                                                                                </Link>
                                                                                                <Link to="/logout" className="footer-link logout">
                                                                                                    <LogoutOutlined/>
                                                                                                    {!props?.collapsed && <span>Logout</span>}
                                                                                                </Link>
                                                                                            </div>
                                                                                        )}>

                <Outlet context={{
                    session
                }}/>
            </ProLayout>}

            {hasNoLayout.includes(document.location.pathname) && !session && <Outlet/>}

        </ConfigProvider>
    </App>;
};

export default Container;
