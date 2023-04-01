/**
 * Umijs configuration settings
 * Please refer to https://umijs.org/config for more details
 * or contact Evi Skitsanos https://www.linkedin.com/in/skitsanos/
 */

//import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin';

export default ({
    //favicon: '/assets/favicon.ico',
    title: 'My Dashboard',

    mfsu: {
        strategy: 'normal'
    },

    devtool: process.env.NODE_ENV === 'development' ? 'eval' : false,

    styles: [
        //'https://fonts.googleapis.com/css?family=IBM+Plex+Mono:400,400i|IBM+Plex+Sans:300,400&display=swap',
        //'https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400&display=swap'
        'https://fonts.googleapis.com/css2?family=Work+Sans:wght@100;300;400&display=swap'
    ],

    proxy: {
        // '/api': {
        //     target: 'http://localhost:3000',
        //     changeOrigin: true,
        //     pathRewrite: {'^/api': ''},
        // }
    }
});
