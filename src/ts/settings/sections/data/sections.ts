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

            if (section_item.type === 'select') {
                return new o_inputs.Select({
                    name: section_item.name,
                    default_val: section_item.default_val,
                    val_accessor,
                    options: d_sections.Options.options,
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

export const Sections = Class.get_instance();
