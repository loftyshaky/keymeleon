import { o_inputs, i_inputs } from '@loftyshaky/shared-app/inputs';
import { d_sections, i_sections } from 'settings/internal';
import { svg, d_settings, i_settings } from 'shared/internal';

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
    }): i_inputs.InputAndLink =>
        // Changed return type to JSX.Element
        err(() => {
            const add_new_setting_section_item: i_sections.SectionTemplateItem =
                this.generate_add_new_setting_input_section_item({ name_prefix });

            return d_sections.Sections.generate_input({
                section_item: add_new_setting_section_item,
                svg_2: svg.Add,
                val_accessor,
                label_is_visible: true,
            });
        }, 'cnt_5464');

    public sanitize_text_for_class = ({ text }: { text: string }): string =>
        err(() => text.replace(/[^A-Za-z0-9]+/g, '_').replace(/^-|-$/g, ''), 'cnt_3478');
}

export const Sections = Class.get_instance();
