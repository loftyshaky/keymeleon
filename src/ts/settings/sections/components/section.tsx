import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import React from 'react';
import { observer } from 'mobx-react';

import { c_inputs, o_inputs, i_inputs } from '@loftyshaky/shared-app/inputs';
import { s_sections, i_sections } from 'settings/internal';

export const Section: React.FunctionComponent = observer(() => {
    let sections: JSX.Element[] | undefined;

    const input_jsx = ({
        section_item,
        input,
        i,
    }: {
        section_item: i_sections.SectionTemplateItem;
        input: i_inputs.Input;
        i: number;
    }): JSX.Element =>
        err(() => {
            if (section_item.type === 'group') {
                return <c_inputs.Group key={i} input={input as o_inputs.Group} />;
            }

            if (section_item.type === 'checkbox') {
                return (
                    <c_inputs.Checkbox key={i} input={input as o_inputs.Checkbox} calculate_width />
                );
            }

            return (
                <c_inputs.Text
                    key={i}
                    input={input as o_inputs.Text}
                    include_label
                    calculate_width
                />
            );
        }, 'cnt_4363');

    Object.keys(s_sections.Template.sections).forEach((section_name: string): void =>
        err(() => {
            if (section_name === data.settings.prefs.current_section) {
                const generate_exe_group_level_2 = ({
                    exe_name,
                }: {
                    exe_name: string;
                }): i_inputs.Inputs =>
                    err(
                        () =>
                            s_sections.Template.sections.exe.flatMap(
                                // exe_group_level_2: key_bindings
                                (section_item: i_sections.SectionTemplateItem): i_inputs.Input[] =>
                                    err(() => {
                                        const key_bindings_path = `settings.hotkeys.context_remap.exe.${exe_name}.key_bindings`;
                                        const key_bindings_is_visible_path: string = `settings.ui.window.section_visibility_state.hotkeys.context_remap.exe.${exe_name}.key_bindings.is_visible`;

                                        if (
                                            section_item.name === 'key_bindings' &&
                                            !isEmpty(get(data, key_bindings_path))
                                        ) {
                                            const side_btns: i_inputs.SideBtn[] =
                                                s_sections.Template.generate_side_btns({
                                                    side_btns_to_generate: [
                                                        'remove_property',
                                                        'collapse_group',
                                                    ],
                                                });
                                            const section_item_2: i_sections.SectionTemplateItem = {
                                                name: `${section_item.name}_exe_group_level_2`,
                                                type: 'group',
                                            };

                                            const input = s_sections.Template.generate_input({
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
                                                s_sections.Template.generate_side_btns({
                                                    side_btns_to_generate: ['remove_property'],
                                                });

                                            const input = s_sections.Template.generate_input({
                                                section_item,
                                                val_accessor: `settings.hotkeys.context_remap.${section_name}.${exe_name}.${section_item.name}`,
                                                side_btns,
                                            });

                                            return [input];
                                        }

                                        return [];
                                    }, 'cnt_4363'),
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
                                      // exe_group_level_1: button_1, button_2 etc.
                                      (input_name: string): i_inputs.Input =>
                                          err(() => {
                                              const input_path: string = `settings.hotkeys.context_remap.exe.${exe_name}.key_bindings.${input_name}`;
                                              const is_visible_input_path: string = `settings.ui.window.section_visibility_state.hotkeys.context_remap.exe.${exe_name}.key_bindings.${input_name}.is_visible`;
                                              const side_btns: i_inputs.SideBtn[] =
                                                  s_sections.Template.generate_side_btns({
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
                                              const input = s_sections.Template.generate_input({
                                                  section_item,
                                                  alt_msg: input_name,
                                                  val_accessor: input_path,
                                                  side_btns,
                                                  content_is_visible_val_accessor:
                                                      is_visible_input_path,
                                                  inputs: rnb(get(data, is_visible_input_path))
                                                      ? generate_exe_group_level_3_inputs({
                                                            exe_name,
                                                            key_binding_name: input_name,
                                                        })
                                                      : [],
                                              });

                                              return input;
                                          }, 'cnt_8195'),
                                  )
                                : [],
                        'cnt_8195',
                    );

                const generate_exe_group_level_3_inputs = ({
                    exe_name,
                    key_binding_name,
                }: {
                    exe_name: string;
                    key_binding_name: string;
                }): i_inputs.Inputs =>
                    err(
                        () =>
                            s_sections.Template.custom_binding_name.map(
                                (section_item: i_sections.SectionTemplateItem): i_inputs.Input =>
                                    err(() => {
                                        const side_btns: i_inputs.SideBtn[] =
                                            s_sections.Template.generate_side_btns({
                                                side_btns_to_generate: ['remove_property'],
                                            });

                                        const input = s_sections.Template.generate_input({
                                            section_item,
                                            val_accessor: `settings.hotkeys.context_remap.exe.${exe_name}.key_bindings.${key_binding_name}.${section_item.name}`,
                                            side_btns,
                                        });

                                        return input;
                                    }, 'cnt_8195'),
                            ),
                        'cnt_8195',
                    );

                if (section_name === 'input_bindings') {
                    sections = Object.keys(data.settings.hotkeys.context_remap.input_bindings).map(
                        (input_name: string, i: number): JSX.Element =>
                            err(() => {
                                const side_btns: i_inputs.SideBtn[] =
                                    s_sections.Template.generate_side_btns({
                                        side_btns_to_generate: ['remove_property'],
                                    });
                                const section_item: i_sections.SectionTemplateItem = {
                                    name: input_name,
                                    type: 'text',
                                    val_type: 'string',
                                    placeholder: '^+F2',
                                };
                                const input = s_sections.Template.generate_input({
                                    section_item,
                                    val_accessor: `settings.hotkeys.context_remap.input_bindings.${input_name}`,
                                    side_btns,
                                });

                                return input_jsx({ section_item, input, i });
                            }, 'cnt_4363'),
                    );
                } else if (section_name === 'exe') {
                    sections = Object.keys(data.settings.hotkeys.context_remap.exe).map(
                        // exe_group_level_1: default, Fallout4 etc.
                        (exe_name: string, i: number): JSX.Element =>
                            err(() => {
                                const exe_path: string = `settings.hotkeys.context_remap.exe.${exe_name}`;
                                const exe_is_visible_path: string = `settings.ui.window.section_visibility_state.hotkeys.context_remap.exe.${exe_name}.is_visible`;
                                const side_btns: i_inputs.SideBtn[] =
                                    s_sections.Template.generate_side_btns({
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

                                const input = s_sections.Template.generate_input({
                                    section_item,
                                    alt_msg: exe_name,
                                    val_accessor: exe_path,
                                    side_btns,
                                    content_is_visible_val_accessor: exe_is_visible_path,
                                    inputs: rnb(get(data, exe_is_visible_path))
                                        ? generate_exe_group_level_2({ exe_name })
                                        : [],
                                });

                                return input_jsx({ section_item, input, i });
                            }, 'cnt_4363'),
                    );
                } else if (
                    ['features', 'layouts', 'hotkeys'].includes(data.settings.prefs.current_section)
                ) {
                    sections = s_sections.Template.sections[section_name].map(
                        (section_item: i_sections.SectionTemplateItem, i: number): JSX.Element =>
                            err(() => {
                                const input = s_sections.Template.generate_input({
                                    section_item,
                                    val_accessor: `settings.${section_name}.${section_item.name}`,
                                });

                                return input_jsx({ section_item, input, i });
                            }, 'cnt_4363'),
                    );
                }
            }
        }, 'cnt_4363'),
    );

    return (
        <div className='section'>
            <div className='inputs'>{sections}</div>
        </div>
    );
});
