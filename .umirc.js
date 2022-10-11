/**
 * Umijs configuration settings
 * Please refer to https://umijs.org/config for more details
 * or contact Evi Skitsanos https://www.linkedin.com/in/skitsanos/
 */

//import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin';

export default ({
    //favicon: '/assets/favicon.ico',
    title: 'My Dashboard',

    theme: {
        '@primary-color': '#482684'
    },

    ignoreMomentLocale: false,

    chainWebpack: memo =>
    {
        //memo.plugin('AntdDayjsWebpackPlugin').use(new AntdDayjsWebpackPlugin());

        return memo;
    }
});
