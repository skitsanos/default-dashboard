import {hasNoLayout, publicRoutes} from '@/defaults';
import useSession from '@/hooks/useSession';
import sidebarMenu from '@/sidebarMenu';
import ProLayout from '@ant-design/pro-layout';
import {App, ConfigProvider, Dropdown} from 'antd';
import enUS from 'antd/locale/en_US';
import {useEffect} from 'react';
import {Link, Outlet, useLocation, useNavigate} from 'umi';
import {ReactComponent as IconLogo} from '@/assets/logo.svg';
import ApplicationTheme from '@/theme';
import useLayoutSwitcher from '@/hooks/useLayoutSwitcher';
import LoginScreen from '@/components/LoginScreen';
import {LogoutOutlined} from '@ant-design/icons';

const Container = () =>
{
    const location = useLocation();
    const navigate = useNavigate();

    const {layout}=useLayoutSwitcher();

    const allowed = publicRoutes.includes(location.pathname);

    const {session, logout} = useSession();

    useEffect(() =>
    {
        if (session && allowed)
        {
            navigate('/', {replace: true});
        }
    }, [session, allowed, navigate]);

    const menuItemRender = (item: any, dom: React.ReactNode) => <Link to={item.path}>{dom}</Link>;

    // Show login screen when no session
    if (!session && !hasNoLayout.includes(location.pathname))
    {
        return <App message={{maxCount: 1}}>
            <ConfigProvider locale={enUS}
                            theme={ApplicationTheme}>
                <LoginScreen />
            </ConfigProvider>
        </App>;
    }

    return <App message={{maxCount: 1}}>
        <ConfigProvider locale={enUS}
                        theme={ApplicationTheme}>

            {!hasNoLayout.includes(location.pathname) && Boolean(session) && <ProLayout {...sidebarMenu}
                                                                                        layout={layout}
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
                                                                                        avatarProps={{
                                                                                            src: session?.user?.gravatar,
                                                                                            size: 'small',
                                                                                            title: session?.user?.email,
                                                                                            render: (_props, dom) => {
                                                                                                return <Dropdown
                                                                                                    menu={{
                                                                                                        items: [
                                                                                                            {
                                                                                                                key: 'logout',
                                                                                                                icon: <LogoutOutlined />,
                                                                                                                label: 'Logout',
                                                                                                                onClick: () => {
                                                                                                                    logout();
                                                                                                                }
                                                                                                            }
                                                                                                        ]
                                                                                                    }}
                                                                                                >
                                                                                                    {dom}
                                                                                                </Dropdown>
                                                                                            }
                                                                                        }}>

                <Outlet context={{
                    session
                }}/>
            </ProLayout>}

            {hasNoLayout.includes(document.location.pathname) && !session && <Outlet/>}

        </ConfigProvider>
    </App>;
};

export default Container;
