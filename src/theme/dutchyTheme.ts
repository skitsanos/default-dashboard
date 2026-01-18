/**
 * Dutchy Design System - Purple Theme
 * Ant Design Theme Configuration
 *
 * Design Principles:
 * - No rounded corners (sharp geometry everywhere)
 * - Bold typography with clear hierarchy (Space Grotesk + Inter + JetBrains Mono)
 * - High contrast and purposeful color usage
 * - Accent borders for emphasis (4px borders)
 * - Grid-forward layouts with visible rhythm
 */
import {ThemeConfig} from 'antd/es/config-provider/context';
import {theme} from 'antd';

// ============================================
// DUTCHY PURPLE THEME TOKENS
// ============================================

// Primary Palette - Royal Purple
export const dutchyColors = {
    primary: '#7c3aed',              // HSL: 263 70% 58%
    primaryHover: '#6d28d9',         // Darker purple for hover
    primaryLight: '#ede9fe',         // Light purple for backgrounds
    primaryForeground: '#ffffff',    // Text on primary

    // Neutral Palette
    background: '#ffffff',           // Page background
    foreground: '#0a0a0a',           // Primary text (near black)
    muted: '#f5f5f5',                // Subtle backgrounds
    mutedForeground: '#737373',      // Secondary text
    border: '#e5e5e5',               // Borders, dividers

    // Semantic Colors
    success: '#16a34a',              // Success states
    warning: '#f59e0b',              // Warning states
    destructive: '#dc2626',          // Error/destructive
    info: '#7c3aed',                 // Info (uses primary)
};

// Typography
export const dutchyFonts = {
    display: 'Space Grotesk, sans-serif',   // Headings, titles, brand
    body: 'Inter, sans-serif',               // Body text, UI elements
    mono: 'JetBrains Mono, monospace',       // Code, inputs, labels
};

// ============================================
// THEME CONFIGURATION
// ============================================

const dutchyTheme: ThemeConfig = {
    algorithm: theme.defaultAlgorithm,

    token: {
        // Typography
        fontFamily: dutchyFonts.body,
        fontSize: 14,

        // Primary Colors
        colorPrimary: dutchyColors.primary,
        colorInfo: dutchyColors.info,
        colorSuccess: dutchyColors.success,
        colorWarning: dutchyColors.warning,
        colorError: dutchyColors.destructive,

        // Sharp corners - Dutchy signature (NO rounded corners)
        borderRadius: 0,
        borderRadiusLG: 0,
        borderRadiusSM: 0,
        borderRadiusXS: 0,

        // Backgrounds
        colorBgBase: dutchyColors.background,
        colorBgContainer: dutchyColors.background,
        colorBgLayout: dutchyColors.muted,
        colorBgSpotlight: dutchyColors.muted,
        colorBgElevated: dutchyColors.background,

        // Text Colors
        colorText: dutchyColors.foreground,
        colorTextSecondary: dutchyColors.mutedForeground,
        colorTextTertiary: dutchyColors.mutedForeground,
        colorTextQuaternary: dutchyColors.mutedForeground,

        // Border Colors
        colorBorder: dutchyColors.border,
        colorBorderSecondary: dutchyColors.border,

        // Link Colors
        colorLink: dutchyColors.primary,
        colorLinkHover: dutchyColors.primaryHover,
        colorLinkActive: dutchyColors.primaryHover,

        // Control/Interactive
        controlHeight: 40,
        controlHeightLG: 48,
        controlHeightSM: 32,
    },

    components: {
        // Layout
        Layout: {
            bodyBg: dutchyColors.muted,
            headerBg: dutchyColors.background,
            headerHeight: 64,
            siderBg: dutchyColors.foreground,
            lightSiderBg: dutchyColors.foreground,
            triggerBg: dutchyColors.primary,
            triggerColor: dutchyColors.primaryForeground,
        },

        // Menu (Dark sidebar style)
        Menu: {
            itemBg: 'transparent',
            itemColor: 'rgba(250, 250, 250, 0.6)',
            itemHoverColor: dutchyColors.background,
            itemHoverBg: 'rgba(250, 250, 250, 0.05)',
            itemSelectedColor: dutchyColors.background,
            itemSelectedBg: 'rgba(124, 58, 237, 0.15)',
            subMenuItemBg: 'transparent',
            darkItemBg: 'transparent',
            darkItemColor: 'rgba(250, 250, 250, 0.6)',
            darkItemHoverBg: 'rgba(250, 250, 250, 0.05)',
            darkItemHoverColor: dutchyColors.background,
            darkItemSelectedBg: dutchyColors.primary,
            darkItemSelectedColor: dutchyColors.primaryForeground,
            itemBorderRadius: 0,
            borderRadius: 0,
        },

        // Button
        Button: {
            fontWeight: 700,
            borderRadius: 0,
            borderRadiusLG: 0,
            borderRadiusSM: 0,
            primaryShadow: 'none',
            defaultShadow: 'none',
            dangerShadow: 'none',
            colorPrimary: dutchyColors.primary,
            colorPrimaryHover: dutchyColors.primaryHover,
            colorPrimaryActive: dutchyColors.primaryHover,
            defaultBg: dutchyColors.background,
            defaultColor: dutchyColors.foreground,
            defaultBorderColor: dutchyColors.foreground,
            defaultHoverBg: dutchyColors.foreground,
            defaultHoverColor: dutchyColors.background,
            defaultHoverBorderColor: dutchyColors.foreground,
            colorLink: dutchyColors.primary,
            colorLinkHover: dutchyColors.primaryHover,
        },

        // Input
        Input: {
            fontFamily: dutchyFonts.mono,
            borderRadius: 0,
            borderRadiusLG: 0,
            borderRadiusSM: 0,
            activeBorderColor: dutchyColors.foreground,
            hoverBorderColor: dutchyColors.foreground,
            activeShadow: 'none',
        },

        // InputNumber
        InputNumber: {
            fontFamily: dutchyFonts.mono,
            borderRadius: 0,
            activeBorderColor: dutchyColors.foreground,
            hoverBorderColor: dutchyColors.foreground,
            activeShadow: 'none',
        },

        // Select
        Select: {
            borderRadius: 0,
            borderRadiusLG: 0,
            borderRadiusSM: 0,
        },

        // Card
        Card: {
            borderRadius: 0,
            borderRadiusLG: 0,
            headerBg: dutchyColors.background,
        },

        // Table
        Table: {
            borderRadius: 0,
            headerBg: dutchyColors.muted,
            headerColor: dutchyColors.mutedForeground,
            rowHoverBg: 'rgba(124, 58, 237, 0.04)',
            headerSortActiveBg: dutchyColors.muted,
            headerSortHoverBg: dutchyColors.muted,
        },

        // Tag
        Tag: {
            borderRadius: 0,
            defaultBg: dutchyColors.muted,
            fontFamily: dutchyFonts.mono,
        },

        // Badge
        Badge: {
            fontFamily: dutchyFonts.mono,
        },

        // Avatar
        Avatar: {
            borderRadius: 0,
            colorTextPlaceholder: dutchyColors.mutedForeground,
        },

        // Breadcrumb
        Breadcrumb: {
            linkHoverColor: dutchyColors.primary,
        },

        // Radio
        Radio: {
            colorPrimary: dutchyColors.primary,
            borderRadius: 0,
        },

        // Checkbox
        Checkbox: {
            colorPrimary: dutchyColors.primary,
            borderRadiusSM: 0,
        },

        // Switch
        Switch: {
            colorPrimary: dutchyColors.primary,
            colorPrimaryHover: dutchyColors.primaryHover,
        },

        // Statistic
        Statistic: {
            titleFontSize: 12,
            contentFontSize: 30,
            fontFamily: dutchyFonts.display,
        },

        // Alert
        Alert: {
            borderRadius: 0,
            borderRadiusLG: 0,
            colorInfoBg: dutchyColors.primaryLight,
            colorInfoBorder: dutchyColors.primary,
            colorWarningBg: '#fef3c7',
            colorWarningBorder: dutchyColors.warning,
            colorErrorBg: '#fee2e2',
            colorErrorBorder: dutchyColors.destructive,
            colorSuccessBg: '#dcfce7',
            colorSuccessBorder: dutchyColors.success,
        },

        // Modal
        Modal: {
            borderRadius: 0,
            borderRadiusLG: 0,
        },

        // Drawer
        Drawer: {
            borderRadius: 0,
        },

        // Popover
        Popover: {
            titleMinWidth: 300,
            borderRadius: 0,
        },

        // Tooltip
        Tooltip: {
            borderRadius: 0,
        },

        // Message
        Message: {
            borderRadius: 0,
        },

        // Notification
        Notification: {
            borderRadius: 0,
        },

        // Tabs
        Tabs: {
            inkBarColor: dutchyColors.primary,
            itemSelectedColor: dutchyColors.primary,
            itemHoverColor: dutchyColors.primary,
            itemActiveColor: dutchyColors.primary,
        },

        // Pagination
        Pagination: {
            borderRadius: 0,
            itemActiveBg: dutchyColors.primary,
        },

        // Progress
        Progress: {
            defaultColor: dutchyColors.primary,
            circleTextColor: dutchyColors.foreground,
        },

        // Slider
        Slider: {
            trackBg: dutchyColors.primary,
            trackHoverBg: dutchyColors.primaryHover,
            handleColor: dutchyColors.primary,
            handleActiveColor: dutchyColors.primaryHover,
            dotActiveBorderColor: dutchyColors.primary,
        },

        // DatePicker
        DatePicker: {
            borderRadius: 0,
        },

        // TimePicker
        TimePicker: {
            borderRadius: 0,
        },

        // Dropdown
        Dropdown: {
            borderRadius: 0,
            borderRadiusLG: 0,
            borderRadiusSM: 0,
        },

        // Segmented
        Segmented: {
            borderRadius: 0,
            borderRadiusSM: 0,
            itemSelectedBg: dutchyColors.primary,
            itemSelectedColor: dutchyColors.primaryForeground,
        },

        // Form
        Form: {
            labelFontSize: 12,
            verticalLabelPadding: '0 0 8px',
        },

        // Collapse
        Collapse: {
            borderRadius: 0,
            borderRadiusLG: 0,
        },

        // Tree
        Tree: {
            borderRadius: 0,
        },

        // Upload
        Upload: {
            borderRadius: 0,
        },

        // Image
        Image: {
            borderRadius: 0,
        },

        // Calendar
        Calendar: {
            borderRadius: 0,
        },

        // Rate
        Rate: {
            starColor: dutchyColors.primary,
        },

        // Steps
        Steps: {
            colorPrimary: dutchyColors.primary,
        },

        // Timeline
        Timeline: {
            dotBg: dutchyColors.primary,
        },

        // Spin
        Spin: {
            colorPrimary: dutchyColors.primary,
        },

        // Result
        Result: {
            colorSuccess: dutchyColors.success,
            colorError: dutchyColors.destructive,
            colorWarning: dutchyColors.warning,
            colorInfo: dutchyColors.primary,
        },

        // Skeleton
        Skeleton: {
            borderRadius: 0,
            borderRadiusSM: 0,
        },
    },
};

export default dutchyTheme;
