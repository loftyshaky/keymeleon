import type { Target } from 'vite-plugin-static-copy';

import path from 'node:path';

import appRoot from 'app-root-path';
import {
    type LibraryOptions,
    type PluginOption,
    type UserConfig,
    defineConfig,
    loadEnv,
} from 'vite';

import { Dependencies as DependenciesShared } from '@loftyshaky/shared-app/build/ts/dependencies';
import { Locales } from '@loftyshaky/shared-app/build/ts/locales';
import { generate_shared_config } from '@loftyshaky/shared-app/build/ts/vite.config';

import { Dependencies } from './build/ts/dependencies';

const app_root = appRoot.path.replaceAll(path.sep, path.posix.sep);

const dependencies_shared = new DependenciesShared({ app_root });

const locales = new Locales({ app_root, exclude_shared_locales: ['de'] });
const dependencies = new Dependencies();

const config = defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    const dest_path: string = path.posix.join(app_root, 'dist');
    const paths = {
        ts: path.join(app_root, 'src', 'ts'),
        scss: path.join(app_root, 'src', 'scss'),
        themes: path.join(app_root, 'src', 'scss', 'settings', 'themes'),
    };
    const copy_paths: Target[] = [
        {
            src: path.posix.join(app_root, 'src', 'ahk'),

            dest: dest_path,
            rename: { stripBase: true },
        },
    ];
    const shared_config = generate_shared_config({
        mode,
        env,
        app_root,
        dest_path,
        copy_paths,
        callback_build_start: () => {},
        callback_close_bundle: () => {
            void locales.merge();

            dependencies_shared.add_missing_dependesies({
                extension_specific_missing_dependencies: dependencies.missing_dependencies,
            });
        },
    }) as UserConfig & { build: { lib: LibraryOptions } } & { plugins: PluginOption[] };

    shared_config.build.lib.entry = {
        ...(shared_config.build.lib.entry as Record<string, unknown>),
        settings: path.join(paths.ts, 'settings', 'settings.ts'),
        settings_css: path.join(paths.scss, 'settings', 'index.scss'),
        settings_light_theme: path.join(paths.themes, 'light_theme.scss'),
        settings_dark_theme: path.join(paths.themes, 'dark_theme.scss'),
        settings_very_dark_theme: path.join(paths.themes, 'very_dark_theme.scss'),
        settings_clover_theme: path.join(paths.themes, 'clover_theme.scss'),
        settings_aqua_theme: path.join(paths.themes, 'aqua_theme.scss'),
        settings_lavender_theme: path.join(paths.themes, 'lavender_theme.scss'),
        settings_blaze_theme: path.join(paths.themes, 'blaze_theme.scss'),
        settings_ruby_theme: path.join(paths.themes, 'ruby_theme.scss'),
    };

    return shared_config;
});

export default config;
