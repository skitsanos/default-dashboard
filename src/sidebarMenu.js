import {DashboardOutlined, FolderOutlined, MessageOutlined, SettingOutlined, UserOutlined} from '@ant-design/icons';

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
                icon: <FolderOutlined/>,
                name: 'Content',
                routes: [
                    {
                        path: '/pages',
                        name: 'Pages'
                    },

                    {
                        path: '/media',
                        name: 'Media'
                    }
                ]
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