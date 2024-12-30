/**
 * Ant.Design Application theme
 */
import {ThemeConfig} from 'antd/es/config-provider/context';

const colorPrimary = '#5A358C';
const colorPrimaryHover = '#f3eef9';
const colorTheme = '#5A358C';

const ApplicationTheme: ThemeConfig = {
    token: {
        fontFamily: 'IBM Plex Sans, sans-serif',
        fontSize: 14,
        colorPrimary: colorPrimary,
        colorInfo: colorPrimary,
        colorError: 'crimson',
        colorSuccess: '#73d98a',
        borderRadius: 3
    },

    components: {
        Layout: {
            bodyBg: '#efefef',
            headerBg: colorTheme,
            colorBgContainer: `${colorTheme} !important`,
            colorText: '#ffffff'
        },

        Avatar: {
            colorTextPlaceholder: `#878090 !important`
        },

        Breadcrumb: {
            linkHoverColor: `${colorPrimaryHover} !important`,
            colorPrimaryHover: `${colorPrimaryHover} !important`
        },

        Radio: {
            colorPrimary
        },

        Card: {
            controlItemBgActive: '#fff'
        },

        Button: {
            colorPrimary,
            colorLink: colorPrimary,
            colorPrimaryHover: colorTheme,
            colorIcon: colorPrimary,
            borderRadius: 3,
            defaultBg: `${colorPrimaryHover} !important`,
            defaultColor: `${colorPrimary} !important`,
            defaultHoverBorderColor: colorPrimary,
            defaultShadow: 'none'
        },

        Statistic: {
            colorTextHeading: colorPrimary
        },

        // Menu: {
        //     dropdownWidth: 250,
        //     //colorText: '#ADB9BF',
        //     controlItemBgActive: colorOrange,
        //
        //     colorBgTextHover: '#3A4A61',
        //     itemHoverColor: '#fff',
        //
        //     itemSelectedBg: colorOrange,
        //     itemSelectedColor: '#fff',
        //     colorBgContainer: `${colorTheme} !important`
        // },

        Alert: {
            defaultPadding: 4
        }
    }
};

export default ApplicationTheme;
