import {defineConfig} from 'umi';

export default defineConfig({
    ignoreMomentLocale: true,

    nodeModulesTransform: {
        type: 'none'
    }
});