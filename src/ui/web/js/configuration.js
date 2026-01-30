import { x, msgs } from './internal.js';

export const get_config = () => {
    msgs.send_msg({ msg: 'get_config' });
};

export const get_config_val = ({ val_accessor }) =>
    x.get_nested_val(val_accessor, config);

export const set_config_val = ({ val_setter, val }) => {
    config = x.set_nested_val(val_setter, val, config);
};

export const write = () => {
    msgs.send_msg({ msg: 'write_config', config });
};

export const write_change = ({ val_setter, val }) => {
    set_config_val({
        val_setter,
        val,
    });

    write();
};

export const update_checkbox_val = (e) => {
    write_change({
        val_setter: read_config_val_accessor_val({ el: e.target }),
        val: e.target.checked ? 1 : 0,
    });
};

export const update_text_input_val = (e) => {
    let new_val = e.target.value;

    if (e.target.dataset.val_type === 'number') {
        new_val = +new_val;
    } else if (e.target.dataset.val_type === 'array') {
        new_val = x.split_comma_trim(new_val);
    }

    write_change({
        val_setter: read_config_val_accessor_val({ el: e.target }),
        val: new_val,
    });
};

const read_config_val_accessor_val = ({ el }) =>
    el.dataset.config_val_accessor.split(',');

export const remove_val = ({ el }) => {
    x.remove_nested_val(config, el.dataset.config_val_accessor.split(','));

    write();
};

export const set_template = () => {
    template = {
        main: [
            {
                name: 'features',
                inputs: [
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
            },
            {
                name: 'layouts',
                inputs: [
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
            },
            {
                name: 'hotkeys',
                subsections: [
                    {
                        name: 'general',
                        inputs: [
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
                    },
                    {
                        name: 'context_remap',
                    },
                ],
            },
            { name: 'audio' },
            { name: 'links' },
        ],
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
                placeholder: 1000,
            },
            {
                name: 'key_bindings',
            },
        ],
        custom_binding_name: [
            {
                name: 'key',
                type: 'text',
                val_type: 'string',
                placeholder: 'a',
            },
            {
                name: 'delay_before',
                type: 'number',
                val_type: 'number',
                placeholder: 30,
            },
            {
                name: 'delay_between',
                type: 'number',
                val_type: 'number',
                placeholder: 30,
            },
            {
                name: 'pre_key_delay',
                type: 'number',
                val_type: 'number',
                placeholder: 30,
            },
            {
                name: 'post_key_delay',
                type: 'number',
                val_type: 'number',
                placeholder: 30,
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
                type: 'text',
                val_type: 'string',
                placeholder: 'SendEvent',
            },
            {
                name: 'modifiers_release_timeout',
                type: 'number',
                val_type: 'number',
                placeholder: 300,
            },
            {
                name: 'repeat_count',
                type: 'number',
                val_type: 'number',
                placeholder: 3,
            },
            {
                name: 'macro',
            },
        ],
    };
};

export let template;
