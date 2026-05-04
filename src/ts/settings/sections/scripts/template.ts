import { i_sections } from 'settings/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    [key: string]: any;

    public static_sections: string[] = [
        'features',
        'layouts',
        'hotkeys',
        'audio',
        'process_control',
        'prefs',
        'links',
    ];

    public sections: i_sections.Sections | undefined;

    private val_type: i_sections.SectionTemplateItem[] = [];
    private allow_native_function_and_ignore_extra_modifiers: i_sections.SectionTemplateItem[] = [];
    public custom_binding_name_string_key: i_sections.SectionTemplateItem[] = [];
    public custom_binding_name_object_key: i_sections.SectionTemplateItem[] = [];
    public custom_binding_name_array_macro: i_sections.SectionTemplateItem[] = [];
    public custom_binding_name_object_macro: i_sections.SectionTemplateItem[] = [];
    public feature_state: i_sections.SectionTemplateItem[] = [];
    public language_audio = ['layout_switching', 'typing'];

    public set_templates = (): void =>
        err(() => {
            this.sections = {
                features: [
                    {
                        name: 'enable_all_bindings',
                        type: 'checkbox',
                        default_val: true,
                    },
                    {
                        name: 'enable_dedicated_layout_switching',
                        type: 'checkbox',
                        default_val: true,
                    },
                    {
                        name: 'enable_sequential_layout_switching',
                        type: 'checkbox',
                        default_val: true,
                    },
                    {
                        name: 'enable_layout_switching_audio',
                        type: 'checkbox',
                        default_val: true,
                    },
                    {
                        name: 'enable_typing_audio',
                        type: 'checkbox',
                        default_val: true,
                    },
                    {
                        name: 'enable_feature_state_audio',
                        type: 'checkbox',
                        default_val: true,
                    },
                    {
                        name: 'enable_windows_api_layout_switching',
                        type: 'checkbox',
                        default_val: true,
                    },
                ],
                layouts: [
                    {
                        name: 'all_layouts_ordered',
                        type: 'text',
                        val_type: 'array',
                        placeholder: 'en-DVORAK, en-US',
                    },
                    {
                        name: 'layout_ids',
                        type: 'text',
                        val_type: 'array',
                        placeholder: '-268303351, 67699721',
                    },
                    {
                        name: 'primary_layout',
                        type: 'text',
                        val_type: 'string',
                        placeholder: 'en-DVORAK',
                    },
                    {
                        name: 'secondary_layouts',
                        type: 'text',
                        val_type: 'array',
                        placeholder: 'en-US, es-ES',
                    },
                    {
                        name: 'fallback_layout_switching_exes',
                        type: 'text',
                        val_type: 'array',
                        placeholder: 'x360ce, RazerAppEngine',
                    },
                    {
                        name: 'layout_switching_delay',
                        type: 'number',
                        val_type: 'number',
                        placeholder: '30',
                    },
                ],
                hotkeys: [
                    {
                        name: 'display_current_layout_id',
                        type: 'text',
                        val_type: 'string',
                        placeholder: '^!+sc017',
                    },
                    {
                        name: 'set_primary_layout',
                        type: 'text',
                        val_type: 'string',
                        placeholder: 'ScrollLock',
                    },
                    {
                        name: 'set_secondary_layout',
                        type: 'text',
                        val_type: 'string',
                        placeholder: 'Pause',
                    },
                    {
                        name: 'dedicated_layout_hotkeys',
                        type: 'text',
                        val_type: 'array',
                        placeholder: '^+F8, ^+F9',
                    },
                    {
                        name: 'toggle_sequential_layout_switching',
                        type: 'text',
                        val_type: 'string',
                        placeholder: '^!+SC01B',
                    },
                    {
                        name: 'toggle_dedicated_layout_switching',
                        type: 'text',
                        placeholder: '^!+SC01A',
                    },
                    {
                        name: 'toggle_all_bindings',
                        type: 'text',
                        val_type: 'string',
                        placeholder: '^!+SC035',
                    },
                    {
                        name: 'toggle_windows_api_layout_switching',
                        type: 'text',
                        val_type: 'string',
                        placeholder: '^!+SC019',
                    },
                    {
                        name: 'toggle_layout_switching_audio',
                        type: 'text',
                        val_type: 'string',
                        placeholder: '^!+SC034',
                    },
                    {
                        name: 'toggle_typing_audio',
                        type: 'text',
                        val_type: 'string',
                        placeholder: '^!+SC033',
                    },
                    {
                        name: 'toggle_feature_state_audio',
                        type: 'text',
                        val_type: 'string',
                        placeholder: '^!+SC032',
                    },
                    {
                        name: 'toggle_current_process_minimized_state',
                        type: 'text',
                        val_type: 'string',
                        placeholder: '!+1',
                    },
                    {
                        name: 'toggle_current_process_suspend_state',
                        type: 'text',
                        val_type: 'string',
                        placeholder: '!+2',
                    },
                    {
                        name: 'toggle_current_process_minimize_and_suspend_state',
                        type: 'text',
                        val_type: 'string',
                        placeholder: '!+3',
                    },
                    {
                        name: 'resume_current_process_suspended',
                        type: 'text',
                        val_type: 'string',
                        placeholder: '!+4',
                    },
                    {
                        name: 'resume_all_suspended_processes',
                        type: 'text',
                        val_type: 'string',
                        placeholder: '!+5',
                    },
                ],
                audio: [
                    {
                        name: 'default_file_extension',
                        type: 'text',
                        val_type: 'string',
                        placeholder: 'mp3',
                    },
                ],
                process_control: [
                    {
                        name: 'target_processes',
                        type: 'text',
                        val_type: 'array',
                        placeholder: 'Fallout4, KingdomCome',
                    },
                    {
                        name: 'suspend_post_minimize_delay',
                        type: 'number',
                        val_type: 'number',
                        placeholder: '100',
                    },
                    {
                        name: 'resume_pre_unminimize_delay',
                        type: 'number',
                        val_type: 'number',
                        placeholder: '100',
                    },
                    {
                        name: 'pre_screenshot_delay',
                        type: 'number',
                        val_type: 'number',
                        placeholder: '100',
                    },
                    {
                        name: 'post_screenshot_delay',
                        type: 'number',
                        val_type: 'number',
                        placeholder: '100',
                    },
                    {
                        name: 'pre_minimize_screenshot',
                        type: 'checkbox',
                        default_val: false,
                    },
                    {
                        name: 'pre_suspend_screenshot',
                        type: 'checkbox',
                        default_val: false,
                    },
                ],
                prefs: [
                    {
                        name: 'options_page_theme',
                        type: 'select',
                        val_type: 'string',
                        default_val: 'lavender',
                    },
                    {
                        name: 'transition_duration',
                        type: 'number',
                        val_type: 'number',
                        placeholder: '200',
                    },
                    {
                        name: 'enable_cut_features',
                        type: 'checkbox',
                        default_val: false,
                    },
                    {
                        name: 'offers_are_visible',
                        type: 'checkbox',
                        default_val: true,
                        developer_mode_setting: true,
                    },
                    {
                        name: 'developer_mode',
                        type: 'checkbox',
                        default_val: false,
                        developer_mode_setting: true,
                    },
                ],
                links: [
                    {
                        name: 'github',
                        type: 'link',
                        href: app.msg('offer_keymeleon_link_href'),
                    },
                    {
                        name: 'clear_new_tab_chrome',
                        type: 'link',
                        href: app.msg('offer_clear_new_tab_chrome_link_href'),
                    },
                    {
                        name: 'clear_new_tab_edge',
                        type: 'link',
                        href: app.msg('offer_clear_new_tab_edge_link_href'),
                    },
                    {
                        name: 'empty_new_tab_page_chrome',
                        type: 'link',
                        href: app.msg('offer_empty_new_tab_page_chrome_link_href'),
                    },
                    {
                        name: 'empty_new_tab_page_edge',
                        type: 'link',
                        href: app.msg('offer_empty_new_tab_page_edge_link_href'),
                    },
                    {
                        name: 'close_other_tabs_chrome',
                        type: 'link',
                        href: app.msg('offer_close_other_tabs_plus_chrome_link_href'),
                    },
                    {
                        name: 'close_other_tabs_edge',
                        type: 'link',
                        href: app.msg('offer_close_other_tabs_plus_edge_link_href'),
                    },
                    {
                        name: 'search_enhancer_for_google_chrome',
                        type: 'link',
                        href: app.msg('offer_search_enhancer_for_google_chrome_link_href'),
                    },
                    {
                        name: 'search_enhancer_for_google_edge',
                        type: 'link',
                        href: app.msg('offer_search_enhancer_for_google_edge_link_href'),
                    },
                    {
                        name: 'advanced_extension_reloader_chrome',
                        type: 'link',
                        href: app.msg('offer_advanced_extension_reloader_chrome_link_href'),
                    },
                    {
                        name: 'advanced_extension_reloader_edge',
                        type: 'link',
                        href: app.msg('offer_advanced_extension_reloader_edge_link_href'),
                    },
                    {
                        name: 'scroll_to_top_chrome',
                        type: 'link',
                        href: app.msg('offer_scroll_to_top_chrome_link_href'),
                    },
                    {
                        name: 'scroll_to_top_edge',
                        type: 'link',
                        href: app.msg('offer_scroll_to_top_edge_link_href'),
                    },
                    {
                        name: 'facebook_page',
                        type: 'link',
                        href: app.msg('facebook_page_link_href'),
                    },
                    {
                        name: 'support_page',
                        type: 'link',
                        href: app.msg('support_page_link_href'),
                    },
                    {
                        name: 'dependencies',
                        type: 'link',
                        href: app.msg('dependencies_link_href'),
                    },
                ],
                input_bindings: [],
                exe: [
                    {
                        name: 'layout',
                        type: 'text',
                        val_type: 'string',
                        placeholder: 'en-US',
                    },
                    {
                        name: 'binding_disabled_layouts',
                        type: 'text',
                        val_type: 'array',
                        placeholder: 'en-DVORAK, es-ES',
                    },
                    {
                        name: 'enable_layout_switching_audio',
                        type: 'checkbox',
                        default_val: true,
                    },
                    {
                        name: 'enable_layout_switching_audio_for_automatic_layout_change',
                        type: 'checkbox',
                        default_val: true,
                    },
                    {
                        name: 'enable_typing_audio',
                        type: 'checkbox',
                        default_val: true,
                    },
                    {
                        name: 'automatic_exe_windows_api_layout_switching_delay',
                        type: 'number',
                        val_type: 'number',
                        placeholder: '1000',
                    },
                    {
                        name: 'borderless_window',
                        type: 'checkbox',
                        default_val: false,
                    },
                    {
                        name: 'enable_process_suspend_hotkeys',
                        type: 'checkbox',
                        default_val: false,
                    },
                    {
                        name: 'process_minimize_method',
                        type: 'select',
                        val_type: 'string',
                        default_val: 'minimize',
                    },
                    {
                        name: 'window_title',
                        type: 'text',
                        val_type: 'string',
                        placeholder: 'Fallout4',
                    },
                    {
                        name: 'toggle_current_process_minimized_state',
                        type: 'text',
                        val_type: 'string',
                        placeholder: '!+1',
                    },
                    {
                        name: 'toggle_current_process_suspend_state',
                        type: 'text',
                        val_type: 'string',
                        placeholder: '!+2',
                    },
                    {
                        name: 'toggle_current_process_minimize_and_suspend_state',
                        type: 'text',
                        val_type: 'string',
                        placeholder: '!+3',
                    },
                    {
                        name: 'resume_current_process_suspended',
                        type: 'text',
                        val_type: 'string',
                        placeholder: '!+4',
                    },
                    {
                        name: 'resume_all_suspended_processes',
                        type: 'text',
                        val_type: 'string',
                        placeholder: '!+5',
                    },
                    {
                        name: 'key_bindings',
                        type: 'group',
                    },
                ],
            };

            this.val_type = [
                {
                    name: 'val_type',
                    type: 'select',
                    val_type: 'string',
                    default_val: 'string_key',
                },
            ];

            this.allow_native_function_and_ignore_extra_modifiers = [
                {
                    name: 'allow_native_function',
                    type: 'checkbox',
                    default_val: false,
                },
                {
                    name: 'ignore_extra_modifiers',
                    type: 'checkbox',
                    default_val: false,
                },
            ];

            this.custom_binding_name_string_key = [
                ...this.val_type,
                {
                    name: 'key',
                    type: 'text',
                    val_type: 'string',
                    placeholder: 'a',
                },
            ];

            this.custom_binding_name_object_key = [
                ...this.custom_binding_name_string_key,
                {
                    name: 'delay_before',
                    type: 'number',
                    val_type: 'number',
                    placeholder: '30',
                },
                {
                    name: 'delay_between',
                    type: 'number',
                    val_type: 'number',
                    placeholder: '30',
                },
                {
                    name: 'pre_key_delay',
                    type: 'number',
                    val_type: 'number',
                    placeholder: '30',
                },
                {
                    name: 'post_key_delay',
                    type: 'number',
                    val_type: 'number',
                    placeholder: '30',
                },
                {
                    name: 'wait',
                    type: 'checkbox',
                    default_val: false,
                },
                {
                    name: 'key_wait',
                    type: 'text',
                    val_type: 'string',
                    placeholder: 'f3',
                },
                {
                    name: 'modifiers',
                    type: 'text',
                    val_type: 'array',
                    placeholder: 'Ctrl, Shift',
                },
                ...this.allow_native_function_and_ignore_extra_modifiers,
                {
                    name: 'blind',
                    type: 'checkbox',
                    default_val: false,
                },
                {
                    name: 'send_mode',
                    type: 'select',
                    val_type: 'string',
                    default_val: 'SendInput',
                },
                {
                    name: 'modifiers_release_timeout',
                    type: 'number',
                    val_type: 'number',
                    placeholder: '300',
                },
            ];

            this.custom_binding_name_array_macro = [
                ...this.val_type,
                {
                    name: 'macro',
                    type: 'textarea',
                    val_type: 'macro',
                },
            ];

            this.custom_binding_name_object_macro = [
                ...this.val_type,
                {
                    name: 'macro',
                    type: 'textarea',
                    val_type: 'macro',
                },
                ...this.allow_native_function_and_ignore_extra_modifiers,
                {
                    name: 'repeat_count',
                    type: 'number',
                    val_type: 'number',
                    placeholder: '3',
                },
            ];

            this.feature_state = [
                { name: '0', placeholder: 'feature_off' },
                { name: '1', placeholder: 'feature_on' },
            ];
        }, 'cnt_3478');

    public sanitize_text_for_class = ({ text }: { text: string }): string =>
        err(() => text.replace(/[^A-Za-z0-9]+/g, '_').replace(/^-|-$/g, ''), 'cnt_3478');
}

export const Template = Class.get_instance();
