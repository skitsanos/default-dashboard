export const app = {
    title: 'My Dashboard'
};

export const hasNoLayout = [
    '/login'
];

export const publicRoutes = [
    '/login',
    '/signup'
];

const colorPrimary = '#31204d';

export const ApplicationTheme = {

    token: {
        colorPrimary,
        borderRadius: 5,
        fontFamily: '"Work Sans", sans-serif !important'
    },

    colorPrimary: '#31204d',

    layout: {
        //bgLayout: '#00b96b'
    },

    sider: {},

    header: {
        colorBgHeader: '#fafafa'
    },

    pageContainer: {
        //colorBgPageContainer: '#ccc'
    }
};

export const gridGutter = [16, 16];