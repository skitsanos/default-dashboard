/**
 * Umijs configuration settings
 * Please refer to https://umijs.org/config for more details
 * or contact Evi Skitsanos https://www.linkedin.com/in/skitsanos/
 */
import {defineConfig} from 'umi';

export default defineConfig({
    //favicon: '/assets/favicon.ico',
    title: 'My Dashboard',

    theme: {
        '@primary-color': '#482684'
    },

    plugins: [],


    ignoreMomentLocale: true,

    devtool: false,

    mfsu: {
    }
});
