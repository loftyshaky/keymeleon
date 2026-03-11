import { i_sections } from 'settings/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    [key: string]: any;

    public static_sections: string[] = ['features', 'layouts', 'hotkeys'];

    public sections: i_sections.Sections = {
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
                placeholder: 'en-DVORAK,en-US',
            },
            {
                name: 'layout_ids',
                type: 'text',
                val_type: 'array',
                placeholder: '-268303351,67699721',
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
                placeholder: 'en-US,es-ES',
            },
            {
                name: 'fallback_layout_switching_exes',
                type: 'text',
                val_type: 'array',
                placeholder: 'x360ce,RazerAppEngine',
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
                placeholder: '^+F8,^+F9',
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
                placeholder: 'en-DVORAK,es-ES',
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
                name: 'key_bindings',
                type: 'group',
            },
        ],
    };

    public custom_binding_name_string: i_sections.SectionTemplateItem[] = [
        {
            name: 'val_type',
            type: 'select',
            val_type: 'string',
            default_val: 'string',
        },
        {
            name: 'key',
            type: 'text',
            val_type: 'string',
            placeholder: 'a',
        },
    ];

    public custom_binding_name_object: i_sections.SectionTemplateItem[] = [
        ...this.custom_binding_name_string,
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
            placeholder: 'Ctrl,Shift',
        },
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
        {
            name: 'repeat_count',
            type: 'number',
            val_type: 'number',
            placeholder: '3',
        },
    ];

    public sanitize_text_for_class = ({ text }: { text: string }): string =>
        err(() => text.replace(/[^A-Za-z0-9]+/g, '_').replace(/^-|-$/g, ''), 'cnt_3478');
}

export const Template = Class.get_instance();
