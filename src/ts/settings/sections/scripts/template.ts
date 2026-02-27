import get from 'lodash/get';

import { o_inputs, i_inputs } from '@loftyshaky/shared-app/inputs';
import { svg } from 'shared/internal';
import { d_sections, i_sections } from 'settings/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    [key: string]: any;

    private features: i_sections.SectionTemplateItem[] = [
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
    ];

    private layouts: i_sections.SectionTemplateItem[] = [
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
    ];

    private hotkeys: i_sections.SectionTemplateItem[] = [
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
    ];

    private exe: i_sections.SectionTemplateItem[] = [
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
        },
    ];

    private custom_binding_name: i_sections.SectionTemplateItem[] = [
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
            type: 'text',
            val_type: 'string',
            placeholder: 'SendEvent',
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
        {
            name: 'macro',
        },
    ];

    private generate_input = ({
        section_item,
        val_accessor,
        side_btns,
    }: {
        section_item: i_sections.SectionTemplateItem;
        val_accessor: string;
        side_btns?: i_inputs.SideBtn[];
    }): i_inputs.Input | undefined =>
        err(() => {
            if (section_item.type === 'checkbox') {
                return new o_inputs.Checkbox({
                    name: section_item.name,
                    default_val: section_item.default_val,
                    val_accessor,
                    event_callback: () => {},
                    ...(n(side_btns) && { side_btns }),
                });
            }

            if (n(section_item.type) && ['text', 'number'].includes(section_item.type)) {
                return new o_inputs.Text({
                    name: section_item.name,
                    text_type: section_item.type as 'text' | 'number',
                    default_val: section_item.default_val,
                    val_accessor,
                    allow_removing_val: true,
                    placeholder: section_item.placeholder,
                    event_callback: () => {},
                    warn_state_checker: () => false,
                    ...(n(side_btns) && { side_btns }),
                });
            }

            return undefined;
        }, 'cnt_2212');

    public generate_section = ({ section_name }: { section_name: string }): o_inputs.Section =>
        err(() => {
            const section_inputs: i_inputs.Inputs = this[section_name].map(
                (section_item: i_sections.SectionTemplateItem) =>
                    err(
                        () =>
                            this.generate_input({
                                section_item,
                                val_accessor: `settings.${section_name}.${section_item.name}`,
                            }),
                        'cnt_3432',
                    ),
            );

            return new o_inputs.Section({
                name: section_name,
                inputs: section_inputs,
            });
        }, 'cnt_3412');

    public generate_input_bindings_section = (): o_inputs.Section =>
        err(() => {
            const section_name: string = 'input_bindings';
            const input_bindings_obj = get(data.settings, [
                'hotkeys',
                'context_remap',
                section_name,
            ]);
            let section_inputs: i_inputs.Inputs = [];

            if (n(input_bindings_obj)) {
                section_inputs = Object.keys(input_bindings_obj).flatMap((input_name: string) =>
                    err(() => {
                        const input_2: i_inputs.Input | undefined = this.generate_input({
                            section_item: {
                                name: input_name,
                                type: 'text',
                                val_type: 'string',
                                placeholder: '^+F2',
                            },
                            val_accessor: `settings.hotkeys.context_remap.input_bindings.${input_name}`,
                            side_btns: [
                                {
                                    name: 'remove_property',
                                    Svg: svg.Delete,
                                    event_callback: ({ input }: { input: i_inputs.Input }) => {
                                        d_sections.Val.remove_property({
                                            input_type: 'input_bindings',
                                            input,
                                            section_path: `input_bindings.inputs.${input_name}`,
                                        });
                                    },
                                },
                            ],
                        });

                        return n(input_2) ? [input_2] : [];
                    }, 'cnt_3468'),
                );
            }

            return new o_inputs.Section({
                name: section_name,
                inputs: section_inputs,
            });
        }, 'cnt_3413');

    public generate_exe_section = (): o_inputs.Section =>
        err(() => {
            const generate_individual_key_bindings_inputs_inner = ({
                exe_name,
                key_bindings_obj_item_key,
            }: {
                exe_name: string;
                key_bindings_obj_item_key: string;
            }): i_inputs.Input[] =>
                err(
                    () =>
                        this.custom_binding_name.flatMap(
                            (
                                // eslint-disable-next-line max-len
                                section_item_2: i_sections.SectionTemplateItem,
                            ): i_inputs.Input[] =>
                                err(() => {
                                    const event_callback = ({
                                        input,
                                    }: {
                                        input: i_inputs.Input;
                                    }) => {
                                        d_sections.Val.remove_property({
                                            input_type: 'key_bindings',
                                            input,
                                            section_path: `exe.inputs.${this.sanitize_text_for_class({ text: exe_name })}_individual_exe_group.inputs.key_bindings_group.inputs.${key_bindings_obj_item_key}_individual_input_key_binding_group.inputs.${section_item_2.name}`,
                                        });
                                    };

                                    const side_btns = [
                                        {
                                            name: 'remove_property',
                                            Svg: svg.Delete,
                                            is_enabled_cond:
                                                d_sections.Val
                                                    .remove_property_side_btn_is_enabled_cond,
                                            event_callback,
                                        },
                                    ];

                                    const input_3: i_inputs.Input | undefined = this.generate_input(
                                        {
                                            section_item: section_item_2,
                                            val_accessor: `settings.hotkeys.context_remap.exe.${exe_name}.key_bindings.${key_bindings_obj_item_key}.${section_item_2.name}`,
                                            side_btns,
                                        },
                                    );

                                    return n(input_3) ? [input_3] : [];
                                }, 'cnt_4345'),
                        ),
                    'cnt_4358',
                );

            const section_name: string = 'exe';
            const exe_obj = get(data.settings, ['hotkeys', 'context_remap', 'exe']);
            let section_inputs: i_inputs.Inputs = [];

            const create_group = ({
                section_name_2,
                group_name,
                exe_name,
            }: {
                section_name_2: string;
                group_name: string;
                exe_name: string;
            }): o_inputs.Group =>
                err(() => {
                    const collapse_group_event_callback = ({ input }: { input: i_inputs.Input }) =>
                        err(() => {
                            d_sections.Val.collapse_group({
                                input,
                            });
                        }, 'cnt_4345');

                    const group_inputs: i_inputs.Inputs = this[section_name_2].flatMap(
                        (section_item: i_sections.SectionTemplateItem) =>
                            err(() => {
                                let input_2: i_inputs.Input | undefined;

                                if (section_item.name === 'key_bindings') {
                                    const key_bindings_obj = get(data.settings, [
                                        'hotkeys',
                                        'context_remap',
                                        'exe',
                                        exe_name,
                                        'key_bindings',
                                    ]);
                                    let individual_key_bindings_groups: i_inputs.Inputs = [];

                                    const generate_individual_key_bindings_inputs = ({
                                        key_bindings_obj_item_key,
                                    }: {
                                        key_bindings_obj_item_key: string;
                                    }): i_inputs.Inputs =>
                                        err(
                                            () =>
                                                generate_individual_key_bindings_inputs_inner({
                                                    exe_name,
                                                    key_bindings_obj_item_key,
                                                }),
                                            'cnt_4372',
                                        );

                                    if (n(key_bindings_obj)) {
                                        individual_key_bindings_groups = Object.keys(
                                            key_bindings_obj,
                                        ).map((key_bindings_obj_item_key: string) =>
                                            err(() => {
                                                const remove_property_event_callback = ({
                                                    input,
                                                }: {
                                                    input: i_inputs.Input;
                                                }) =>
                                                    err(() => {
                                                        d_sections.Val.remove_property({
                                                            input_type:
                                                                'individual_input_key_binding_group',
                                                            input,
                                                            section_path: `exe.inputs.${this.sanitize_text_for_class({ text: exe_name })}_individual_exe_group.inputs.key_bindings_group.inputs.${key_bindings_obj_item_key}_individual_input_key_binding_group`,
                                                        });
                                                    }, 'cnt_4345');

                                                return new o_inputs.Group({
                                                    name: `${this.sanitize_text_for_class({ text: key_bindings_obj_item_key })}_individual_input_key_binding_group`,
                                                    alt_msg: key_bindings_obj_item_key,
                                                    is_column_layout: true,
                                                    content_is_visible_default: false,
                                                    val_accessor: `settings.hotkeys.context_remap.exe.${exe_name}.key_bindings.${key_bindings_obj_item_key}`,
                                                    content_is_visible_val_accessor: `settings.ui.window.section_visibility_state.hotkeys.context_remap.exe.${exe_name}.key_bindings.${key_bindings_obj_item_key}.is_visible`,
                                                    event_callback: () => undefined,
                                                    // eslint-disable-next-line max-len
                                                    inputs: generate_individual_key_bindings_inputs(
                                                        {
                                                            key_bindings_obj_item_key,
                                                        },
                                                    ),
                                                    side_btns: [
                                                        {
                                                            name: 'remove_property',
                                                            Svg: svg.Delete,
                                                            event_callback:
                                                                remove_property_event_callback,
                                                        },
                                                        {
                                                            name: 'collapse_group',
                                                            Svg: svg.KeyboardArrowDown,
                                                            is_enabled_cond:
                                                                d_sections.Val
                                                                    .collapse_group_side_btn_is_enabled_cond, // eslint-disable-line max-len
                                                            event_callback:
                                                                collapse_group_event_callback,
                                                        },
                                                    ],
                                                });
                                            }, 'cnt_8415'),
                                        );
                                    }

                                    const remove_property_event_callback = ({
                                        input,
                                    }: {
                                        input: i_inputs.Input;
                                    }) =>
                                        err(() => {
                                            d_sections.Val.remove_property({
                                                input_type: 'key_bindings_group',
                                                input,
                                                section_path: `exe.inputs.${this.sanitize_text_for_class({ text: exe_name })}_individual_exe_group.inputs.key_bindings_group`,
                                            });
                                        }, 'cnt_4345');

                                    input_2 = new o_inputs.Group({
                                        name: 'key_bindings_group',
                                        alt_msg: app.msg('key_bindings_label_text'),
                                        is_column_layout: true,
                                        content_is_visible_default: false,
                                        val_accessor: `settings.hotkeys.context_remap.exe.${exe_name}.key_bindings`,
                                        content_is_visible_val_accessor: `settings.ui.window.section_visibility_state.hotkeys.context_remap.exe.${exe_name}.key_bindings.is_visible`,
                                        event_callback: () => undefined,
                                        inputs: individual_key_bindings_groups,
                                        side_btns: [
                                            {
                                                name: 'remove_property',
                                                Svg: svg.Delete,
                                                event_callback: remove_property_event_callback,
                                            },
                                            {
                                                name: 'collapse_group',
                                                Svg: svg.KeyboardArrowDown,
                                                is_enabled_cond:
                                                    d_sections.Val
                                                        .collapse_group_side_btn_is_enabled_cond,
                                                event_callback: collapse_group_event_callback,
                                            },
                                        ],
                                    });
                                } else {
                                    const event_callback = ({
                                        input,
                                    }: {
                                        input: i_inputs.Input;
                                    }) => {
                                        d_sections.Val.remove_property({
                                            input_type: 'exe',
                                            input,
                                            section_path: `exe.inputs.${this.sanitize_text_for_class({ text: exe_name })}_individual_exe_group.inputs.${section_item.name}`,
                                        });
                                    };

                                    input_2 = this.generate_input({
                                        section_item,
                                        val_accessor: `settings.hotkeys.context_remap.exe.${exe_name}.${section_item.name}`,
                                        side_btns: [
                                            {
                                                name: 'remove_property',
                                                Svg: svg.Delete,
                                                is_enabled_cond:
                                                    d_sections.Val
                                                        .remove_property_side_btn_is_enabled_cond,
                                                event_callback,
                                            },
                                        ],
                                    });
                                }

                                return n(input_2) ? [input_2] : [];
                            }, 'cnt_3113'),
                    );

                    const remove_property_event_callback = ({ input }: { input: i_inputs.Input }) =>
                        err(() => {
                            d_sections.Val.remove_property({
                                input_type: 'individual_exe_group',
                                input,
                                section_path: `exe.inputs.${this.sanitize_text_for_class({ text: exe_name })}_individual_exe_group`,
                            });
                        }, 'cnt_4345');

                    return new o_inputs.Group({
                        name: `${this.sanitize_text_for_class({ text: group_name })}_group`,
                        alt_msg: exe_name,
                        is_column_layout: true,
                        content_is_visible_default: false,
                        val_accessor: `settings.hotkeys.context_remap.exe.${exe_name}`,
                        content_is_visible_val_accessor: `settings.ui.window.section_visibility_state.hotkeys.context_remap.exe.${exe_name}.is_visible`,
                        event_callback: () => undefined,
                        inputs: group_inputs,
                        side_btns: [
                            {
                                name: 'remove_property',
                                Svg: svg.Delete,
                                event_callback: remove_property_event_callback,
                            },
                            {
                                name: 'collapse_group',
                                Svg: svg.KeyboardArrowDown,
                                is_enabled_cond:
                                    d_sections.Val.collapse_group_side_btn_is_enabled_cond,
                                event_callback: collapse_group_event_callback,
                            },
                        ],
                    });
                }, 'cnt_3417');

            if (n(exe_obj)) {
                section_inputs = Object.keys(exe_obj).map((exe_name: string) =>
                    err(
                        () =>
                            create_group({
                                section_name_2: 'exe',
                                group_name: `${exe_name}_individual_exe`,
                                exe_name,
                            }),
                        'cnt_3444',
                    ),
                );
            }

            return new o_inputs.Section({
                name: section_name,
                inputs: section_inputs,
            });
        }, 'cnt_3417');

    private sanitize_text_for_class = ({ text }: { text: string }): string =>
        err(
            () =>
                text
                    .toLowerCase()
                    .replace(/\.exe$/, '')
                    .replace(/[^a-z0-9]+/g, '_')
                    .replace(/^-|-$/g, '')
                    .replace(/^[^a-z]/, 'exe-$&'),
            'cnt_3478',
        );
}

export const Template = Class.get_instance();
