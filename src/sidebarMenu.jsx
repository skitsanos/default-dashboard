import {DashboardOutlined, MessageOutlined, SettingOutlined, UserOutlined} from '@ant-design/icons';

const sidebarMenu = {
    route: {
        path: '/',
        routes: [
            {
                path: '/',
                icon: <DashboardOutlined/>,
                name: 'Dashboard'
            },

            {
                path: '/chat',
                name: 'Chat',
                icon: <MessageOutlined/>
            },

            {
                path: '/users',
                icon: <UserOutlined/>,
                name: 'Users'
            },

            {
                path: '/settings',
                icon: <SettingOutlined/>,
                name: 'Settings'
            }
        ]
    }
};
export default sidebarMenu;