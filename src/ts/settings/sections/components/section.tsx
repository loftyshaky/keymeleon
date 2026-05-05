import get from 'lodash/get';
import set from 'lodash/set';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { d_offers } from '@loftyshaky/shared-app/shared';
import { i_inputs } from '@loftyshaky/shared-app/inputs';
import { d_settings } from 'shared/internal';
import { c_sections, d_sections, s_sections, i_sections } from 'settings/internal';

export const Section: React.FunctionComponent = observer(() => {
    useEffect(() => {
        (async () => {
            await d_sections.InputWidth.calculate();
        })();
    });

    const generate_sections = () =>
        err(() => {
            let generated_sections: JSX.Element[] | undefined;
            const found_offers_for_current_locale =
                d_offers.Offers.found_offers_for_current_locale();

            Object.keys(
                n(s_sections.Template.sections) ? s_sections.Template.sections : {},
            ).forEach((section_name: string): void =>
                err(() => {
                    if (section_name === data.settings.prefs.current_section) {
                        const generate_exe_group_level_2_inner = ({
                            exe_name,
                            section_item,
                        }: {
                            exe_name: string;
                            section_item: i_sections.SectionTemplateItem;
                        }): i_inputs.InputAndLink[] =>
                            err(() => {
                                const key_bindings_path = `settings.hotkeys.context_remap.exe.${exe_name}.key_bindings`;
                                const key_bindings_is_visible_path: string = `settings.ui.window.section_visibility_state.hotkeys.context_remap.exe.${exe_name}.key_bindings.is_visible`;

                                if (
                                    section_item.name === 'key_bindings' &&
                                    isObject(get(data, key_bindings_path))
                                ) {
                                    const side_btns: i_inputs.SideBtn[] =
                                        d_sections.Sections.generate_side_btns({
                                            side_btns_to_generate: [
                                                'remove_property',
                                                'collapse_group',
                                            ],
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

                        const generate_exe_group_level_3_inner = ({
                            exe_name,
                            input_name,
                        }: {
                            exe_name: string;
                            input_name: string;
                        }): i_inputs.InputAndLink =>
                            err(() => {
                                const input_path: string = `settings.hotkeys.context_remap.exe.${exe_name}.key_bindings.${input_name}`;
                                const is_visible_input_path: string = `settings.ui.window.section_visibility_state.hotkeys.context_remap.exe.${exe_name}.key_bindings.${input_name}.is_visible`;
                                const key_bindings_item = get(
                                    d_settings.Settings.data_raw,
                                    input_path,
                                );

                                const key_bindings_item_type: i_sections.KeyBindingsItemType =
                                    d_sections.Val.compute_val_type_initial_val({
                                        key_bindings_item,
                                    });

                                const section_item: i_sections.SectionTemplateItem = {
                                    name: `${s_sections.Template.sanitize_text_for_class({ text: exe_name })}_exe_group_level_3`,
                                    type: 'group',
                                };
                                const side_btns: i_inputs.SideBtn[] =
                                    d_sections.Sections.generate_side_btns({
                                        side_btns_to_generate: [
                                            'remove_property',
                                            'edit_group_label',
                                            'collapse_group',
                                        ],
                                        val_type: section_item.val_type,
                                    });
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
                                              key_bindings_item_type,
                                          })
                                        : [],
                                });

                                return input;
                            }, 'cnt_4363');

                        const generate_exe_group_level_3_inputs_inner = ({
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
                                    ((isObject(input_bindings_item_val) &&
                                        !isArray(input_bindings_item_val)) ||
                                        !isArray(input_bindings_item_val));

                                if (is_val_type_input) {
                                    const val_type_initial_val: i_sections.KeyBindingsItemType =
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
                                        val_type: section_item.val_type,
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
                        }): i_inputs.InputsAndLinks =>
                            err(() => {
                                const inputs: i_inputs.InputsAndLinks = n(
                                    s_sections.Template.sections,
                                )
                                    ? s_sections.Template.sections.exe.flatMap(
                                          (
                                              section_item: i_sections.SectionTemplateItem,
                                          ): i_inputs.InputAndLink[] =>
                                              err(
                                                  () =>
                                                      generate_exe_group_level_2_inner({
                                                          exe_name,
                                                          section_item,
                                                      }),
                                                  'cnt_4363',
                                              ),
                                      )
                                    : [];
                                const key_bindings_input_is_present: boolean = inputs.some(
                                    (input: i_inputs.InputAndLink): boolean =>
                                        err(
                                            () => input.name === 'key_bindings_exe_group_level_2',
                                            'cnt_5437',
                                        ),
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
                        const generate_exe_group_level_3 = ({
                            exe_name,
                        }: {
                            exe_name: string;
                        }): i_inputs.InputsAndLinks =>
                            err(() => {
                                const inputs: i_inputs.InputsAndLinks = n(
                                    get(data, `settings.hotkeys.context_remap.exe.${exe_name}`),
                                )
                                    ? Object.keys(
                                          data.settings.hotkeys.context_remap.exe[exe_name]
                                              .key_bindings,
                                      ).map(
                                          (input_name: string): i_inputs.InputAndLink =>
                                              err(
                                                  () =>
                                                      generate_exe_group_level_3_inner({
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

                        const generate_exe_group_level_3_inputs = ({
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
                                            generate_exe_group_level_3_inputs_inner({
                                                exe_name,
                                                key_binding_name,
                                                section_item,
                                                key_bindings_item_type,
                                            }),
                                        'cnt_4356',
                                    );

                                return s_sections.Template[
                                    `custom_binding_name_${key_bindings_item_type}`
                                ].map(
                                    (
                                        section_item: i_sections.SectionTemplateItem,
                                    ): i_inputs.InputAndLink =>
                                        err(() => generate_input({ section_item }), 'cnt_8195'),
                                );
                            }, 'cnt_8195');

                        if (section_name === 'input_bindings') {
                            generated_sections = Object.keys(
                                data.settings.hotkeys.context_remap.input_bindings,
                            ).map(
                                (input_name: string, i: number): JSX.Element =>
                                    err(() => {
                                        const section_item: i_sections.SectionTemplateItem = {
                                            name: `${input_name}`,
                                            type: 'text',
                                            val_type: 'string',
                                            placeholder: '^+F2',
                                            input_errors: ['invalid_ahk_hotkey'],
                                        };
                                        const group_side_btns: i_inputs.SideBtn[] =
                                            d_sections.Sections.generate_side_btns({
                                                side_btns_to_generate: [
                                                    'remove_property',
                                                    'edit_group_label',
                                                ],
                                                val_type: section_item.val_type,
                                            });
                                        const group_section_item: i_sections.SectionTemplateItem = {
                                            name: input_name,
                                            type: 'group',
                                        };
                                        const input = d_sections.Sections.generate_input({
                                            section_item: group_section_item,
                                            alt_msg: input_name,
                                            content_is_visible_default: true,
                                            val_accessor: `settings.hotkeys.context_remap.input_bindings.${input_name}`,
                                            side_btns: group_side_btns,
                                            inputs: [
                                                d_sections.Sections.generate_input({
                                                    section_item,
                                                    val_accessor: `settings.hotkeys.context_remap.input_bindings.${input_name}`,
                                                    label_is_visible: false,
                                                }),
                                            ],
                                        });

                                        return (
                                            <c_sections.Input
                                                key={i}
                                                section_item={group_section_item}
                                                input={input}
                                                remove_property_reaction_id={
                                                    d_sections.Val.remove_property_reaction_id
                                                }
                                                edit_group_label_reaction_id={
                                                    d_sections.Val.edit_group_label_reaction_id
                                                }
                                            />
                                        );
                                    }, 'cnt_4363'),
                            );

                            generated_sections.push(
                                generate_add_new_setting_input({
                                    name_prefix: 'input_bindings',
                                    val_accessor: 'settings.hotkeys.context_remap.input_bindings',
                                }),
                            );
                        } else if (section_name === 'exe') {
                            generated_sections = Object.keys(
                                data.settings.hotkeys.context_remap.exe,
                            ).map(
                                (exe_name: string, i: number): JSX.Element =>
                                    err(() => {
                                        const exe_path: string = `settings.hotkeys.context_remap.exe.${exe_name}`;
                                        const exe_is_visible_path: string = `settings.ui.window.section_visibility_state.hotkeys.context_remap.exe.${exe_name}.is_visible`;
                                        const section_item: i_sections.SectionTemplateItem = {
                                            name: `${s_sections.Template.sanitize_text_for_class({ text: exe_name })}_exe_group_level_1`,
                                            type: 'group',
                                        };
                                        const side_btns: i_inputs.SideBtn[] =
                                            d_sections.Sections.generate_side_btns({
                                                side_btns_to_generate: [
                                                    'remove_property',
                                                    'edit_group_label',
                                                    'collapse_group',
                                                ],
                                                val_type: section_item.val_type,
                                            });
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

                            generated_sections.push(
                                generate_add_new_setting_input({
                                    name_prefix: 'exe',
                                    val_accessor: 'settings.hotkeys.context_remap.exe',
                                }),
                            );
                        } else if (
                            s_sections.Template.static_sections.includes(
                                data.settings.prefs.current_section,
                            )
                        ) {
                            generated_sections = n(s_sections.Template.sections)
                                ? s_sections.Template.sections[section_name].flatMap(
                                      (
                                          section_item: i_sections.SectionTemplateItem,
                                          i: number,
                                      ): JSX.Element[] =>
                                          err(() => {
                                              if (
                                                  (section_item.name === 'offers_are_visible' &&
                                                      found_offers_for_current_locale) ||
                                                  section_item.name !== 'offers_are_visible'
                                              ) {
                                                  const input = d_sections.Sections.generate_input({
                                                      section_item,
                                                      val_accessor: `settings.${section_name}.${section_item.name}`,
                                                  });

                                                  return [
                                                      <c_sections.Input
                                                          key={i}
                                                          section_item={section_item}
                                                          input={input}
                                                      />,
                                                  ];
                                              }

                                              return [];
                                          }, 'cnt_4363'),
                                  )
                                : [];

                            if (data.settings.prefs.current_section === 'audio') {
                                const all_layouts_ordered: string[] = get(
                                    d_settings.Settings.data_raw,
                                    'settings.layouts.all_layouts_ordered',
                                );

                                const generate_audio_input = ({
                                    i,
                                    object_name,
                                    key_name,
                                    input_label,
                                    placeholder,
                                }: {
                                    i: number;
                                    object_name: string;
                                    key_name: string;
                                    input_label: string;
                                    placeholder: string;
                                }): JSX.Element =>
                                    err(() => {
                                        const section_item: i_sections.SectionTemplateItem = {
                                            name: input_label,
                                            type: 'text',
                                            val_type: 'string',
                                            placeholder,
                                            input_errors: ['invalid_filename'],
                                        };

                                        const input = d_sections.Sections.generate_input({
                                            section_item,
                                            val_accessor: `settings.audio.${object_name}.${key_name}`,
                                        });

                                        return (
                                            <c_sections.Input
                                                key={`${object_name}_${key_name}_${i}`}
                                                section_item={section_item}
                                                input={input}
                                            />
                                        );
                                    }, 'cnt_7238');

                                const genearate_feature_state_inputs = (): JSX.Element[] =>
                                    err(
                                        () =>
                                            s_sections.Template.feature_state.map(
                                                (
                                                    section_item: i_sections.SectionTemplateItem,
                                                    i: number,
                                                ): JSX.Element =>
                                                    err(() => {
                                                        const object_name = 'feature_state';

                                                        return generate_audio_input({
                                                            i,
                                                            object_name,
                                                            key_name: section_item.name,
                                                            input_label: `${object_name}_${section_item.name === '0' ? 'off' : 'on'}`,
                                                            placeholder: section_item.placeholder
                                                                ? `${section_item.placeholder}.mp3`
                                                                : '',
                                                        });
                                                    }, 'cnt_4363'),
                                            ),
                                        'cnt_4245',
                                    );

                                const generate_language_inputs = (): void =>
                                    err(
                                        () =>
                                            s_sections.Template.language_audio.forEach(
                                                (object_name: string): void =>
                                                    err(() => {
                                                        if (isObject(all_layouts_ordered)) {
                                                            all_layouts_ordered.forEach(
                                                                (
                                                                    layout_name: string,
                                                                    i: number,
                                                                ): void =>
                                                                    err(() => {
                                                                        language_audio_inputs.push(
                                                                            generate_audio_input({
                                                                                i,
                                                                                object_name,
                                                                                key_name:
                                                                                    layout_name,
                                                                                input_label: `${object_name}_${layout_name}`,
                                                                                placeholder: `DVORAK_${object_name}.mp3`,
                                                                            }),
                                                                        );
                                                                    }, 'cnt_9388'),
                                                            );
                                                        }
                                                    }, 'cnt_4363'),
                                            ),
                                        'cnt_4245',
                                    );

                                const feature_state_inputs: JSX.Element[] =
                                    genearate_feature_state_inputs();
                                const language_audio_inputs: JSX.Element[] = [];

                                generate_language_inputs();

                                if (n(generated_sections)) {
                                    generated_sections = [
                                        ...generated_sections,
                                        ...feature_state_inputs,
                                        ...language_audio_inputs,
                                    ];
                                }
                            }
                        }
                    }
                }, 'cnt_4363'),
            );

            return generated_sections;
        }, 'cnt_4245');

    const generate_add_new_setting_input = ({
        name_prefix,
        val_accessor,
    }: {
        name_prefix: string;
        val_accessor: string;
    }): JSX.Element =>
        // Changed return type to JSX.Element
        err(() => {
            const add_new_setting_section_item: i_sections.SectionTemplateItem =
                d_sections.Sections.generate_add_new_setting_input_section_item({ name_prefix });
            const input = d_sections.Sections.generate_add_new_setting_input({
                name_prefix,
                val_accessor,
            });

            return (
                <c_sections.Input
                    key={`${name_prefix}_add_new_setting`}
                    section_item={add_new_setting_section_item}
                    input={input}
                />
            );
        }, 'cnt_5464');

    const sections: JSX.Element[] | undefined = generate_sections();

    return (
        <div className={x.cls(['section', data.settings.prefs.current_section])}>
            <div className='inputs'>{sections}</div>
        </div>
    );
});
