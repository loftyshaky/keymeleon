import type { t } from '@loftyshaky/shared-app/shared_clean';
import type { i_sections } from 'settings/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {}

    [key: string]: t.Any;

    public ensure_sections = (): i_sections.Sections | t.AnyRecord =>
        err(() => (n(this.sections) ? this.sections : {}), 'cnt_5346');

    public static_sections: string[] = [
        'docs',
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
                docs: [
                    {
                        name: 'docs',
                        type: 'link',
                    },
                ],
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
                        default_val: '',
                        input_errors: ['invalid_layouts'],
                    },
                    {
                        name: 'layout_ids',
                        type: 'text',
                        val_type: 'array',
                        placeholder: '-268303351, 67699721',
                        default_val: '',
                        input_errors: ['invalid_layout_ids'],
                    },
                    {
                        name: 'primary_layout',
                        type: 'text',
                        val_type: 'string',
                        placeholder: 'en-DVORAK',
                        default_val: '',
                        input_errors: ['invalid_layout'],
                    },
                    {
                        name: 'secondary_layouts',
                        type: 'text',
                        val_type: 'array',
                        placeholder: 'en-US, es-ES',
                        default_val: '',
                        input_errors: ['invalid_layouts'],
                    },
                    {
                        name: 'fallback_layout_switching_exes',
                        type: 'text',
                        val_type: 'array',
                        placeholder: 'x360ce, RazerAppEngine',
                        default_val: '',
                        input_errors: ['invalid_exe_names'],
                    },
                    {
                        name: 'layout_switching_delay',
                        type: 'number',
                        val_type: 'number',
                        placeholder: '30',
                        default_val: '0',
                        input_errors: ['invalid_integer'],
                    },
                ],
                hotkeys: [
                    {
                        name: 'display_current_layout_id',
                        type: 'text',
                        val_type: 'string',
                        placeholder: '^!+sc017',
                        default_val: '',
                        input_errors: ['invalid_ahk_hotkey'],
                    },
                    {
                        name: 'set_primary_layout',
                        type: 'text',
                        val_type: 'string',
                        placeholder: 'ScrollLock',
                        default_val: '',
                        input_errors: ['invalid_ahk_hotkey'],
                    },
                    {
                        name: 'set_secondary_layout',
                        type: 'text',
                        val_type: 'string',
                        placeholder: 'Pause',
                        default_val: '',
                        input_errors: ['invalid_ahk_hotkey'],
                    },
                    {
                        name: 'dedicated_layout_hotkeys',
                        type: 'text',
                        val_type: 'array',
                        placeholder: '^+F8, ^+F9',
                        default_val: '',
                        input_errors: ['invalid_ahk_hotkeys'],
                    },
                    {
                        name: 'toggle_sequential_layout_switching',
                        type: 'text',
                        val_type: 'string',
                        placeholder: '^!+SC01B',
                        default_val: '',
                        input_errors: ['invalid_ahk_hotkey'],
                    },
                    {
                        name: 'toggle_dedicated_layout_switching',
                        type: 'text',
                        val_type: 'string',
                        placeholder: '^!+SC01A',
                        default_val: '',
                        input_errors: ['invalid_ahk_hotkey'],
                    },
                    {
                        name: 'toggle_all_bindings',
                        type: 'text',
                        val_type: 'string',
                        placeholder: '^!+SC035',
                        default_val: '',
                        input_errors: ['invalid_ahk_hotkey'],
                    },
                    {
                        name: 'toggle_windows_api_layout_switching',
                        type: 'text',
                        val_type: 'string',
                        placeholder: '^!+SC019',
                        default_val: '',
                        input_errors: ['invalid_ahk_hotkey'],
                    },
                    {
                        name: 'toggle_layout_switching_audio',
                        type: 'text',
                        val_type: 'string',
                        placeholder: '^!+SC034',
                        default_val: '',
                        input_errors: ['invalid_ahk_hotkey'],
                    },
                    {
                        name: 'toggle_typing_audio',
                        type: 'text',
                        val_type: 'string',
                        placeholder: '^!+SC033',
                        default_val: '',
                        input_errors: ['invalid_ahk_hotkey'],
                    },
                    {
                        name: 'toggle_feature_state_audio',
                        type: 'text',
                        val_type: 'string',
                        placeholder: '^!+SC032',
                        default_val: '',
                        input_errors: ['invalid_ahk_hotkey'],
                    },
                    {
                        name: 'toggle_current_process_minimized_state',
                        type: 'text',
                        val_type: 'string',
                        placeholder: '!+1',
                        default_val: '',
                        input_errors: ['invalid_ahk_hotkey'],
                    },
                    {
                        name: 'toggle_current_process_suspend_state',
                        type: 'text',
                        val_type: 'string',
                        placeholder: '!+2',
                        default_val: '',
                        input_errors: ['invalid_ahk_hotkey'],
                    },
                    {
                        name: 'toggle_current_process_minimize_and_suspend_state',
                        type: 'text',
                        val_type: 'string',
                        placeholder: '!+3',
                        default_val: '',
                        input_errors: ['invalid_ahk_hotkey'],
                    },
                    {
                        name: 'resume_current_process_suspended',
                        type: 'text',
                        val_type: 'string',
                        placeholder: '!+4',
                        default_val: '',
                        input_errors: ['invalid_ahk_hotkey'],
                    },
                    {
                        name: 'resume_all_suspended_processes',
                        type: 'text',
                        val_type: 'string',
                        placeholder: '!+5',
                        default_val: '',
                        input_errors: ['invalid_ahk_hotkey'],
                    },
                ],
                audio: [
                    {
                        name: 'default_file_extension',
                        type: 'text',
                        val_type: 'string',
                        placeholder: 'mp3',
                        default_val: '',
                        input_errors: ['invalid_file_extension'],
                    },
                ],
                process_control: [
                    {
                        name: 'target_processes',
                        type: 'text',
                        val_type: 'array',
                        placeholder: 'Fallout4, KingdomCome',
                        default_val: '',
                        input_errors: ['invalid_exe_names'],
                    },
                    {
                        name: 'suspend_post_minimize_delay',
                        type: 'number',
                        val_type: 'number',
                        placeholder: '100',
                        default_val: '0',
                        input_errors: ['invalid_integer'],
                    },
                    {
                        name: 'resume_pre_unminimize_delay',
                        type: 'number',
                        val_type: 'number',
                        placeholder: '100',
                        default_val: '0',
                        input_errors: ['invalid_integer'],
                    },
                    {
                        name: 'pre_screenshot_delay',
                        type: 'number',
                        val_type: 'number',
                        placeholder: '100',
                        default_val: '0',
                        input_errors: ['invalid_integer'],
                    },
                    {
                        name: 'post_screenshot_delay',
                        type: 'number',
                        val_type: 'number',
                        placeholder: '100',
                        default_val: '0',
                        input_errors: ['invalid_integer'],
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
                        name: 'locale',
                        type: 'select',
                        val_type: 'string',
                        default_val: 'en',
                    },
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
                        default_val: '0',
                        input_errors: ['invalid_integer'],
                    },
                    {
                        name: 'enable_cut_features',
                        type: 'checkbox',
                        default_val: false,
                    },
                    {
                        name: 'detect_infinite_loops',
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
                        default_val: '',
                        input_errors: ['invalid_layout'],
                    },
                    {
                        name: 'binding_disabled_layouts',
                        type: 'text',
                        val_type: 'array',
                        placeholder: 'en-DVORAK, es-ES',
                        default_val: '',
                        input_errors: ['invalid_layouts'],
                    },
                    {
                        name: 'enable_layout_switching_audio',
                        type: 'select',
                        val_type: 'string',
                        default_val: 'default',
                    },
                    {
                        name: 'enable_typing_audio',
                        type: 'select',
                        val_type: 'string',
                        default_val: 'default',
                    },
                    {
                        name: 'enable_layout_switching_audio_for_automatic_layout_change',
                        type: 'checkbox',
                        default_val: true,
                    },
                    {
                        name: 'automatic_exe_windows_api_layout_switching_delay',
                        type: 'number',
                        val_type: 'number',
                        placeholder: '1000',
                        default_val: '0',
                        input_errors: ['invalid_integer'],
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
                        default_val: '',
                        input_errors: ['invalid_exe_name'],
                    },
                    {
                        name: 'toggle_current_process_minimized_state',
                        type: 'text',
                        val_type: 'string',
                        placeholder: '!+1',
                        default_val: '',
                        input_errors: ['invalid_ahk_hotkey'],
                    },
                    {
                        name: 'toggle_current_process_suspend_state',
                        type: 'text',
                        val_type: 'string',
                        placeholder: '!+2',
                        default_val: '',
                        input_errors: ['invalid_ahk_hotkey'],
                    },
                    {
                        name: 'toggle_current_process_minimize_and_suspend_state',
                        type: 'text',
                        val_type: 'string',
                        placeholder: '!+3',
                        default_val: '',
                        input_errors: ['invalid_ahk_hotkey'],
                    },
                    {
                        name: 'resume_current_process_suspended',
                        type: 'text',
                        val_type: 'string',
                        placeholder: '!+4',
                        default_val: '',
                        input_errors: ['invalid_ahk_hotkey'],
                    },
                    {
                        name: 'resume_all_suspended_processes',
                        type: 'text',
                        val_type: 'string',
                        placeholder: '!+5',
                        default_val: '',
                        input_errors: ['invalid_ahk_hotkey'],
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
                    default_val: '',
                    input_errors: ['invalid_any_character_no_space'],
                },
            ];

            this.custom_binding_name_object_key = [
                ...this.custom_binding_name_string_key,
                {
                    name: 'delay_before',
                    type: 'number',
                    val_type: 'number',
                    placeholder: '30',
                    default_val: '0',
                    input_errors: ['invalid_integer'],
                },
                {
                    name: 'delay_between',
                    type: 'number',
                    val_type: 'number',
                    placeholder: '30',
                    default_val: '0',
                    input_errors: ['invalid_integer'],
                },
                {
                    name: 'pre_key_delay',
                    type: 'number',
                    val_type: 'number',
                    placeholder: '30',
                    default_val: '0',
                    input_errors: ['invalid_integer'],
                },
                {
                    name: 'post_key_delay',
                    type: 'number',
                    val_type: 'number',
                    placeholder: '30',
                    default_val: '0',
                    input_errors: ['invalid_integer'],
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
                    default_val: '',
                    input_errors: ['invalid_any_character_no_space'],
                },
                {
                    name: 'modifiers',
                    type: 'text',
                    val_type: 'array',
                    placeholder: 'Ctrl, Shift',
                    default_val: '',
                    input_errors: ['invalid_modifiers'],
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
                    default_val: '0',
                    input_errors: ['invalid_integer'],
                },
            ];

            this.custom_binding_name_array_macro = [
                ...this.val_type,
                {
                    name: 'macro',
                    type: 'textarea',
                    val_type: 'macro',
                    default_val: `[
    {
        "key": ""
    }
]`,
                    input_errors: ['invalid_json'],
                },
            ];

            this.custom_binding_name_object_macro = [
                ...this.custom_binding_name_array_macro,
                ...this.allow_native_function_and_ignore_extra_modifiers,
                {
                    name: 'repeat_count',
                    type: 'number',
                    val_type: 'number',
                    placeholder: '3',
                    default_val: '0',
                    input_errors: ['invalid_integer'],
                },
            ];

            this.feature_state = [
                { name: '0', placeholder: 'feature_off' },
                { name: '1', placeholder: 'feature_on' },
            ];
        }, 'cnt_3478');

    public sanitize_text_for_class = ({ text }: { text: string }): string =>
        err(() => text.replace(/[^A-Za-z0-9]+/g, '_').replace(/^-|-$/g, ''), 'cnt_3478');

    public generate_add_new_setting_input_section_item = ({
        name_prefix,
    }: {
        name_prefix: string;
    }): i_sections.SectionTemplateItem =>
        err(
            () => ({
                name: `${name_prefix}_add_new_setting`,
                type: 'icon_btn',
            }),
            'cnt_5464',
        );

    public generate_input_bindings_section_item = ({
        input_name,
    }: {
        input_name: string;
    }): i_sections.SectionTemplateItem =>
        err(
            () => ({
                name: `${input_name}`,
                type: 'text',
                val_type: 'string',
                placeholder: '^+F2',
                input_errors: ['invalid_ahk_hotkey'],
            }),
            'cnt_6367',
        );

    public generate_input_bindings_group_section_item = ({
        input_name,
    }: {
        input_name: string;
    }): i_sections.SectionTemplateItem =>
        err(
            () => ({
                name: input_name,
                type: 'group',
            }),
            'cnt_6367',
        );

    public generate_exe_group_section_item = ({
        exe_name,
    }: {
        exe_name: string;
    }): i_sections.SectionTemplateItem =>
        err(
            () => ({
                name: `${this.sanitize_text_for_class({ text: exe_name })}_exe_group_level_1`,
                type: 'group',
            }),
            'cnt_6367',
        );

    public generate_audio_section_item = ({
        input_label,
        placeholder,
    }: {
        input_label: string;
        placeholder: string;
    }): i_sections.SectionTemplateItem =>
        err(
            () => ({
                name: input_label,
                type: 'text',
                val_type: 'string',
                placeholder,
                input_errors: ['invalid_filename'],
            }),
            'cnt_7423',
        );
}

export const Template = Class.get_instance();
