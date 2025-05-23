import {DashboardOutlined, FolderOutlined, SettingOutlined, UserOutlined} from '@ant-design/icons';
import {MenuConfig} from '@/@types/menu';

const sidebarMenu: MenuConfig = {
    route: {
        path: '/',
        routes: [
            {
                path: '/',
                icon: <DashboardOutlined/>,
                name: 'Dashboard'
            },

            {
                path: '/files',
                name: 'Files',
                icon: <FolderOutlined/>
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