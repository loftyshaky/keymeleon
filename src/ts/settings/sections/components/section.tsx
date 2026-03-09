import get from 'lodash/get';
import set from 'lodash/set';
import isObject from 'lodash/isObject';
import isEmpty from 'lodash/isEmpty';
import React from 'react';
import { observer } from 'mobx-react';

import { i_inputs } from '@loftyshaky/shared-app/inputs';
import { c_sections, d_sections, s_sections, i_sections } from 'settings/internal';

export const Section: React.FunctionComponent = observer(() => {
    const generate_sections = () =>
        err(() => {
            let generated_sections: JSX.Element[] | undefined;

            Object.keys(s_sections.Template.sections).forEach((section_name: string): void =>
                err(() => {
                    if (section_name === data.settings.prefs.current_section) {
                        const generate_exe_group_level_2_inner = ({
                            exe_name,
                            section_item,
                        }: {
                            exe_name: string;
                            section_item: i_sections.SectionTemplateItem;
                        }): i_inputs.Input[] =>
                            err(() => {
                                const key_bindings_path = `settings.hotkeys.context_remap.exe.${exe_name}.key_bindings`;
                                const key_bindings_is_visible_path: string = `settings.ui.window.section_visibility_state.hotkeys.context_remap.exe.${exe_name}.key_bindings.is_visible`;

                                if (
                                    section_item.name === 'key_bindings' &&
                                    !isEmpty(get(data, key_bindings_path))
                                ) {
                                    const side_btns: i_inputs.SideBtn[] =
                                        d_sections.Sections.generate_side_btns({
                                            side_btns_to_generate: [
                                                'remove_property',
                                                'collapse_group',
                                            ],
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
                                        content_is_visible_val_accessor:
                                            key_bindings_is_visible_path,
                                        inputs: rnb(get(data, key_bindings_is_visible_path))
                                            ? generate_exe_group_level_3({
                                                  exe_name,
                                              })
                                            : [],
                                    });

                                    return [input];
                                }

                                if (section_item.name !== 'key_bindings') {
                                    const side_btns: i_inputs.SideBtn[] =
                                        d_sections.Sections.generate_side_btns({
                                            side_btns_to_generate: ['remove_property'],
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

                        const generate_exe_group_level_3_inner = ({
                            exe_name,
                            input_name,
                        }: {
                            exe_name: string;
                            input_name: string;
                        }): i_inputs.Input =>
                            err(() => {
                                const input_path: string = `settings.hotkeys.context_remap.exe.${exe_name}.key_bindings.${input_name}`;
                                const is_visible_input_path: string = `settings.ui.window.section_visibility_state.hotkeys.context_remap.exe.${exe_name}.key_bindings.${input_name}.is_visible`;
                                const key_bindings_item = get(data, input_path);
                                const key_bindings_item_is_object: boolean =
                                    isObject(key_bindings_item);
                                const side_btns: i_inputs.SideBtn[] =
                                    d_sections.Sections.generate_side_btns({
                                        side_btns_to_generate: [
                                            'remove_property',
                                            'edit_group_label',
                                            'collapse_group',
                                        ],
                                    });
                                const section_item: i_sections.SectionTemplateItem = {
                                    name: `${s_sections.Template.sanitize_text_for_class({ text: exe_name })}_exe_group_level_3`,
                                    type: 'group',
                                };
                                const input = d_sections.Sections.generate_input({
                                    section_item,
                                    alt_msg: input_name,
                                    val_accessor: input_path,
                                    side_btns,
                                    content_is_visible_val_accessor: is_visible_input_path,
                                    inputs: rnb(get(data, is_visible_input_path))
                                        ? generate_exe_group_level_3_inputs({
                                              exe_name,
                                              key_binding_name: input_name,
                                              key_bindings_item_is_object,
                                          })
                                        : [],
                                });

                                return input;
                            }, 'cnt_4363');

                        const generate_exe_group_level_3_inputs_inner = ({
                            exe_name,
                            key_binding_name,
                            section_item,
                            key_bindings_item_is_object,
                        }: {
                            exe_name: string;
                            key_binding_name: string;
                            section_item: i_sections.SectionTemplateItem;
                            key_bindings_item_is_object: boolean;
                        }): i_inputs.Input =>
                            err(() => {
                                const is_val_type_input: boolean = section_item.name === 'val_type';
                                const val_accessor: string = `${is_val_type_input ? 'ui' : 'settings'}.hotkeys.context_remap.exe.${exe_name}.key_bindings.${key_binding_name}${(section_item.name === 'key' && key_bindings_item_is_object) || section_item.name !== 'key' ? `.${section_item.name}` : ''}`;
                                const input_bindings_item_val = get(
                                    data,
                                    `settings.hotkeys.context_remap.exe.${exe_name}.key_bindings.${key_binding_name}`,
                                );
                                const generate_remove_property_side_btn: boolean =
                                    isObject(input_bindings_item_val);

                                if (is_val_type_input) {
                                    const val_type_initial_val: string =
                                        d_sections.Val.compute_val_type_initial_val({
                                            val_accessor: `settings.hotkeys.context_remap.exe.${exe_name}.key_bindings.${key_binding_name}`,
                                        });

                                    set(data, val_accessor, val_type_initial_val);
                                }

                                const side_btns: i_inputs.SideBtn[] =
                                    d_sections.Sections.generate_side_btns({
                                        side_btns_to_generate:
                                            is_val_type_input || !generate_remove_property_side_btn
                                                ? []
                                                : ['remove_property'],
                                    });

                                const input = d_sections.Sections.generate_input({
                                    section_item,
                                    val_accessor,
                                    side_btns,
                                });

                                return input;
                            }, 'cnt_4363');

                        const generate_exe_group_level_2 = ({
                            exe_name,
                        }: {
                            exe_name: string;
                        }): i_inputs.Inputs =>
                            err(
                                () =>
                                    s_sections.Template.sections.exe.flatMap(
                                        (
                                            section_item: i_sections.SectionTemplateItem,
                                        ): i_inputs.Input[] =>
                                            err(
                                                () =>
                                                    generate_exe_group_level_2_inner({
                                                        exe_name,
                                                        section_item,
                                                    }),
                                                'cnt_4363',
                                            ),
                                    ),
                                'cnt_4256',
                            );

                        const generate_exe_group_level_3 = ({
                            exe_name,
                        }: {
                            exe_name: string;
                        }): i_inputs.Inputs =>
                            err(
                                () =>
                                    n(get(data, `settings.hotkeys.context_remap.exe.${exe_name}`))
                                        ? Object.keys(
                                              data.settings.hotkeys.context_remap.exe[exe_name]
                                                  .key_bindings,
                                          ).map(
                                              (input_name: string): i_inputs.Input =>
                                                  err(
                                                      () =>
                                                          generate_exe_group_level_3_inner({
                                                              exe_name,
                                                              input_name,
                                                          }),
                                                      'cnt_8195',
                                                  ),
                                          )
                                        : [],
                                'cnt_8195',
                            );

                        const generate_exe_group_level_3_inputs = ({
                            exe_name,
                            key_binding_name,
                            key_bindings_item_is_object,
                        }: {
                            exe_name: string;
                            key_binding_name: string;
                            key_bindings_item_is_object: boolean;
                        }): i_inputs.Inputs =>
                            err(() => {
                                const generate_input = ({
                                    section_item,
                                }: {
                                    section_item: i_sections.SectionTemplateItem;
                                }): i_inputs.Input =>
                                    err(
                                        () =>
                                            generate_exe_group_level_3_inputs_inner({
                                                exe_name,
                                                key_binding_name,
                                                section_item,
                                                key_bindings_item_is_object,
                                            }),
                                        'cnt_4356',
                                    );

                                return s_sections.Template[
                                    `custom_binding_name_${key_bindings_item_is_object ? 'object' : 'string'}`
                                ].map(
                                    (
                                        section_item: i_sections.SectionTemplateItem,
                                    ): i_inputs.Input =>
                                        err(() => generate_input({ section_item }), 'cnt_8195'),
                                );
                            }, 'cnt_8195');

                        if (section_name === 'input_bindings') {
                            generated_sections = Object.keys(
                                data.settings.hotkeys.context_remap.input_bindings,
                            ).map(
                                (input_name: string, i: number): JSX.Element =>
                                    err(() => {
                                        const side_btns: i_inputs.SideBtn[] =
                                            d_sections.Sections.generate_side_btns({
                                                side_btns_to_generate: ['remove_property'],
                                            });
                                        const section_item: i_sections.SectionTemplateItem = {
                                            name: input_name,
                                            type: 'text',
                                            val_type: 'string',
                                            placeholder: '^+F2',
                                        };
                                        const input = d_sections.Sections.generate_input({
                                            section_item,
                                            val_accessor: `settings.hotkeys.context_remap.input_bindings.${input_name}`,
                                            side_btns,
                                        });

                                        return (
                                            <c_sections.Input
                                                key={i}
                                                section_item={section_item}
                                                input={input}
                                                i={i}
                                            />
                                        );
                                    }, 'cnt_4363'),
                            );
                        } else if (section_name === 'exe') {
                            generated_sections = Object.keys(
                                data.settings.hotkeys.context_remap.exe,
                            ).map(
                                (exe_name: string, i: number): JSX.Element =>
                                    err(() => {
                                        const exe_path: string = `settings.hotkeys.context_remap.exe.${exe_name}`;
                                        const exe_is_visible_path: string = `settings.ui.window.section_visibility_state.hotkeys.context_remap.exe.${exe_name}.is_visible`;
                                        const side_btns: i_inputs.SideBtn[] =
                                            d_sections.Sections.generate_side_btns({
                                                side_btns_to_generate: [
                                                    'remove_property',
                                                    'edit_group_label',
                                                    'collapse_group',
                                                ],
                                            });
                                        const section_item: i_sections.SectionTemplateItem = {
                                            name: `${s_sections.Template.sanitize_text_for_class({ text: exe_name })}_exe_group_level_1`,
                                            type: 'group',
                                        };

                                        const input = d_sections.Sections.generate_input({
                                            section_item,
                                            alt_msg: exe_name,
                                            val_accessor: exe_path,
                                            side_btns,
                                            content_is_visible_val_accessor: exe_is_visible_path,
                                            inputs: rnb(get(data, exe_is_visible_path))
                                                ? generate_exe_group_level_2({
                                                      exe_name,
                                                  })
                                                : [],
                                        });

                                        return (
                                            <c_sections.Input
                                                key={i}
                                                section_item={section_item}
                                                input={input}
                                                i={i}
                                                val_type_reaction_id={
                                                    d_sections.Val.val_type_reaction_id
                                                }
                                                remove_property_reaction_id={
                                                    d_sections.Val.remove_property_reaction_id
                                                }
                                                edit_group_label_reaction_id={
                                                    d_sections.Val.edit_group_label_reaction_id
                                                }
                                                collapse_group_reaction_id={
                                                    d_sections.Val.collapse_group_reaction_id
                                                }
                                            />
                                        );
                                    }, 'cnt_4363'),
                            );
                        } else if (
                            ['features', 'layouts', 'hotkeys'].includes(
                                data.settings.prefs.current_section,
                            )
                        ) {
                            generated_sections = s_sections.Template.sections[section_name].map(
                                (
                                    section_item: i_sections.SectionTemplateItem,
                                    i: number,
                                ): JSX.Element =>
                                    err(() => {
                                        const input = d_sections.Sections.generate_input({
                                            section_item,
                                            val_accessor: `settings.${section_name}.${section_item.name}`,
                                        });

                                        return (
                                            <c_sections.Input
                                                key={i}
                                                section_item={section_item}
                                                input={input}
                                                i={i}
                                            />
                                        );
                                    }, 'cnt_4363'),
                            );
                        }
                    }
                }, 'cnt_4363'),
            );

            return generated_sections;
        }, 'cnt_4245');

    const sections: JSX.Element[] | undefined = generate_sections();

    return (
        <div className='section'>
            <div className='inputs'>{sections}</div>
        </div>
    );
});
