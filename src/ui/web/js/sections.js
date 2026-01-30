import {
    x,
    configuration,
    inputs,
    side_menu,
    subsections,
} from './internal.js';

const create_section = ({ config_template_section }) => {
    // features, layouts, hotkeys, audio, links
    side_menu.create_section_btn({ name: config_template_section.name });

    const section_el = x.create(
        'div',
        `section ${config_template_section.name}`
    );
    section_el.dataset.name = config_template_section.name;
    x.append(s('.sections'), section_el);

    return section_el;
};

const create_subsection = ({ section_el, config_template_subsection }) => {
    // general and context_remap it hotkeys
    subsections.create_subsection({
        name: config_template_subsection.name,
        cls: 'subsection',
        parent: section_el,
        convert_cls_to_label: true,
    });
};

const create_context_remap_inner_subsection = ({
    // exe and input_bindings in context_remap
    inner_subsection_key,
    config_template_subsection,
}) => {
    subsections.create_subsection({
        name: inner_subsection_key,
        cls: 'inner_subsection inner_subsection_layer_1',
        parent: s(
            `.subsection[data-name="${config_template_subsection.name}"]`
        ),
        convert_cls_to_label: true,
    });
};

const create_exe_inner_subsection = ({ inner_subsection_key, exe_obj_key }) => {
    // Fallout4, default in exe
    subsections.create_subsection({
        name: exe_obj_key,
        cls: `inner_subsection inner_subsection_layer_2`,
        parent: s(
            `.inner_subsection_layer_1[data-name="${inner_subsection_key}"]`
        ),
        convert_cls_to_label: false,
    });
};

const create_key_bindings_inner_subsection = ({ exe_obj_key }) => {
    // key_bindings in specific exe (literaly "key_bindings" items)
    subsections.create_subsection({
        name: 'key_bindings',
        cls: `inner_subsection inner_subsection_layer_3`,
        parent: s(`.inner_subsection_layer_2[data-name="${exe_obj_key}"]`),
        convert_cls_to_label: true,
    });
};

const create_specific_exe_inputs_w = ({ exe_obj_key }) => {
    const exe_properties_w_el = x.create('div', `specific_exe_inputs_w`);
    exe_properties_w_el.dataset.name = exe_obj_key;

    x.append(
        s(`.inner_subsection_layer_2[data-name="${exe_obj_key}"]`),
        exe_properties_w_el
    );
};

const create_custom_binding_name_inner_subsection = ({
    // button_1, button_2
    custom_binding_name_key,
    exe_obj_key,
}) => {
    subsections.create_subsection({
        name: custom_binding_name_key,
        cls: `inner_subsection inner_subsection_layer_4`,
        parent: s(
            `.inner_subsection_layer_2[data-name="${exe_obj_key}"] .inner_subsection_layer_3`
        ),
        convert_cls_to_label: false,
    });
};

const get_exe_obj_keys = () => {
    const exe_obj = x.get_nested_val_undefined(
        ['hotkeys', 'context_remap', 'exe'],
        config
    );
    const exe_obj_keys = x.get_keys(exe_obj);

    return exe_obj_keys;
};

const get_key_bindings_obj = ({ exe_obj_key }) =>
    x.get_nested_val_undefined(
        ['hotkeys', 'context_remap', 'exe', exe_obj_key, 'key_bindings'],
        config
    );

const get_key_bindings_keys = ({ exe_obj_key }) => {
    const key_bindings_obj = get_key_bindings_obj({ exe_obj_key });
    const key_bindings_obj_keys = x.get_keys(key_bindings_obj);

    return key_bindings_obj_keys;
};

const insert_input_bindings_in_the_beginning_of_context_remap = () => {
    x.before(
        s(`.inner_subsection[data-name="exe"]`),
        s(`.inner_subsection[data-name="input_bindings"]`)
    );
};

const create_headers = ({ section_el, config_template_section }) => {
    if (n(config_template_section.subsections)) {
        config_template_section.subsections.forEach(
            (config_template_subsection) => {
                create_subsection({
                    // general and context_remap it hotkeys
                    section_el,
                    config_template_subsection: config_template_subsection,
                });

                if (config_template_subsection.name === 'context_remap') {
                    ['exe', 'input_bindings'].forEach(
                        (inner_subsection_key) => {
                            create_context_remap_inner_subsection({
                                // exe and input_bindings in context_remap
                                inner_subsection_key,
                                config_template_subsection,
                            });

                            const exe_obj_keys = get_exe_obj_keys();

                            if (inner_subsection_key === 'exe') {
                                exe_obj_keys.forEach((exe_obj_key) => {
                                    create_exe_inner_subsection({
                                        // Fallout4, default in exe
                                        inner_subsection_key,
                                        exe_obj_key,
                                    });

                                    const key_bindings_obj =
                                        get_key_bindings_obj({ exe_obj_key });
                                    const key_bindings_obj_keys =
                                        x.get_keys(key_bindings_obj);

                                    if (n(key_bindings_obj)) {
                                        create_specific_exe_inputs_w({
                                            exe_obj_key,
                                        });
                                        create_key_bindings_inner_subsection(
                                            // key_bindings in specific exe (literaly "key_bindings" items)
                                            { exe_obj_key }
                                        );

                                        key_bindings_obj_keys.forEach(
                                            (custom_binding_name_key) => {
                                                create_custom_binding_name_inner_subsection(
                                                    // button_1, button_2
                                                    {
                                                        custom_binding_name_key,
                                                        exe_obj_key,
                                                    }
                                                );
                                            }
                                        );
                                    }
                                });
                            }
                        }
                    );
                }
            }
        );
    }
};

const create_feautures_inputs = ({ section_el, config_template_section }) => {
    config_template_section.inputs.forEach((input) => {
        if (input.type === 'checkbox') {
            inputs.create_checkbox({
                name: input.name,
                default_val: input.default_val,
                type: 'features',
                parent_section: section_el,
                config_val_accessor: ['features', input.name],
            });
        }
    });
};

const create_layouts_inputs = ({ section_el, config_template_section }) => {
    config_template_section.inputs.forEach((input) => {
        if (['text', 'number'].includes(input.type)) {
            inputs.create_text_input({
                name: input.name,
                type: 'layouts',
                parent_section: section_el,
                config_val_accessor: ['layouts', input.name],
                subtype: input.type,
                val_type: input.val_type,
                placeholder: input.placeholder,
                convert_cls_to_label: true,
            });
        }
    });
};

const create_general_inputs = ({ config_template_subsection }) => {
    // set_primary_layout, set_secondary_layout
    config_template_subsection.inputs.forEach((input) => {
        if (['text', 'number'].includes(input.type)) {
            inputs.create_text_input({
                name: input.name,
                type: 'general',
                parent_section: s(
                    `.subsection[data-name="${config_template_subsection.name}"]`
                ),
                config_val_accessor: ['hotkeys', input.name],
                subtype: input.type,
                val_type: input.val_type,
                placeholder: input.placeholder,
                convert_cls_to_label: true,
            });
        }
    });
};

const create_input_bindings_inputs = ({ config_template_subsection }) => {
    // button_1, button_2 in input_bindings
    const input_bindings_obj = x.get_nested_val_undefined(
        ['hotkeys', 'context_remap', 'input_bindings'],
        config
    );
    const input_bindings_keys = x.get_keys(input_bindings_obj);

    input_bindings_keys.forEach((key) => {
        inputs.create_text_input({
            name: key,
            type: 'input_bindings',
            parent_section: s(
                `.inner_subsection_layer_1[data-name="input_bindings"]`
            ),
            config_val_accessor: [
                'hotkeys',
                'context_remap',
                'input_bindings',
                key,
            ],
            subtype: 'text',
            val_type: 'text',
            placeholder: '^+F2',
            convert_cls_to_label: false,
        });
    });
};

const create_custom_binding_name_inputs = ({
    // inputs like key, delay_between inside key_bindings inside button_1/button_2
    exe_obj_key,
    key_bindings_obj_key,
    custom_binding_name_item,
}) => {
    const config_val_accessor = [
        'hotkeys',
        'context_remap',
        'exe',
        exe_obj_key,
        'key_bindings',
        key_bindings_obj_key,
        custom_binding_name_item.name,
    ];
    const custom_binding_name_item_val = x.get_nested_val_undefined(
        config_val_accessor,
        config
    );

    const parent_section = s(
        `.inner_subsection_layer_2[data-name="${exe_obj_key}"] .inner_subsection_layer_4[data-name="${key_bindings_obj_key}"]`
    );

    if (['text', 'number'].includes(custom_binding_name_item.type)) {
        inputs.create_text_input({
            name: custom_binding_name_item.name,
            type: 'custom_binding_name',
            parent_section: s(
                `.inner_subsection_layer_2[data-name="${exe_obj_key}"] .inner_subsection_layer_4[data-name="${key_bindings_obj_key}"]`
            ),
            config_val_accessor,
            val: custom_binding_name_item_val,
            subtype: custom_binding_name_item.type,
            val_type: custom_binding_name_item.val_type,
            placeholder: custom_binding_name_item.placeholder,
            convert_cls_to_label: true,
        });
    } else if (custom_binding_name_item.type === 'checkbox') {
        inputs.create_checkbox({
            name: custom_binding_name_item.name,
            default_val: custom_binding_name_item.default_val,
            type: 'custom_binding_name',
            parent_section,
            config_val_accessor,
            val: custom_binding_name_item_val,
        });
    }
};

const create_specific_exe_inputs = ({
    // inputs like enable_layout_switching_audio, enable_layout_switching_audio_for_automatic_layout_change inside specific exe like Fallout4
    exe_obj_key,
    specific_exe_section_item,
}) => {
    const config_val_accessor = [
        'hotkeys',
        'context_remap',
        'exe',
        exe_obj_key,
        specific_exe_section_item.name,
    ];

    const specific_exe_section_item_val = x.get_nested_val_undefined(
        config_val_accessor,
        config
    );
    const parent_section = s(
        `.specific_exe_inputs_w[data-name="${exe_obj_key}"]`
    );

    if (['text', 'number'].includes(specific_exe_section_item.type)) {
        inputs.create_text_input({
            name: specific_exe_section_item.name,
            type: 'specific_exe',
            parent_section,
            config_val_accessor,
            val: specific_exe_section_item_val,
            subtype: specific_exe_section_item.type,
            val_type: specific_exe_section_item.val_type,
            placeholder: specific_exe_section_item.placeholder,
            convert_cls_to_label: true,
        });
    } else if (specific_exe_section_item.type === 'checkbox') {
        inputs.create_checkbox({
            name: specific_exe_section_item.name,
            default_val: specific_exe_section_item.default_val,
            type: 'specific_exe',
            parent_section,
            config_val_accessor,
            val: specific_exe_section_item_val,
        });
    }
};

const create_hotkey_inputs = ({ config_template_section }) => {
    config_template_section.subsections.forEach(
        (config_template_subsection) => {
            if (config_template_subsection.name === 'general') {
                create_general_inputs({
                    // set_primary_layout, set_secondary_layout
                    config_template_subsection,
                });
            } else if (config_template_subsection.name === 'context_remap') {
                create_input_bindings_inputs({ config_template_subsection }); // button_1, button_2 in input_bindings

                const exe_obj_keys = get_exe_obj_keys();

                exe_obj_keys.forEach((exe_obj_key) => {
                    configuration.template.exe.forEach(
                        (specific_exe_section_item) => {
                            if (
                                specific_exe_section_item.name ===
                                'key_bindings'
                            ) {
                                const key_bindings_obj_keys =
                                    get_key_bindings_keys({
                                        exe_obj_key,
                                    });

                                key_bindings_obj_keys.forEach(
                                    (key_bindings_obj_key) => {
                                        configuration.template.custom_binding_name.forEach(
                                            (custom_binding_name_item) => {
                                                if (
                                                    custom_binding_name_item.name ===
                                                    'macro'
                                                ) {
                                                } else {
                                                    create_custom_binding_name_inputs(
                                                        // inputs like key, delay_between inside key_bindings inside button_1/button_2
                                                        {
                                                            exe_obj_key,
                                                            key_bindings_obj_key,
                                                            custom_binding_name_item,
                                                        }
                                                    );
                                                }
                                            }
                                        );
                                    }
                                );
                            } else {
                                create_specific_exe_inputs({
                                    // inputs like enable_layout_switching_audio, enable_layout_switching_audio_for_automatic_layout_change inside specific exe like Fallout4
                                    exe_obj_key,
                                    specific_exe_section_item,
                                });
                            }
                        }
                    );
                });
            }
        }
    );

    insert_input_bindings_in_the_beginning_of_context_remap();
};

export const create_sections = () => {
    configuration.template.main.forEach((config_template_section) => {
        const section_el = create_section({ config_template_section }); // features, layouts, hotkeys, audio, links

        create_headers({ section_el, config_template_section });

        if (config_template_section.name === 'features') {
            create_feautures_inputs({
                section_el,
                config_template_section,
            });
        } else if (config_template_section.name === 'layouts') {
            create_layouts_inputs({ section_el, config_template_section });
        } else if (config_template_section.name === 'hotkeys') {
            create_hotkey_inputs({ config_template_section });
        }
    });

    x.bind(sa('.section_btn'), 'click', side_menu.select_section);

    side_menu.select_section();
};
