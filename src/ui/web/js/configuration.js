import { msgs } from './internal.js';

export const get_config = () => {
    msgs.send_msg({ msg: 'get_config' });
};

export const set_template = () => {
    template = {
        main: [
            {
                name: 'features',
                inputs: [
                    { name: 'enable_all_bindings', type: 'checkbox' },
                    {
                        name: 'enable_dedicated_layout_switching',
                        type: 'checkbox',
                    },
                    {
                        name: 'enable_sequential_layout_switching',
                        type: 'checkbox',
                    },
                    {
                        name: 'enable_layout_switching_audio',
                        type: 'checkbox',
                    },
                    { name: 'enable_typing_audio', type: 'checkbox' },
                    {
                        name: 'enable_feature_state_audio',
                        type: 'checkbox',
                    },
                    {
                        name: 'enable_windows_api_layout_switching',
                        type: 'checkbox',
                    },
                ],
            },
            {
                name: 'layouts',
                inputs: [
                    {
                        name: 'all_layouts_ordered',
                        type: 'text',
                        placeholder: 'en-DVORAK,en-US',
                    },
                    {
                        name: 'layout_ids',
                        type: 'text',
                        placeholder: '-268303351,67699721',
                    },
                    {
                        name: 'primary_layout',
                        type: 'text',
                        placeholder: 'en-DVORAK',
                    },
                    {
                        name: 'secondary_layouts',
                        type: 'text',
                        placeholder: 'en-US,es-ES',
                    },
                    {
                        name: 'fallback_layout_switching_exes',
                        type: 'text',
                        placeholder: 'x360ce,RazerAppEngine',
                    },
                    {
                        name: 'layout_switching_delay',
                        type: 'number',
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
                                placeholder: '^!+sc017',
                            },
                            {
                                name: 'set_primary_layout',
                                type: 'text',
                                placeholder: 'ScrollLock',
                            },
                            {
                                name: 'set_secondary_layout',
                                type: 'text',
                                placeholder: 'Pause',
                            },
                            {
                                name: 'dedicated_layout_hotkeys',
                                type: 'text',
                                placeholder: '^+F8,^+F9',
                            },
                            {
                                name: 'toggle_sequential_layout_switching',
                                type: 'text',
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
                                placeholder: '^!+SC035',
                            },
                            {
                                name: 'toggle_windows_api_layout_switching',
                                type: 'text',
                                placeholder: '^!+SC019',
                            },
                            {
                                name: 'toggle_layout_switching_audio',
                                type: 'text',
                                placeholder: '^!+SC034',
                            },
                            {
                                name: 'toggle_typing_audio',
                                type: 'text',
                                placeholder: '^!+SC033',
                            },
                            {
                                name: 'toggle_feature_state_audio',
                                type: 'text',
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
                placeholder: 'en-US',
            },
            {
                name: 'binding_disabled_layouts',
                type: 'text',
                placeholder: 'en-DVORAK,es-ES',
            },
            {
                name: 'enable_layout_switching_audio',
                type: 'text',
                placeholder: 1,
            },
            {
                name: 'enable_layout_switching_audio_for_automatic_layout_change',
                type: 'text',
                placeholder: 0,
            },
            {
                name: 'enable_typing_audio',
                type: 'text',
                placeholder: 1,
            },
            {
                name: 'automatic_exe_windows_api_layout_switching_delay',
                type: 'text',
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
                placeholder: 'a',
            },
            {
                name: 'delay_before',
                type: 'number',
                placeholder: 30,
            },
            {
                name: 'delay_between',
                type: 'number',
                placeholder: 30,
            },
            {
                name: 'pre_key_delay',
                type: 'number',
                placeholder: 30,
            },
            {
                name: 'post_key_delay',
                type: 'number',
                placeholder: 30,
            },
            {
                name: 'wait',
                type: 'number',
                placeholder: 1,
            },
            {
                name: 'key_wait',
                type: 'text',
                placeholder: 'f3',
            },
            {
                name: 'modifiers',
                type: 'text',
                placeholder: 'Ctrl,Shift',
            },
            {
                name: 'allow_native_function',
                type: 'number',
                placeholder: 1,
            },
            {
                name: 'ignore_extra_modifiers',
                type: 'number',
                placeholder: 1,
            },
            {
                name: 'blind',
                type: 'number',
                placeholder: 1,
            },
            {
                name: 'send_mode',
                type: 'text',
                placeholder: 'SendEvent',
            },
            {
                name: 'modifiers_release_timeout',
                type: 'number',
                placeholder: 300,
            },
            {
                name: 'repeat_count',
                type: 'number',
                placeholder: 3,
            },
            {
                name: 'macro',
            },
        ],
    };
};

export let template;
