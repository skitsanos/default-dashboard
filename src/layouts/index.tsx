import {hasNoLayout, publicRoutes} from '@/defaults';
import useSession from '@/hooks/useSession';
import sidebarMenu from '@/sidebarMenu';
import ProLayout from '@ant-design/pro-layout';
import {App, ConfigProvider} from 'antd';
import enUS from 'antd/locale/en_US';
import {type ReactNode, useEffect} from 'react';
import {history, Link, Outlet, useLocation} from 'umi';
import dutchyTheme from '@/theme/dutchyTheme';
import {ReactComponent as IconLogo} from '@/assets/logo.svg';
import {LogoutOutlined, UserOutlined} from '@ant-design/icons';

const menuItemRender = (item: {path?: string}, dom: ReactNode) => <Link to={item.path ?? '/'}>{dom}</Link>;

const menuFooterRender = (props?: {collapsed?: boolean}) => (
    <div className={'sidebar-footer'}>
        <Link to={'/profile'}
              className={'footer-link'}>
            <UserOutlined/>
            {!props?.collapsed && <span>Profile</span>}
        </Link>

        <Link to={'/logout'}
              className={'footer-link logout'}>
            <LogoutOutlined/>
            {!props?.collapsed && <span>Logout</span>}
        </Link>
    </div>
);

const Container = () =>
{
    const location = useLocation();

    const {session} = useSession();

    const isPublicRoute = publicRoutes.includes(location.pathname);
    const isChromeless = hasNoLayout.includes(location.pathname);

    // Authenticated users have no business on the login page, and anonymous ones have none anywhere else.
    const redirecting = (!session && !isPublicRoute) || (Boolean(session) && isPublicRoute);

    useEffect(() =>
    {
        if (!session && !isPublicRoute)
        {
            history.push('/login');
        }
        else if (session && isPublicRoute)
        {
            history.push('/');
        }
    }, [session, isPublicRoute]);

    const renderPage = () =>
    {
        // A redirect is already queued - rendering the outgoing page would only flash it.
        if (redirecting)
        {
            return null;
        }

        if (isChromeless || !session)
        {
            return <Outlet/>;
        }

        return <ProLayout {...sidebarMenu}
                          layout={'side'}
                          fixSiderbar={true}
                          fixedHeader={true}
                          title={APP_NAME}
                          logo={<IconLogo width={24}/>}
                          location={{pathname: location.pathname}}
                          menuItemRender={menuItemRender}
                          menuFooterRender={menuFooterRender}
                          siderMenuType={'group'}>

            <Outlet context={{session}}/>
        </ProLayout>;
    };

    return <App message={{maxCount: 1}}>
        <ConfigProvider locale={enUS}
                        theme={dutchyTheme}>
            {renderPage()}
        </ConfigProvider>
    </App>;
};

export default Container;
