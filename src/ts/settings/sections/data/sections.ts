import get from 'lodash/get';
import set from 'lodash/set';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import { makeObservable, computed } from 'mobx';
import { o_inputs, i_inputs } from '@loftyshaky/shared-app/inputs';
import { d_sections, s_sections, i_sections } from 'settings/internal';
import { svg, d_settings, i_settings } from 'shared/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {
        makeObservable(this, {
            include_section_help: computed,
        });
    }

    public get include_section_help(): boolean {
        return ['docs', 'links'].includes(data.settings.prefs.current_section);
    }

    public generate_input = ({
        section_item,
        val_accessor,
        side_btns,
        alt_msg,
        label_is_visible = true,
        svg_2,
        content_is_visible_val_accessor,
        content_is_visible_default = false,
        use_group_id_on_child_inputs = false,
        inputs,
    }: {
        section_item: i_sections.SectionTemplateItem;
        val_accessor: string;
        side_btns?: i_inputs.SideBtn[];
        alt_msg?: string;
        label_is_visible?: boolean;
        svg_2?: string;
        content_is_visible_val_accessor?: string;
        content_is_visible_default?: boolean;
        use_group_id_on_child_inputs?: boolean;
        inputs?: i_inputs.InputsAndLinks;
    }): i_inputs.InputAndLink =>
        err(() => {
            d_settings.Settings.set_transformed({
                val_type: section_item.val_type,
                val_accessor,
            });

            if (section_item.type === 'group') {
                return new o_inputs.Group({
                    name: section_item.name,
                    section: data.settings.prefs.current_section,
                    default_val: section_item.default_val,
                    alt_msg,
                    is_column_layout: true,
                    content_is_visible_default,
                    val_accessor,
                    content_is_visible_val_accessor,
                    developer_mode_setting: section_item.developer_mode_setting,
                    event_callback: () => {},
                    keydown_callback: d_sections.Val.handle_keyboard_on_edit_label,
                    use_group_id_on_child_inputs,
                    inputs: inputs as i_inputs.Inputs,
                    ...(n(side_btns) && { side_btns }),
                });
            }

            if (section_item.type === 'checkbox') {
                return new o_inputs.Checkbox({
                    name: section_item.name,
                    section: data.settings.prefs.current_section,
                    default_val: section_item.default_val,
                    val_accessor,
                    include_help: section_item.include_help,
                    developer_mode_setting: section_item.developer_mode_setting,
                    event_callback: ({ input }: { input: i_inputs.Input }) =>
                        d_sections.Val.change({
                            input,
                            section_item,
                        }),
                    ...(n(side_btns) && { side_btns }),
                });
            }

            if (section_item.type === 'select') {
                return new o_inputs.Select({
                    name: section_item.name,
                    section: data.settings.prefs.current_section,
                    default_val: section_item.default_val,
                    val_accessor,
                    label_is_visible,
                    include_help: section_item.include_help,
                    options: d_sections.Options.options,
                    developer_mode_setting: section_item.developer_mode_setting,
                    event_callback: ({ input }: { input: i_inputs.Input }) =>
                        d_sections.Val.change({
                            input,
                            section_item,
                        }),
                    ...(n(side_btns) && { side_btns }),
                });
            }

            if (section_item.type === 'textarea') {
                return new o_inputs.Textarea({
                    name: section_item.name,
                    section: data.settings.prefs.current_section,
                    default_val: section_item.default_val,
                    val_accessor,
                    label_is_visible,
                    include_help: section_item.include_help,
                    developer_mode_setting: section_item.developer_mode_setting,
                    input_errors: section_item.input_errors,
                    event_callback: ({ input }: { input: i_inputs.Input }) =>
                        d_sections.Val.change({
                            input,
                            section_item,
                        }),
                    warn_state_checker: d_sections.Validation.validate_input,
                    ...(n(side_btns) && { side_btns }),
                });
            }

            if (section_item.type === 'icon_btn' && n(svg_2)) {
                return new o_inputs.IconBtn({
                    name: section_item.name,
                    section: data.settings.prefs.current_section,
                    default_val: section_item.default_val,
                    val_accessor,
                    label_is_visible,
                    Svg: svg_2,
                    developer_mode_setting: section_item.developer_mode_setting,
                    event_callback: d_sections.Val.add_new_item,
                });
            }

            if (section_item.type === 'link') {
                return new o_inputs.Link({
                    name: section_item.name,
                    href: section_item.href,
                });
            }

            return new o_inputs.Text({
                name: section_item.name,
                section: data.settings.prefs.current_section,
                text_type: section_item.type as 'text' | 'number',
                default_val: section_item.default_val,
                val_accessor,
                label_is_visible,
                include_help: section_item.include_help,
                allow_removing_val: true,
                placeholder: section_item.placeholder,
                input_errors: section_item.input_errors,
                event_callback: ({ input }: { input: i_inputs.Input }) =>
                    d_sections.Val.change({
                        input,
                        section_item,
                    }),
                remove_val_callback: ({ input }: { input: i_inputs.Input }) =>
                    d_sections.Val.remove_val({
                        input,
                        section_item,
                    }),
                warn_state_checker: d_sections.Validation.validate_input,
                ...(n(side_btns) && { side_btns }),
            });
        }, 'cnt_2212');

    public generate_add_new_setting_input = ({
        name_prefix,
        val_accessor,
    }: {
        name_prefix: string;
        val_accessor: string;
    }): i_inputs.InputAndLink =>
        // Changed return type to JSX.Element
        err(() => {
            const add_new_setting_section_item: i_sections.SectionTemplateItem =
                s_sections.Template.generate_add_new_setting_input_section_item({ name_prefix });

            return this.generate_input({
                section_item: add_new_setting_section_item,
                svg_2: svg.Add,
                val_accessor,
                label_is_visible: true,
            });
        }, 'cnt_5464');

    public create_current_section = (): o_inputs.Section =>
        err(
            () =>
                new o_inputs.Section({
                    name:
                        data.settings.prefs.current_section === 'prefs'
                            ? 'admin'
                            : data.settings.prefs.current_section,
                    include_help: true,
                    inputs: [],
                }),
            'cnt_5629',
        );

    private generate_exe_group_level_2_inner = ({
        exe_name,
        section_name,
        section_item,
    }: {
        exe_name: string;
        section_name: string;
        section_item: i_sections.SectionTemplateItem;
    }): i_inputs.InputAndLink[] =>
        err(() => {
            const key_bindings_path = `settings.hotkeys.context_remap.exe.${exe_name}.key_bindings`;
            const key_bindings_is_visible_path: string = `settings.ui.window.section_visibility_state.hotkeys.context_remap.exe.${exe_name}.key_bindings.is_visible`;

            if (section_item.name === 'key_bindings' && isObject(get(data, key_bindings_path))) {
                const side_btns: i_inputs.SideBtn[] = d_sections.Sections.generate_side_btns({
                    side_btns_to_generate: ['remove_property', 'collapse_group'],
                    val_type: section_item.val_type,
                });
                const section_item_2: i_sections.SectionTemplateItem = {
                    name: `${section_item.name}_exe_group_level_2`,
                    type: 'group',
                };
                const input = d_sections.Sections.generate_input({
                    section_item: section_item_2,
                    alt_msg: app.msg(`${section_item.name}_label_text`),
                    val_accessor: key_bindings_path,
                    side_btns,
                    content_is_visible_val_accessor: key_bindings_is_visible_path,
                    inputs: rnb(get(data, key_bindings_is_visible_path))
                        ? this.generate_exe_group_level_3({
                              exe_name,
                          })
                        : [],
                });

                return [input];
            }

            if (section_item.name !== 'key_bindings') {
                const side_btns: i_inputs.SideBtn[] = d_sections.Sections.generate_side_btns({
                    side_btns_to_generate: ['remove_property'],
                    val_type: section_item.val_type,
                });

                const input = d_sections.Sections.generate_input({
                    section_item,
                    val_accessor: `settings.hotkeys.context_remap.${section_name}.${exe_name}.${section_item.name}`,
                    side_btns,
                });

                return [input];
            }

            return [];
        }, 'cnt_4363');

    private generate_exe_group_level_3_inner = ({
        exe_name,
        input_name,
    }: {
        exe_name: string;
        input_name: string;
    }): i_inputs.InputAndLink =>
        err(() => {
            const input_path: string = `settings.hotkeys.context_remap.exe.${exe_name}.key_bindings.${input_name}`;
            const is_visible_input_path: string = `settings.ui.window.section_visibility_state.hotkeys.context_remap.exe.${exe_name}.key_bindings.${input_name}.is_visible`;
            const key_bindings_item = get(d_settings.Settings.data_raw, input_path);

            const key_bindings_item_type: i_sections.KeyBindingsItemType =
                d_sections.Val.compute_val_type_initial_val({
                    key_bindings_item,
                });

            const section_item: i_sections.SectionTemplateItem = {
                name: `${s_sections.Template.sanitize_text_for_class({ text: exe_name })}_exe_group_level_3`,
                type: 'group',
            };
            const side_btns: i_inputs.SideBtn[] = d_sections.Sections.generate_side_btns({
                side_btns_to_generate: ['remove_property', 'edit_group_label', 'collapse_group'],
                val_type: section_item.val_type,
            });
            const input = d_sections.Sections.generate_input({
                section_item,
                alt_msg: input_name,
                val_accessor: input_path,
                side_btns,
                content_is_visible_val_accessor: is_visible_input_path,
                inputs: rnb(get(data, is_visible_input_path))
                    ? this.generate_exe_group_level_3_inputs({
                          exe_name,
                          key_binding_name: input_name,
                          key_bindings_item_type,
                      })
                    : [],
            });

            return input;
        }, 'cnt_4363');

    private generate_exe_group_level_3_inputs_inner = ({
        exe_name,
        key_binding_name,
        section_item,
        key_bindings_item_type,
    }: {
        exe_name: string;
        key_binding_name: string;
        section_item: i_sections.SectionTemplateItem;
        key_bindings_item_type: i_sections.KeyBindingsItemType;
    }): i_inputs.InputAndLink =>
        err(() => {
            const is_val_type_input: boolean = section_item.name === 'val_type';
            const val_accessor: string = `${is_val_type_input ? 'ui' : 'settings'}.hotkeys.context_remap.exe.${exe_name}.key_bindings.${key_binding_name}${(section_item.name === 'key' && key_bindings_item_type === 'object_key') || (section_item.name === 'macro' && key_bindings_item_type === 'object_macro') || !['key', 'macro'].includes(section_item.name) ? `.${section_item.name}` : ''}`;

            const input_bindings_item_val = get(
                data,
                `settings.hotkeys.context_remap.exe.${exe_name}.key_bindings.${key_binding_name}`,
            );

            const generate_remove_property_side_btn: boolean =
                typeof input_bindings_item_val !== 'string' &&
                ((isObject(input_bindings_item_val) && !isArray(input_bindings_item_val)) ||
                    !isArray(input_bindings_item_val));

            if (is_val_type_input) {
                const val_type_initial_val: i_sections.KeyBindingsItemType =
                    d_sections.Val.compute_val_type_initial_val({
                        val_accessor: `settings.hotkeys.context_remap.exe.${exe_name}.key_bindings.${key_binding_name}`,
                    });

                set(data, val_accessor, val_type_initial_val);
            }

            const side_btns: i_inputs.SideBtn[] = d_sections.Sections.generate_side_btns({
                side_btns_to_generate:
                    is_val_type_input || !generate_remove_property_side_btn
                        ? []
                        : ['remove_property'],
                val_type: section_item.val_type,
            });

            const input = d_sections.Sections.generate_input({
                section_item,
                val_accessor,
                side_btns,
            });

            return input;
        }, 'cnt_4363');

    private generate_exe_group_level_2 = ({
        exe_name,
        section_name,
    }: {
        exe_name: string;
        section_name: string;
    }): i_inputs.InputsAndLinks =>
        err(() => {
            const inputs: i_inputs.InputsAndLinks = n(s_sections.Template.sections)
                ? s_sections.Template.sections.exe.flatMap(
                      (section_item: i_sections.SectionTemplateItem): i_inputs.InputAndLink[] =>
                          err(
                              () =>
                                  this.generate_exe_group_level_2_inner({
                                      exe_name,
                                      section_name,
                                      section_item,
                                  }),
                              'cnt_4363',
                          ),
                  )
                : [];
            const key_bindings_input_is_present: boolean = inputs.some(
                (input: i_inputs.InputAndLink): boolean =>
                    err(() => input.name === 'key_bindings_exe_group_level_2', 'cnt_5437'),
            );

            if (!key_bindings_input_is_present) {
                inputs.push(
                    d_sections.Sections.generate_add_new_setting_input({
                        name_prefix: 'specific_exe',
                        val_accessor: `settings.hotkeys.context_remap.exe.${exe_name}`,
                    }),
                );
            }

            return inputs;
        }, 'cnt_4256');

    private generate_exe_group_level_3 = ({
        exe_name,
    }: {
        exe_name: string;
    }): i_inputs.InputsAndLinks =>
        err(() => {
            const inputs: i_inputs.InputsAndLinks = n(
                get(data, `settings.hotkeys.context_remap.exe.${exe_name}`),
            )
                ? Object.keys(data.settings.hotkeys.context_remap.exe[exe_name].key_bindings).map(
                      (input_name: string): i_inputs.InputAndLink =>
                          err(
                              () =>
                                  this.generate_exe_group_level_3_inner({
                                      exe_name,
                                      input_name,
                                  }),
                              'cnt_8195',
                          ),
                  )
                : [];

            inputs.push(
                d_sections.Sections.generate_add_new_setting_input({
                    name_prefix: 'key_bindings',
                    val_accessor: `settings.hotkeys.context_remap.exe.${exe_name}.key_bindings`,
                }),
            );

            return inputs;
        }, 'cnt_8195');

    private generate_exe_group_level_3_inputs = ({
        exe_name,
        key_binding_name,
        key_bindings_item_type,
    }: {
        exe_name: string;
        key_binding_name: string;
        key_bindings_item_type: i_sections.KeyBindingsItemType;
    }): i_inputs.InputsAndLinks =>
        err(() => {
            const generate_input = ({
                section_item,
            }: {
                section_item: i_sections.SectionTemplateItem;
            }): i_inputs.InputAndLink =>
                err(
                    () =>
                        this.generate_exe_group_level_3_inputs_inner({
                            exe_name,
                            key_binding_name,
                            section_item,
                            key_bindings_item_type,
                        }),
                    'cnt_4356',
                );

            return s_sections.Template[`custom_binding_name_${key_bindings_item_type}`].map(
                (section_item: i_sections.SectionTemplateItem): i_inputs.InputAndLink =>
                    err(() => generate_input({ section_item }), 'cnt_8195'),
            );
        }, 'cnt_8195');

    public generate_input_bindings_input = ({
        input_name,
        group_section_item,
    }: {
        input_name: string;
        group_section_item: i_sections.SectionTemplateItem;
    }): i_inputs.InputAndLink =>
        err(() => {
            const section_item: i_sections.SectionTemplateItem =
                s_sections.Template.generate_input_bindings_section_item({ input_name });
            const group_side_btns: i_inputs.SideBtn[] =
                d_sections.Sections.generate_input_bindings_side_btns({ section_item });

            return d_sections.Sections.generate_input({
                section_item: group_section_item,
                alt_msg: input_name,
                content_is_visible_default: true,
                val_accessor: `settings.hotkeys.context_remap.input_bindings.${input_name}`,
                side_btns: group_side_btns,
                use_group_id_on_child_inputs: true,
                inputs: [
                    d_sections.Sections.generate_input({
                        section_item,
                        val_accessor: `settings.hotkeys.context_remap.input_bindings.${input_name}`,
                        label_is_visible: false,
                    }),
                ],
            });
        }, 'cnt_6367');

    public generate_exe_input = ({
        section_name,
        exe_name,
        section_item,
    }: {
        section_name: string;
        exe_name: string;
        section_item: i_sections.SectionTemplateItem;
    }): i_inputs.InputAndLink =>
        err(() => {
            const exe_path: string = `settings.hotkeys.context_remap.exe.${exe_name}`;
            const exe_is_visible_path: string = `settings.ui.window.section_visibility_state.hotkeys.context_remap.exe.${exe_name}.is_visible`;
            const side_btns: i_inputs.SideBtn[] = d_sections.Sections.generate_exe_side_btns({
                section_item,
            });

            return d_sections.Sections.generate_input({
                section_item,
                alt_msg: exe_name,
                val_accessor: exe_path,
                side_btns,
                content_is_visible_val_accessor: exe_is_visible_path,
                inputs: rnb(get(data, exe_is_visible_path))
                    ? this.generate_exe_group_level_2({
                          section_name,
                          exe_name,
                      })
                    : [],
            });
        }, 'cnt_6367');

    public generate_static_section_input = ({
        section_name,
        section_item,
    }: {
        section_name: string;
        section_item: i_sections.SectionTemplateItem;
    }): i_inputs.InputAndLink =>
        err(
            () =>
                d_sections.Sections.generate_input({
                    section_item,
                    val_accessor: `settings.${section_name}.${section_item.name}`,
                }),
            'cnt_7439',
        );

    public generate_audio_input = ({
        object_name,
        key_name,
        section_item,
    }: {
        object_name: string;
        key_name: string;
        section_item: i_sections.SectionTemplateItem;
    }): i_inputs.InputAndLink =>
        err(
            () =>
                d_sections.Sections.generate_input({
                    section_item,
                    val_accessor: `settings.audio.${object_name}.${key_name}`,
                }),
            'cnt_7439',
        );

    public generate_side_btns = ({
        side_btns_to_generate,
        val_type,
    }: {
        side_btns_to_generate: string[];
        val_type: i_settings.ValType | undefined;
    }): i_inputs.SideBtn[] =>
        err(
            () =>
                side_btns_to_generate.map(
                    (side_btn_name: string): i_inputs.SideBtn =>
                        err(() => {
                            const side_button_alt_title: string = app.msg(
                                `${side_btn_name}_side_btn_title`,
                            );

                            if (side_btn_name === 'remove_property') {
                                return {
                                    name: side_btn_name,
                                    alt_title: side_button_alt_title,
                                    Svg: svg.Delete,
                                    is_enabled_cond:
                                        d_sections.Val.remove_property_side_btn_is_enabled_cond,
                                    event_callback: ({ input }: { input: i_inputs.Input }) => {
                                        d_sections.Val.remove_property({ input, val_type });
                                    },
                                };
                            }

                            if (side_btn_name === 'edit_group_label') {
                                return {
                                    name: 'edit_group_label',
                                    alt_title: side_button_alt_title,
                                    Svg: svg.Edit,
                                    event_callback: d_sections.Val.toggle_edit_label_state,
                                    is_enabled_cond:
                                        d_sections.Val.editing_group_label_side_btn_is_enabled_cond, // eslint-disable-line max-len
                                };
                            }

                            // if (side_btn_name === 'collapse_group') {
                            return {
                                name: 'collapse_group',
                                alt_title: side_button_alt_title,
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

    public generate_input_bindings_side_btns = ({
        section_item,
    }: {
        section_item: i_sections.SectionTemplateItem;
    }): i_inputs.SideBtn[] =>
        err(
            () =>
                this.generate_side_btns({
                    side_btns_to_generate: ['remove_property', 'edit_group_label'],
                    val_type: section_item.val_type,
                }),
            'cnt_6367',
        );

    public generate_exe_side_btns = ({
        section_item,
    }: {
        section_item: i_sections.SectionTemplateItem;
    }): i_inputs.SideBtn[] =>
        err(
            () =>
                this.generate_side_btns({
                    side_btns_to_generate: [
                        'remove_property',
                        'edit_group_label',
                        'collapse_group',
                    ],
                    val_type: section_item.val_type,
                }),
            'cnt_6367',
        );
}

export const Sections = Class.get_instance();
