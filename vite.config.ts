import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { getThemeVariables } from 'antd/dist/theme';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    css: {
        preprocessorOptions: {
            less: {
                modifyVars: {
                    ...getThemeVariables({ dark: true }),
                    'primary-color': '#1da0ad',
                    'success-color': '#51b946',
                    'info-color': '#5bc7b4',
                    'warning-color': '#e7a255',
                    'error-color': '#bf410a',
                    'highlight-color': '#7e63bc',
                    'processing-color': '#1da0ad',
                    'body-background': '@black',
                    'component-background': '#141414',
                    'icon-color-hover': '#13c2c2',
                    'heading-color': '#09c9df',
                    'text-color': '#ffffff',
                    'text-color-secondary': '#fafafa',
                    'text-color-inverse': '#000000',
                    'heading-color-dark': '#ffffff',
                    'text-color-secondary-dark': '#ffffff',
                    'text-selection-bg': '#ffffff',
                    'border-color-base': '#4f6266',
                    'border-color-split': '#60696b',
                    'border-style-base': 'solid',
                    'layout-body-background': '@body-background',
                    'layout-header-background': '@component-background',
                    'layout-sider-background': '@component-background',
                    'layout-trigger-background': '@component-background',
                    'font-feature-settings-base': 'tnum',
                    'font-size-base': '16px',
                    'font-size-lg': '@font-size-base + 2px',
                    'font-size-sm': '14px',
                    'disabled-color': '#acacac',
                    'disabled-color-dark': '#acacac',
                    'outline-blur-size': '0',
                    'background-color-light': 'fade(@white, 4%)',
                    'background-color-base': 'fade(@white, 8%)',
                    'item-hover-bg': 'fade(@white, 8%)',
                    'shadow-color': 'rgba(0, 0, 0, 0.45)',
                    'shadow-1-up':
                        '0 -6px 16px -8px rgba(0, 0, 0, 0.24), -9px 28px 0 rgba(0, 0, 0, 0.15), 0 -12px 48px 16px rgba(0, 0, 0, 0.09)',
                    'shadow-1-down':
                        '0 6px 16px -8px rgba(0, 0, 0, 0.24), 9px 28px 0 rgba(0, 0, 0, 0.15), 0 12px 48px 16px rgba(0, 0, 0, 0.09)',
                    'shadow-1-left':
                        '-6px 0 16px -8px rgba(0, 0, 0, 0.08), 9px 0 28px 0 rgba(0, 0, 0, 0.05), -12px 0 48px 16px rgba(0, 0, 0, 0.03)',
                    'shadow-1-right':
                        '6px 0 16px -8px rgba(0, 0, 0, 0.24), 9px 0 28px 0 rgba(0, 0, 0, 0.15), 12px 0 48px 16px rgba(0, 0, 0, 0.09)',
                    'shadow-2':
                        '0 3px 6px -4px rgba(0, 0, 0, 0.36), 0 6px 16px 0 rgba(0, 0, 0, 0.24), 9px 28px 8px rgba(0, 0, 0, 0.15)',
                    'btn-default-bg': 'transparent',
                    'input-placeholder-color': 'fade(@white, 30%)',
                    'input-bg': 'transparent',
                    'input-number-handler-active-bg': '@popover-background',
                    'select-item-selected-font-weight': '600',
                    'tooltip-bg': '#434343',
                    'popover-bg': '@popover-background',
                    'modal-header-bg': '@popover-background',
                    'menu-popup-bg': '@popover-background',
                    'menu-dark-submenu-bg': '@black',
                    'table-header-bg': '#1d1d1d',
                    'table-header-sort-bg': '#262626',
                    'table-body-sort-bg': 'fade(@white, 1%)',
                    'table-row-hover-bg': '#262626',
                    'badge-text-color': '@white',
                    'card-actions-background': 'fade(@white, 4%)',
                    'card-shadow':
                        '0 1px 2px -2px rgba(0, 0, 0, 0.48), 3px 6px 0 rgba(0, 0, 0, 0.36), 0 5px 12px 4px rgba(0, 0, 0, 0.27)',
                    'avatar-bg': '#5a5a5a',
                    'pagination-item-bg-active': 'transparent',
                    'slider-rail-background-color': 'fade(@white, 20%)',
                    'slider-rail-background-color-hover':
                        '@slider-rail-background-color',
                    'slider-track-background-color': '@primary-color',
                    'slider-handle-color': '@primary-color',
                    'skeleton-color': '#303030',
                    'alert-success-border-color': '@green-3',
                    'alert-success-bg-color': '@green-1',
                    'alert-info-border-color': '@blue-3',
                    'alert-info-bg-color': '@blue-1',
                    'alert-warning-border-color': '@gold-3',
                    'alert-warning-bg-color': '@gold-1',
                    'alert-error-border-color': '@red-3',
                    'alert-error-bg-color': '@red-1',
                },
                javascriptEnabled: true,
            },
        },
    },
});
