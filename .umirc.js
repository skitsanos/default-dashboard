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

    dynamicImport: {
        loading: '@/components/Loading'
    },

    plugins: [],

    //this line allows handling Page Not found errors and displays content from 404.js
    404: true,

    fastRefresh: {},

    ignoreMomentLocale: true,

    nodeModulesTransform: {
        type: 'none'
    },

    devtool: false,

    mfsu: {
        production: {}
    }
});