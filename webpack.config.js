const path = require('path');

const appRoot = require('app-root-path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const LicensePlugin = require('webpack-license-plugin');

const { Env } = require('@loftyshaky/shared-app/js/env');
const { Locales } = require('@loftyshaky/shared-app/js/locales');
const { shared_config } = require('@loftyshaky/shared-app/js/webpack.config');
const { TaskScheduler } = require('@loftyshaky/shared-app/js/task_scheduler');
const { Dependencies: DependenciesShared } = require('@loftyshaky/shared-app/js/dependencies');
const { Dependencies } = require('./js/dependencies');

const app_root = appRoot.path;

const task_scheduler = new TaskScheduler();
const dependencies_shared = new DependenciesShared({ app_root });

const env_instance = new Env({ app_root });
const locales = new Locales({ app_root, exclude_shared_locales: ['de', 'ru'] });
const dependencies = new Dependencies();

module.exports = (env, argv) => {
    const paths = {
        ts: path.join(app_root, 'src', 'ts'),
        themes: path.join(app_root, 'src', 'scss', 'settings', 'themes'),
    };

    const config = shared_config({
        app_type: 'app',
        app_root,
        webpack,
        argv,
        env,
        TerserPlugin,
        MiniCssExtractPlugin,
        CssMinimizerPlugin,
        CopyWebpackPlugin,
        LicensePlugin,
        copy_patters: [
            {
                from: path.join(app_root, 'src', 'ahk'),
            },
        ],
        enable_anouncement: false,
        callback_begin: () => {
            task_scheduler.unlock_dist({
                package_name: 'Keymeleon',
                remove_dist: argv.mode === 'production',
            });
        },
        callback_done: () => {
            const env_2 = 'app';

            env_instance.generate({ browser: env.browser, mode: argv.mode, env: env_2 });
            locales.merge({ env: env_2 });
            dependencies_shared.add_missing_dependesies({
                extension_specific_missing_dependencies: dependencies.missing_dependencies,
            });
        },
    });

    config.resolve.alias = {
        ...config.resolve.alias,
        ...{
            settings: path.join(paths.ts, 'settings'),
        },
    };

    config.resolve.fallback = {
        ...config.resolve.fallback,
        ...{
            fs: require.resolve('fs-extra'),
            util: require.resolve('util/'),
            assert: require.resolve('assert/'),
            buffer: require.resolve('buffer/'),
            path: require.resolve('path-browserify'),
            stream: require.resolve('stream-browserify'),
            constants: require.resolve('constants-browserify'),
        },
    };

    config.entry = {
        ...config.entry,
        ...{
            settings: path.join(paths.ts, 'settings', 'settings.ts'),
            settings_css: path.join(app_root, 'src', 'scss', 'settings', 'index.scss'),
            settings_light_theme: path.join(paths.themes, 'light_theme.scss'),
            settings_dark_theme: path.join(paths.themes, 'dark_theme.scss'),
            settings_very_dark_theme: path.join(paths.themes, 'very_dark_theme.scss'),
            settings_clover_theme: path.join(paths.themes, 'clover_theme.scss'),
            settings_aqua_theme: path.join(paths.themes, 'aqua_theme.scss'),
            settings_lavender_theme: path.join(paths.themes, 'lavender_theme.scss'),
            settings_ruby_theme: path.join(paths.themes, 'ruby_theme.scss'),
        },
    };

    return config;
};
