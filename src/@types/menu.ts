import { ReactNode } from 'react';

export interface MenuItem {
    path?: string;
    name: string;
    icon?: ReactNode;
    children?: MenuItem[];
}

export interface MenuConfig {
    route: {
        path: string;
        routes: MenuItem[];
    };
}