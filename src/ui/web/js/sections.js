import * as x from './x.js';
import * as inputs from './inputs.js';
import * as subsections from './subsections.js';

const sections = [
    {
        name: 'features',
        inputs: [
            { name: 'enable_all_bindings', type: 'checkbox' },
            { name: 'enable_dedicated_layout_switching', type: 'checkbox' },
            { name: 'enable_sequential_layout_switching', type: 'checkbox' },
            { name: 'enable_layout_switching_audio', type: 'checkbox' },
            { name: 'enable_typing_audio', type: 'checkbox' },
            { name: 'enable_feature_state_audio', type: 'checkbox' },
            { name: 'enable_windows_api_layout_switching', type: 'checkbox' },
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
];

const specific_exe_section_items_template = [
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
];

const key_bindings_section_items_template = [
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
];

export const create_sections = () => {
    sections.forEach((section) => {
        inputs.create_section_btn({ name: section.name });

        const section_el = x.create('div', `section ${section.name}`);
        section_el.dataset.name = section.name;
        x.append(s('.sections'), section_el);

        if (n(section.subsections)) {
            section.subsections.forEach((subsection) => {
                subsections.create_subsection({
                    name: subsection.name,
                    cls: 'subsection',
                    parent: section_el,
                });

                if (subsection.name === 'context_remap') {
                    ['exe', 'input_bindings'].forEach(
                        (inner_subsection_key) => {
                            subsections.create_subsection({
                                name: inner_subsection_key,
                                cls: 'inner_subsection_context_remap',
                                parent: s(`.subsection.${subsection.name}`),
                            });

                            const exe_obj = x.get_nested_val_undefined(
                                ['hotkeys', 'context_remap', 'exe'],
                                config
                            );
                            const exe_obj_keys = n(exe_obj)
                                ? Object.keys(exe_obj)
                                : [];

                            if (inner_subsection_key === 'exe') {
                                exe_obj_keys.forEach((exe_key) => {
                                    subsections.create_subsection({
                                        name: exe_key,
                                        cls: `inner_subsection_exe`,
                                        parent: s(
                                            `.inner_subsection_context_remap.${inner_subsection_key}`
                                        ),
                                        name_spaces_replaced_with_underscore:
                                            x.replace_spaces_with_underscore(
                                                exe_key
                                            ),
                                    });

                                    const key_bindings_obj =
                                        x.get_nested_val_undefined(
                                            [
                                                'hotkeys',
                                                'context_remap',
                                                'exe',
                                                exe_key,
                                                'key_bindings',
                                            ],
                                            config
                                        );
                                    const key_bindings_obj_keys = n(
                                        key_bindings_obj
                                    )
                                        ? Object.keys(key_bindings_obj)
                                        : [];

                                    if (n(key_bindings_obj)) {
                                        subsections.create_subsection({
                                            name: 'key_bindings',
                                            cls: `inner_subsection_key_bindings`,
                                            parent: s(
                                                `.inner_subsection_exe.${x.replace_spaces_with_underscore(
                                                    exe_key
                                                )}`
                                            ),
                                        });

                                        key_bindings_obj_keys.forEach(
                                            (key_bindings_key) => {
                                                subsections.create_subsection({
                                                    name: key_bindings_key,
                                                    cls: `inner_subsection_key_bindings_item`,
                                                    parent: s(
                                                        `.inner_subsection_exe.${x.replace_spaces_with_underscore(
                                                            exe_key
                                                        )} .inner_subsection_key_bindings`
                                                    ),
                                                    name_spaces_replaced_with_underscore:
                                                        x.replace_spaces_with_underscore(
                                                            key_bindings_key
                                                        ),
                                                });
                                            }
                                        );
                                    }
                                });
                            }
                        }
                    );
                }
            });
        }

        if (section.name === 'features') {
            section.inputs.forEach((input) => {
                if (input.type === 'checkbox') {
                    inputs.create_checkbox({
                        name: input.name,
                        parent_section: section_el,
                        config_val_accessor: ['features', input.name],
                    });
                }
            });
        } else if (section.name === 'layouts') {
            section.inputs.forEach((input) => {
                if (['text', 'number'].includes(input.type)) {
                    inputs.create_text_input({
                        name: input.name,
                        parent_section: section_el,
                        config_val_accessor: ['layouts', input.name],
                        subtype: input.type,
                        placeholder: input.placeholder,
                    });
                }
            });
        } else if (section.name === 'hotkeys') {
            section.subsections.forEach((subsection) => {
                if (subsection.name === 'general') {
                    subsection.inputs.forEach((input) => {
                        if (input.type === 'text') {
                            inputs.create_text_input({
                                name: input.name,
                                parent_section: s(
                                    `.subsection.${subsection.name}`
                                ),
                                config_val_accessor: ['hotkeys', input.name],
                                subtype: input.type,
                                placeholder: input.placeholder,
                            });
                        }
                    });
                } else if (subsection.name === 'context_remap') {
                    const input_bindings_obj = x.get_nested_val_undefined(
                        ['hotkeys', 'context_remap', 'input_bindings'],
                        config
                    );
                    const input_bindings_keys = n(input_bindings_obj)
                        ? Object.keys(input_bindings_obj)
                        : [];

                    input_bindings_keys.forEach((key) => {
                        inputs.create_text_input({
                            name: key,
                            parent_section: s(
                                `.inner_subsection_context_remap.input_bindings`
                            ),
                            config_val_accessor: [
                                'hotkeys',
                                'context_remap',
                                'input_bindings',
                                key,
                            ],
                            subtype: 'input_bindings_item',
                            placeholder: '^+F2',
                            convert_cls_to_label: false,
                        });
                    });

                    const exe_obj = x.get_nested_val_undefined(
                        ['hotkeys', 'context_remap', 'exe'],
                        config
                    );
                    const exe_obj_keys = n(exe_obj) ? Object.keys(exe_obj) : [];

                    exe_obj_keys.forEach((exe_obj_key) => {
                        specific_exe_section_items_template.forEach(
                            (specific_exe_section_item) => {
                                if (
                                    specific_exe_section_item.name ===
                                    'key_bindings'
                                ) {
                                    const key_bindings_obj =
                                        x.get_nested_val_undefined(
                                            [
                                                'hotkeys',
                                                'context_remap',
                                                'exe',
                                                exe_obj_key,
                                                'key_bindings',
                                            ],
                                            config
                                        );
                                    const key_bindings_obj_keys = n(
                                        key_bindings_obj
                                    )
                                        ? Object.keys(key_bindings_obj)
                                        : [];
                                    key_bindings_obj_keys.forEach(
                                        (key_bindings_obj_key) => {
                                            key_bindings_section_items_template.forEach(
                                                (key_bindings_section_item) => {
                                                    if (
                                                        key_bindings_section_item.name ===
                                                        'macro'
                                                    ) {
                                                    } else {
                                                        const key_bindings_section_item_val =
                                                            x.get_nested_val_undefined(
                                                                [
                                                                    'hotkeys',
                                                                    'context_remap',
                                                                    'exe',
                                                                    exe_obj_key,
                                                                    'key_bindings',
                                                                    key_bindings_obj_key,
                                                                    key_bindings_section_item.name,
                                                                ],
                                                                config
                                                            );

                                                        if (
                                                            n(
                                                                key_bindings_section_item
                                                            )
                                                        ) {
                                                            inputs.create_text_input(
                                                                {
                                                                    name: key_bindings_section_item.name,
                                                                    parent_section:
                                                                        s(
                                                                            `.inner_subsection_exe.${x.replace_spaces_with_underscore(
                                                                                exe_obj_key
                                                                            )} .inner_subsection_key_bindings_item.${x.replace_spaces_with_underscore(
                                                                                key_bindings_obj_key
                                                                            )}`
                                                                        ),
                                                                    val: key_bindings_section_item_val,
                                                                    subtype:
                                                                        key_bindings_section_item.type,
                                                                    placeholder:
                                                                        key_bindings_section_item.placeholder,
                                                                    convert_cls_to_label: false,
                                                                }
                                                            );
                                                        }
                                                    }
                                                }
                                            );
                                        }
                                    );
                                } else if (
                                    specific_exe_section_item.type === 'text'
                                ) {
                                    const specific_exe_section_item_val =
                                        x.get_nested_val_undefined(
                                            [
                                                'hotkeys',
                                                'context_remap',
                                                'exe',
                                                exe_obj_key,
                                                specific_exe_section_item.name,
                                            ],
                                            config
                                        );

                                    if (n(specific_exe_section_item_val)) {
                                        inputs.create_text_input({
                                            name: specific_exe_section_item.name,
                                            parent_section: s(
                                                `.inner_subsection_exe.${x.replace_spaces_with_underscore(
                                                    exe_obj_key
                                                )}`
                                            ),
                                            val: specific_exe_section_item_val,
                                            subtype:
                                                specific_exe_section_item.type,
                                            placeholder:
                                                specific_exe_section_item.placeholder,
                                            convert_cls_to_label: false,
                                        });
                                    }
                                }
                            }
                        );
                    });
                }
            });
        }
    });
};
