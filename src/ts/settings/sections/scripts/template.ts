import { o_inputs, i_inputs } from '@loftyshaky/shared-app/inputs';
import { d_sections, i_sections } from 'settings/internal';
import { svg } from 'shared/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    [key: string]: any;

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

    public custom_binding_name: i_sections.SectionTemplateItem[] = [
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
    ];

    public generate_input = ({
        section_item,
        val_accessor,
        side_btns,
        alt_msg,
        content_is_visible_val_accessor,
        inputs,
    }: {
        section_item: i_sections.SectionTemplateItem;
        val_accessor: string;
        side_btns?: i_inputs.SideBtn[];
        alt_msg?: string;
        content_is_visible_val_accessor?: string;
        inputs?: i_inputs.Inputs;
    }): i_inputs.Input =>
        err(() => {
            if (section_item.type === 'group') {
                return new o_inputs.Group({
                    name: section_item.name,
                    alt_msg,
                    is_column_layout: true,
                    content_is_visible_default: false,
                    val_accessor,
                    content_is_visible_val_accessor,
                    event_callback: () => undefined,
                    inputs,
                    ...(n(side_btns) && { side_btns }),
                });
            }

            if (section_item.type === 'checkbox') {
                return new o_inputs.Checkbox({
                    name: section_item.name,
                    default_val: section_item.default_val,
                    val_accessor,
                    event_callback: () => {},
                    ...(n(side_btns) && { side_btns }),
                });
            }

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
        }, 'cnt_2212');

    public generate_side_btns = ({
        side_btns_to_generate,
    }: {
        side_btns_to_generate: string[];
    }): i_inputs.SideBtn[] =>
        err(
            () =>
                side_btns_to_generate.map(
                    (side_btn_name: string): i_inputs.SideBtn =>
                        err(() => {
                            if (side_btn_name === 'remove_property') {
                                return {
                                    name: side_btn_name,
                                    Svg: svg.Delete,
                                    is_enabled_cond:
                                        d_sections.Val.remove_property_side_btn_is_enabled_cond,
                                    event_callback: d_sections.Val.remove_property,
                                };
                            }

                            if (side_btn_name === 'edit_group_label') {
                                return {
                                    name: 'edit_group_label',
                                    Svg: svg.Edit,
                                    event_callback: d_sections.Val.toggle_edit_label_state,
                                    is_enabled_cond:
                                        d_sections.Val.editing_group_label_side_btn_is_enabled_cond, // eslint-disable-line max-len
                                };
                            }

                            // if (side_btn_name === 'collapse_group') {
                            return {
                                name: 'collapse_group',
                                Svg: svg.KeyboardArrowDown,
                                is_enabled_cond:
                                    d_sections.Val.collapse_group_side_btn_is_enabled_cond, // eslint-disable-line max-len
                                event_callback: d_sections.Val.collapse_group,
                            };
                            // }
                        }, 'cnt_3832'),
                ),
            'cnt_3574',
        );

    public sanitize_text_for_class = ({ text }: { text: string }): string =>
        err(() => text.replace(/[^A-Za-z0-9]+/g, '_').replace(/^-|-$/g, ''), 'cnt_3478');
}

export const Template = Class.get_instance();
