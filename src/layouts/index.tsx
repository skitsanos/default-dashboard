import {hasNoLayout, publicRoutes} from '@/defaults';
import useSession from '@/hooks/useSession';
import sidebarMenu from '@/sidebarMenu';
import ProLayout from '@ant-design/pro-layout';
import {App, ConfigProvider} from 'antd';
import enUS from 'antd/locale/en_US';
import {useEffect} from 'react';
import {Link, Outlet, useLocation, useNavigate} from 'umi';
import {ReactComponent as IconLogo} from '@/assets/logo.svg';
import ApplicationTheme from '@/theme';
import useLayoutSwitcher from '@/hooks/useLayoutSwitcher';

const Container = () =>
{
    const location = useLocation();
    const navigate = useNavigate();

    const {layout}=useLayoutSwitcher();

    const allowed = publicRoutes.includes(location.pathname);

    const {session} = useSession();

    useEffect(() =>
    {
        if (!session && !allowed)
        {
            navigate('/login', {replace: true});
        }
        else if (session && allowed)
        {
            navigate('/', {replace: true});
        }
    }, [session, allowed]);

    const menuItemRender = (item, dom) => <Link to={item.path}>{dom}</Link>;

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
