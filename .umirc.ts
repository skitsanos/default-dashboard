/**
 * Umijs configuration settings
 * Please refer to https://umijs.org/config for more details
 * or contact Evi Skitsanos https://www.linkedin.com/in/skitsanos/
 */
import dayjs from 'dayjs';

import manifest from './package.json';

export default ({
    title: 'My Dashboard',

    favicons: [],

    styles: [
        // Dutchy Design System fonts
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap'
    ],

    define: {
        // the following are the default values for the application, and they are defined in @types/typings.d.ts
        APP_NAME: 'My Dashboard',
        APP_VERSION: `${manifest.version} (beta/${dayjs().format('YYYY-MM-DD')})`,
        FEATURE_SMTP_ENABLED: false,
        FEATURE_SSL_ENABLED: true,

        // Set to a `{token, user}` object to boot the app with a session already in place, e.g.
        // INITIAL_SESSION: {token: '<token>', user: {_key: '1', email: 'user@example.com'}}
        INITIAL_SESSION: null
    },

    mako: {},

    svgr: {},

    deadCode: {},

    devtool: process.env.NODE_ENV === 'development' ? 'eval' : false,

    proxy: {
        // Target for the /chat page. The client connects to `/ws` on its own origin - see src/pages/chat/index.tsx.
        '/ws': {
            target: 'wss://socketsbay.com/wss/v2/1/demo/',
            changeOrigin: true,
            ws: true
        }
        // '/api': {
        //     target: 'http://localhost:3000',
        //     changeOrigin: true,
        //     pathRewrite: {'^/api': ''},
        // }
    }
});
