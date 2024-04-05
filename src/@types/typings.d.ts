declare const APP_NAME: string;
declare const APP_VERSION: string;
declare const FEATURE_SMTP_ENABLED: boolean;
declare const FEATURE_SSL_ENABLED: boolean;

declare const INITIAL_SESSION: Record<string, any>;

declare module '\*.svg'
{
    import React = require('react');
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}