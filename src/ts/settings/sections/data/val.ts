import get from 'lodash/get';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import { makeObservable, observable, action } from 'mobx';

import { t, s_theme as s_theme_shared, i_data } from '@loftyshaky/shared-app/shared';
import { o_inputs, d_inputs, i_inputs } from '@loftyshaky/shared-app/inputs';
import { s_css_vars, s_theme } from 'shared_clean/internal';
import { d_settings, i_settings } from 'shared/internal';
import { d_sections, s_sections, i_sections } from 'settings/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {
        makeObservable(this, {
            remove_property: action,
            toggle_edit_label_state: action,
            add_new_setting: observable,
        });
    }

    public val_type_reaction_id: string = x.unique_id();
    public remove_property_reaction_id: string = x.unique_id();
    public edit_group_label_reaction_id: string = x.unique_id();
    public collapse_group_reaction_id: string = x.unique_id();
    public add_new_setting: string = x.unique_id();
    private previous_editing_label_input: i_inputs.Input | undefined;
    private previous_editing_label_input_label_val: string | undefined;

    public change = action(
        ({
            input,
            section_item,
        }: {
            input: i_inputs.Input;
            section_item: i_sections.SectionTemplateItem;
        }): void =>
            err(() => {
                const val: i_data.Val = d_inputs.Val.access({ input });

                const val_final: i_data.Val =
                    n(val) &&
                    typeof val === 'string' &&
                    ['enable_typing_audio', 'enable_layout_switching_audio'].includes(input.name) &&
                    ['0', '1'].includes(val)
                        ? +val
                        : val;

                if (input.name === 'val_type' && input.val_accessor) {
                    const val_accessor_split: string[] = input.val_accessor.split('.');

                    val_accessor_split.pop();

                    if (n(val_accessor_split)) {
                        val_accessor_split.shift();
                    }

                    const val_accesor_join: string = val_accessor_split.join('.');

                    const key_bindings_item_val_accessor: string = `settings.${val_accesor_join}`;
                    const key_val_accessor: string = `settings.${val_accesor_join}.key`;
                    const key_bindings_item_val = get(
                        d_settings.Settings.data_raw,
                        key_bindings_item_val_accessor,
                    );
                    const key_val = get(d_settings.Settings.data_raw, key_val_accessor);
                    let key_bindings_item_val_or_key_val;
                    let new_key_bindings_item_val: string | number | t.AnyRecord = '';

                    if (n(key_val)) {
                        key_bindings_item_val_or_key_val = key_val;
                    } else if (n(key_bindings_item_val)) {
                        key_bindings_item_val_or_key_val = key_bindings_item_val;
                    }

                    const key_bindings_item_val_or_key_val_is_not_object =
                        n(key_bindings_item_val_or_key_val) &&
                        ['string', 'number'].includes(typeof key_bindings_item_val_or_key_val);

                    if (val === 'string_key') {
                        new_key_bindings_item_val = key_bindings_item_val_or_key_val_is_not_object
                            ? key_bindings_item_val_or_key_val.toString()
                            : '';
                    } else if (val === 'object_key') {
                        new_key_bindings_item_val = key_bindings_item_val_or_key_val_is_not_object
                            ? { key: key_bindings_item_val_or_key_val.toString() }
                            : {};
                    } else if (val === 'array_macro') {
                        new_key_bindings_item_val = key_bindings_item_val_or_key_val_is_not_object
                            ? [{ key: key_bindings_item_val_or_key_val.toString() }]
                            : [{ key: '' }];
                    } else if (val === 'object_macro') {
                        new_key_bindings_item_val = key_bindings_item_val_or_key_val_is_not_object
                            ? { macro: [{ key: key_bindings_item_val_or_key_val.toString() }] }
                            : { macro: [{ key: '' }] };
                    }

                    d_settings.Settings.write_change_val({
                        val_setter: key_bindings_item_val_accessor,
                        val: new_key_bindings_item_val,
                        val_type: 'string',
                    });

                    this.val_type_reaction_id = x.unique_id();
                }

                s_css_vars.CssVars.set();

                if (input.name === 'options_page_theme') {
                    s_theme_shared.Theme.set({
                        name: data.settings.prefs.options_page_theme,
                        additional_theme_callback: s_theme.Theme.set,
                    });
                }
                if (!d_sections.Validation.validate_input({ input })) {
                    d_settings.Settings.write_change_val({
                        val_setter: input.val_accessor,
                        val: val_final,
                        val_type: section_item.val_type,
                    });
                }
            }, 'cnt_1288'),
    );

    public add_new_item = action(({ input }: { input: i_inputs.Input }): void =>
        err(() => {
            if (input.name === 'input_bindings_add_new_setting') {
                d_settings.Settings.write_change_val({
                    val_setter: `${input.val_accessor}.New_input_binding_${x.id()}`,
                    val: '',
                    val_type: 'string',
                });

                s_sections.Sections.scroll_sections_to_bottom = true;
            } else if (input.name === 'exe_add_new_setting') {
                d_settings.Settings.write_change_val({
                    val_setter: `${input.val_accessor}.New_exe_${x.id()}`,
                    val: {},
                    val_type: 'object',
                });

                s_sections.Sections.scroll_sections_to_bottom = true;
            } else if (input.name === 'specific_exe_add_new_setting') {
                d_settings.Settings.write_change_val({
                    val_setter: `${input.val_accessor}.key_bindings`,
                    val: {},
                    val_type: 'object',
                });
            } else if (input.name === 'key_bindings_add_new_setting') {
                d_settings.Settings.write_change_val({
                    val_setter: `${input.val_accessor}.New_input_hotkey_action_${x.id()}`,
                    val: '',
                    val_type: 'string',
                });
            }

            this.val_type_reaction_id = x.unique_id();
            this.add_new_setting = x.unique_id();
        }, 'cnt_1287'),
    );

    public compute_val_type_initial_val = ({
        key_bindings_item,
        val_accessor = '',
    }: {
        key_bindings_item?: string;
        val_accessor?: string;
    }): i_sections.KeyBindingsItemType =>
        err(() => {
            const val = n(key_bindings_item)
                ? key_bindings_item
                : get(d_settings.Settings.data_raw, val_accessor);

            if (isArray(val)) {
                return 'array_macro';
            }

            if (isObject(val)) {
                if (n((val as any).macro) || n((val as any).repeat_count)) {
                    return 'object_macro';
                }

                return 'object_key';
            }

            return 'string_key';
        }, 'cnt_1291');

    public remove_val = ({
        input,
        section_item,
    }: {
        input: i_inputs.Input;
        section_item: i_sections.SectionTemplateItem;
    }): void =>
        err(() => {
            d_settings.Settings.write_change_val({
                val_setter: input.val_accessor,
                val: '',
                val_type: section_item.val_type,
            });
        }, 'cnt_1290');

    public remove_property = ({
        input,
        val_type,
    }: {
        input: i_inputs.Input;
        val_type: i_settings.ValType | undefined;
    }): void =>
        err(() => {
            if (n(input.side_btns)) {
                const confirm_input_names: string[] = [
                    'macro',
                    '_exe_group_level_3',
                    'key_bindings_exe_group_level_2',
                    '_exe_group_level_1',
                ];
                const confirm_confirm_message_suffix: string[] = [
                    'macro',
                    'hotkey_action',
                    'key_bindings',
                    'exe',
                ];
                const confirm_input_i: number = confirm_input_names.findIndex(
                    (confirm_input_name): boolean =>
                        err(() => input.name.includes(confirm_input_name), 'cnt_5364'),
                );

                const confirmed: boolean =
                    confirm_input_i === -1
                        ? true
                        : globalThis.confirm(
                              app.msg(
                                  `remove_${confirm_confirm_message_suffix[confirm_input_i]}_confirm`,
                              ),
                          );

                if (confirmed) {
                    const side_btn_2: i_inputs.SideBtn | undefined = input.side_btns.find(
                        (side_btn: i_inputs.SideBtn): boolean =>
                            err(() => side_btn.name === 'remove_property', 'cnt_4637'),
                    );

                    if (n(side_btn_2)) {
                        if (side_btn_2.is_enabled_cond!({ input })) {
                            d_settings.Settings.write_unset({ val_setter: input.val_accessor });
                        } else {
                            d_settings.Settings.write_change_val({
                                val_setter: input.val_accessor,
                                val: input.default_val,
                                val_type,
                            });
                        }

                        this.remove_property_reaction_id = x.unique_id();
                    }
                }
            }
        }, 'cnt_1291');

    public remove_property_side_btn_is_enabled_cond = ({
        input,
    }: {
        input: i_inputs.Input;
    }): boolean =>
        err(() => {
            if (input.val_accessor) {
                const property = get(data, input.val_accessor);

                return n(property);
            }

            return false;
        }, 'cnt_4897');

    public collapse_group_side_btn_is_enabled_cond = ({
        input,
    }: {
        input: i_inputs.Input;
    }): boolean =>
        err(() => {
            const val_accessor: string | undefined = (input as o_inputs.Group)
                .content_is_visible_val_accessor;
            let side_btn_is_enabled_cond: number = 0;

            if (n(val_accessor)) {
                const content_is_visible: any = get(data, val_accessor);

                if (
                    n(content_is_visible) &&
                    (content_is_visible === true || content_is_visible === 1)
                ) {
                    side_btn_is_enabled_cond = 1;
                }
            }

            return Boolean(side_btn_is_enabled_cond);
        }, 'cnt_7844');

    public collapse_group = ({ input }: { input: i_inputs.Input }): void =>
        err(() => {
            const val_accessor: string | undefined = (input as o_inputs.Group)
                .content_is_visible_val_accessor;

            if (n(val_accessor)) {
                const content_is_visible: any = get(data, val_accessor);
                let new_content_is_visible_val: number = 1;

                if (
                    n(content_is_visible) &&
                    (content_is_visible === true || content_is_visible === 1)
                ) {
                    new_content_is_visible_val = 0;
                }

                d_settings.Settings.write_change_val({
                    val_setter: val_accessor,
                    val: new_content_is_visible_val,
                });

                this.collapse_group_reaction_id = x.unique_id();
            }
        }, 'cnt_7844');

    public toggle_edit_label_state = ({
        input,
        update_val = true,
    }: {
        input: i_inputs.Input;
        update_val?: boolean;
    }): void =>
        err(() => {
            if (n(d_inputs.LabelInInputItem.toggle_edit_label_state)) {
                if (
                    n(this.previous_editing_label_input) &&
                    ((input !== this.previous_editing_label_input &&
                        (this.previous_editing_label_input as o_inputs.Group).editing_label) ||
                        !update_val)
                ) {
                    this.previous_editing_label_input.label_val =
                        this.previous_editing_label_input_label_val;

                    d_inputs.LabelInInputItem.toggle_edit_label_state({
                        input: this.previous_editing_label_input,
                        callback: () => {},
                    });
                }

                if (update_val) {
                    d_inputs.LabelInInputItem.toggle_edit_label_state({
                        input,
                        callback: this.toggle_edit_label_state_callback,
                    });
                }

                this.edit_group_label_reaction_id = x.unique_id();

                this.previous_editing_label_input = input;
                this.previous_editing_label_input_label_val = input.label_val;
            }
        }, 'cnt_5168');

    private toggle_edit_label_state_callback = ({ input }: { input: i_inputs.Input }): void =>
        err(() => {
            const { editing_label, content_is_visible_val_accessor } = input as o_inputs.Group;

            if (!editing_label && n(input.val_accessor)) {
                const content_is_visible_val_accessor_arr: string[] =
                    content_is_visible_val_accessor
                        ? content_is_visible_val_accessor.split('.')
                        : [];
                const val_accessor_arr_ui: string[] = content_is_visible_val_accessor_arr.slice(
                    0,
                    -1,
                );

                const val_unsetter_ui: string | undefined = val_accessor_arr_ui.join('.');
                const val_ui: string = get(data, val_unsetter_ui);

                const val_config: string = get(data, input.val_accessor);
                const val_unsetter_config: string | undefined = { ...input }.val_accessor;
                const val_accessor_arr_config: string[] = input.val_accessor.split('.');

                if (n(input.label_val) && n(val_unsetter_config)) {
                    val_accessor_arr_ui[val_accessor_arr_ui.length - 1] = input.label_val;
                    val_accessor_arr_config[val_accessor_arr_config.length - 1] = input.label_val;

                    const val_setter_ui: string = val_accessor_arr_ui.join('.');
                    const val_setter_config: string = val_accessor_arr_config.join('.');

                    d_settings.Settings.set_key({
                        val_unsetter: val_unsetter_ui,
                        val_setter: val_setter_ui,
                        val: val_ui,
                    });
                    d_settings.Settings.write_change_key({
                        val_unsetter: val_unsetter_config,
                        val_setter: val_setter_config,
                        val: val_config,
                        sort: true,
                    });
                }
            }
        }, 'cnt_4834');

    public editing_group_label_side_btn_is_enabled_cond = ({
        input,
    }: {
        input: i_inputs.Input;
    }): boolean =>
        err(() => {
            const { editing_label } = input as o_inputs.Group;

            return n(editing_label) && !editing_label;
        }, 'cnt_7844');

    public handle_keyboard_on_edit_label = (
        { parent_input }: { parent_input: i_inputs.Input },
        e: KeyboardEvent,
    ): void =>
        err(() => {
            if (e.code === 'Enter') {
                this.toggle_edit_label_state({ input: parent_input });
            } else if (e.code === 'Escape') {
                this.toggle_edit_label_state({ input: parent_input, update_val: false });
            }
        }, 'cnt_1315');
}

export const Val = Class.get_instance();
