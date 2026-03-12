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

    public scroll_sections_to_bottom: boolean = false;

    public generate_input = ({
        section_item,
        val_accessor,
        side_btns,
        alt_msg,
        label_is_visible = true,
        svg_2,
        content_is_visible_val_accessor,
        content_is_visible_default = false,
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
        inputs?: i_inputs.Inputs;
    }): i_inputs.Input =>
        err(() => {
            if (section_item.type === 'group') {
                return new o_inputs.Group({
                    name: section_item.name,
                    alt_msg,
                    is_column_layout: true,
                    content_is_visible_default,
                    val_accessor,
                    content_is_visible_val_accessor,
                    event_callback: () => {},
                    inputs,
                    ...(n(side_btns) && { side_btns }),
                });
            }

            if (section_item.type === 'checkbox') {
                return new o_inputs.Checkbox({
                    name: section_item.name,
                    default_val: section_item.default_val,
                    val_accessor,
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
                    default_val: section_item.default_val,
                    val_accessor,
                    label_is_visible,
                    options: d_sections.Options.options,
                    event_callback: ({ input }: { input: i_inputs.Input }) =>
                        d_sections.Val.change({
                            input,
                            section_item,
                        }),
                    ...(n(side_btns) && { side_btns }),
                });
            }

            if (section_item.type === 'icon_btn' && n(svg_2)) {
                return new o_inputs.IconBtn({
                    name: section_item.name,
                    val_accessor,
                    label_is_visible,
                    Svg: svg_2,
                    event_callback: d_sections.Val.add_new_item,
                });
            }

            return new o_inputs.Text({
                name: section_item.name,
                text_type: section_item.type as 'text' | 'number',
                default_val: section_item.default_val,
                val_accessor,
                label_is_visible,
                allow_removing_val: true,
                placeholder: section_item.placeholder,
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

    public generate_add_new_setting_input_section_item = ({
        name_prefix,
    }: {
        name_prefix: string;
    }): i_sections.SectionTemplateItem =>
        // Changed return type to JSX.Element
        err(
            () => ({
                name: `${name_prefix}_add_new_setting`,
                type: 'icon_btn',
            }),
            'cnt_5464',
        );

    public generate_add_new_setting_input = ({
        name_prefix,
        val_accessor,
    }: {
        name_prefix: string;
        val_accessor: string;
    }): i_inputs.Input =>
        // Changed return type to JSX.Element
        err(() => {
            const add_new_setting_section_item: i_sections.SectionTemplateItem =
                this.generate_add_new_setting_input_section_item({ name_prefix });

            return d_sections.Sections.generate_input({
                section_item: add_new_setting_section_item,
                svg_2: svg.Add,
                val_accessor,
            });
        }, 'cnt_5464');

    public sanitize_text_for_class = ({ text }: { text: string }): string =>
        err(() => text.replace(/[^A-Za-z0-9]+/g, '_').replace(/^-|-$/g, ''), 'cnt_3478');
}

export const Sections = Class.get_instance();
