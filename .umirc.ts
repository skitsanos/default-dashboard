/**
 * Umijs configuration settings
 * Please refer to https://umijs.org/config for more details
 * or contact Evi Skitsanos https://www.linkedin.com/in/skitsanos/
 */
import dayjs from 'dayjs';

import manifest from './package.json';

//import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin';

export default ({
    title: 'My Dashboard',

    favicons: [],

    styles: [
        'https://fonts.googleapis.com/css?family=IBM+Plex+Mono:400,400i|IBM+Plex+Sans:300,400&display=swap',
        'https://fonts.googleapis.com/css2?family=Work+Sans:wght@100;300;400&display=swap',
        'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@100;300;400&display=swap'
    ],

    headScripts: [{
        content: 'console.log("Hello from the head! Modify your .umirc.ts")'
    }],

    define: {
        // the following are the default values for the application, and they are defined in @types/typings.d.ts
        APP_NAME: 'My Dashboard',
        APP_VERSION: `${manifest.version} (beta/${dayjs().format('YYYY-MM-DD')})`,
        FEATURE_SMTP_ENABLED: false,
        FEATURE_SSL_ENABLED: true,

        INITIAL_SESSION:
            {
                'session': {
                    'user': {
                        '_key': '177651341',
                        'createdOn': 1696934748132,
                        'email': 'info@skitsanos.com',
                        'lastLogin': 1709038324097,
                        'updatedOn': 1709038324097,
                        'gravatar': 'https://www.gravatar.com/avatar/df4fd31987b27934b23f90da7af2feb7?d=robohash&s=150'
                    },
                    'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.IntcInVzZXJJZFwiOlwiMTc3NjUxMzQxXCIsXCJleHBpcmVzT25cIjoxNzA5MDQxOTQ0NTEyfSI.7NsFhzhDPHH0Gf7IObsskxVWL_7Fdge5uWKviV771SE1FN72eeFH04Zet12WWx_Kx_1cmTrffXy7jB777tl8MQ'
                }
            }

    },

    mfsu: {},

    deadCode: {},

    devtool: process.env.NODE_ENV === 'development' ? 'eval' : false,

    proxy: {
        // '/api': {
        //     target: 'http://localhost:3000',
        //     changeOrigin: true,
        //     pathRewrite: {'^/api': ''},
        // }
    }
});
