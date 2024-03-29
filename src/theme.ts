/**
 * Ant.Design Application theme
 */
import {ThemeConfig} from 'antd/es/config-provider/context';

//const colorPrimary = '#0064CC';
const colorPrimary = '#5A358C';
const colorPrimaryHover = '##f3eef9';
const colorTheme = '#5A358C';
const colorOrange = '#FF891A';

const ApplicationTheme: ThemeConfig = {
    token: {
        fontFamily: 'Work Sans, sans-serif',
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
            colorBgContainer: `${colorTheme} !important`
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
            borderRadius: 3
        },

        Menu: {
            dropdownWidth: 250,
            //colorText: '#ADB9BF',
            controlItemBgActive: colorOrange,

            colorBgTextHover: '#3A4A61',
            itemHoverColor: '#fff',

            itemSelectedBg: colorOrange,
            itemSelectedColor: '#fff',
            colorBgContainer: `${colorTheme} !important`
        },

        Alert: {
            defaultPadding: 4
        }
    }
};

export default ApplicationTheme;
