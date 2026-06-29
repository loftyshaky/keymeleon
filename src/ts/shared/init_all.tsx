import React from 'react';
import ReactDOM from 'react-dom/client';

import {
    c_crash_handler,
    c_error,
    c_loading_screen,
    d_loading_screen,
    s_tab_index,
    s_theme as s_theme_shared,
} from '@loftyshaky/shared-app/shared';
import { s_css_vars, s_suffix, s_theme } from 'shared_clean/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {}

    private announcement_root: HTMLDivElement | undefined = undefined;
    private settings_root: HTMLDivElement | undefined = undefined;
    private dependencies_root: HTMLDivElement | undefined = undefined;

    public init = (): Promise<void> =>
        new Promise((reslove) => {
            void err_async(async () => {
                const on_loading_screen_render = (): void =>
                    err(() => {
                        const loading_screen_root_el = s<HTMLDivElement>(
                            `.${new s_suffix.Suffix('loading_screen').result}`,
                        );

                        if (n(loading_screen_root_el) && n(loading_screen_root_el.shadowRoot)) {
                            const loading_screen_css = x.css(
                                'loading_screen',
                                loading_screen_root_el.shadowRoot,
                            );

                            if (n(loading_screen_css)) {
                                x.bind(loading_screen_css, 'load', (): void =>
                                    err(() => {
                                        void s_theme_shared.Theme.set({
                                            name: data.settings.prefs.options_page_theme,
                                            additional_theme_callback: s_theme.Theme.set,
                                        });

                                        void d_loading_screen.Visibility.show();

                                        reslove();
                                    }, 'cnt_1350'),
                                );
                            }
                        }
                    }, 'cnt_1351');

                s_css_vars.CssVars.set();

                const error_root: ShadowRoot = this.create_root({ prefix: 'error' }) as ShadowRoot;
                const loading_screen_root: ShadowRoot | undefined = this.create_root({
                    prefix: 'loading_screen',
                }) as ShadowRoot;

                if (page === 'announcement') {
                    this.announcement_root = this.create_root({
                        prefix: 'announcement',
                        shadow_root: false,
                    }) as HTMLDivElement;
                } else if (page === 'settings') {
                    this.settings_root = this.create_root({
                        prefix: 'settings',
                        shadow_root: false,
                    }) as HTMLDivElement;
                } else if (page === 'dependencies') {
                    this.dependencies_root = this.create_root({
                        prefix: 'dependencies',
                        shadow_root: false,
                    }) as HTMLDivElement;
                }

                ReactDOM.createRoot(error_root).render(
                    <c_error.Body
                        app_id={s_suffix.app_id}
                        on_render={(): void =>
                            err(() => {
                                if (n(loading_screen_root)) {
                                    ReactDOM.createRoot(loading_screen_root).render(
                                        <c_crash_handler.Body>
                                            <c_loading_screen.Body
                                                app_id={s_suffix.app_id}
                                                on_render={(): void => {
                                                    on_loading_screen_render();
                                                }}
                                            />
                                        </c_crash_handler.Body>,
                                    );
                                }
                            }, 'cnt_1372')
                        }
                    />,
                );
            }, 'cnt_1352');
        });

    private create_root = ({
        prefix,
        shadow_root = true,
    }: {
        prefix: string;
        shadow_root?: boolean;
    }): HTMLDivElement | ShadowRoot | undefined =>
        err(() => {
            const root = x.create(
                'div',
                x.cls([new s_suffix.Suffix('root').result, new s_suffix.Suffix(prefix).result]),
            );

            x.append(document.body, root);

            if (shadow_root) {
                return root.attachShadow({ mode: 'open' });
            }

            return root;
        }, 'cnt_1353');

    public render_announcement = (): Promise<void> =>
        err_async(async () => {
            const { Body } = await import('announcement/components/body');

            const on_css_load = (): Promise<void> =>
                err_async(async () => {
                    await d_loading_screen.Visibility.hide({ app_id: s_suffix.app_id });
                }, 'seg_1254');

            if (n(this.announcement_root)) {
                ReactDOM.createRoot(this.announcement_root).render(
                    <c_crash_handler.Body>
                        <Body
                            on_render={(): void =>
                                err(() => {
                                    const announcement_css = x.css(
                                        'announcement_css',
                                        document.head,
                                    );

                                    void s_theme_shared.Theme.set({
                                        name: data.settings.prefs.options_page_theme,
                                        additional_theme_callback: s_theme.Theme.set,
                                    });

                                    if (n(announcement_css)) {
                                        x.bind(announcement_css, 'load', on_css_load);
                                    }
                                }, 'seg_1252')
                            }
                        />
                    </c_crash_handler.Body>,
                );
            }
        }, 'seg_1253');

    public render_settings = (): Promise<void> =>
        err_async(async () => {
            const { Body } = await import('settings/components/body');

            const on_css_load = (): Promise<void> =>
                err_async(async () => {
                    s_tab_index.TabIndex.bind_set_input_type_f();
                    void d_loading_screen.Visibility.hide({ app_id: s_suffix.app_id });
                }, 'cnt_1357');

            if (n(this.settings_root)) {
                ReactDOM.createRoot(this.settings_root).render(
                    <Body
                        on_render={(): void =>
                            err(() => {
                                const settings_css = x.css('settings_css', document.head);

                                void s_theme_shared.Theme.set({
                                    name: data.settings.prefs.options_page_theme,
                                    additional_theme_callback: s_theme.Theme.set,
                                });

                                if (n(settings_css)) {
                                    x.bind(settings_css, 'load', on_css_load);
                                }
                            }, 'cnt_1358')
                        }
                    />,
                );
            }
        }, 'cnt_1359');

    public render_dependencies = (): Promise<void> =>
        err_async(async () => {
            const { Body } = await import('dependencies/components/body');

            const on_css_load = (): Promise<void> =>
                err_async(async () => {
                    void d_loading_screen.Visibility.hide({ app_id: s_suffix.app_id });
                }, 'cnt_1516');

            if (n(this.dependencies_root)) {
                ReactDOM.createRoot(this.dependencies_root).render(
                    <c_crash_handler.Body>
                        <Body
                            on_render={(): void =>
                                err(() => {
                                    const dependencies_css = x.css(
                                        'dependencies_css',
                                        document.head,
                                    );

                                    void s_theme_shared.Theme.set({
                                        name: data.settings.prefs.options_page_theme,
                                        additional_theme_callback: s_theme.Theme.set,
                                    });

                                    if (n(dependencies_css)) {
                                        x.bind(dependencies_css, 'load', on_css_load);
                                    }
                                }, 'cnt_1518')
                            }
                        />
                    </c_crash_handler.Body>,
                );
            }
        }, 'cnt_1517');
}

export const InitAll = Class.get_instance();
