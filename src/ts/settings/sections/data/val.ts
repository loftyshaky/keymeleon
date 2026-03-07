import get from 'lodash/get';
import { makeObservable, action } from 'mobx';

import { i_data } from '@loftyshaky/shared-app/shared';
import { o_inputs, d_inputs, i_inputs } from '@loftyshaky/shared-app/inputs';
import { d_settings } from 'shared/internal';
import { i_sections } from 'settings/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {
        makeObservable(this, {
            remove_property: action,
            toggle_edit_label_state: action,
        });
    }

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

                d_settings.Settings.write_change_val({
                    val_setter: input.val_accessor,
                    val,
                    val_type: section_item.val_type,
                });
            }, 'cnt_1288'),
    );

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

    public remove_property = ({ input }: { input: i_inputs.Input }): void =>
        err(() => {
            d_settings.Settings.write_unset({ val_setter: input.val_accessor });
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
            }
        }, 'cnt_7844');

    public toggle_edit_label_state = ({ input }: { input: i_inputs.Input }): void =>
        err(() => {
            if (n(d_inputs.LabelInInputItem.toggle_edit_label_state)) {
                d_inputs.LabelInInputItem.toggle_edit_label_state({
                    input,
                    callback: this.toggle_edit_label_state_callback,
                });
            }
        }, 'cnt_5168');

    private toggle_edit_label_state_callback = ({ input }: { input: i_inputs.Input }): void =>
        err(() => {
            const { editing_label, content_is_visible_val_accessor } = input as o_inputs.Group;

            if (!editing_label && n(input.val_accessor) && n(content_is_visible_val_accessor)) {
                const content_is_visible_val_accessor_arr: string[] =
                    content_is_visible_val_accessor.split('.');
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
}

export const Val = Class.get_instance();
