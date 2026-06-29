import get from 'lodash/get';
import isObject from 'lodash/isObject';
import { observer } from 'mobx-react-lite';
import React, { type JSX, useEffect } from 'react';

import type { i_inputs, o_inputs } from '@loftyshaky/shared-app/inputs';
import { c_inputs, d_inputs } from '@loftyshaky/shared-app/inputs';
import { d_offers } from '@loftyshaky/shared-app/shared';
import type { i_sections } from 'settings/internal';
import { c_sections, d_sections, s_sections } from 'settings/internal';
import { d_settings } from 'shared/internal';

export const Section: React.FunctionComponent = observer(() => {
    const { locale } = data.settings.prefs;

    useEffect(() => {
        void d_inputs.InputWidth.calculate({
            set_all_inputs_to_msg_input_min_width_css: true,
        });
    }, [locale]);

    const generate_sections = () =>
        err(() => {
            const generate_add_new_setting_input = ({
                name_prefix,
                val_accessor,
            }: {
                name_prefix: string;
                val_accessor: string;
            }): JSX.Element =>
                err(() => {
                    const add_new_setting_section_item: i_sections.SectionTemplateItem =
                        s_sections.Template.generate_add_new_setting_input_section_item({
                            name_prefix,
                        });
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

            const genearate_input_bindings_input = ({
                input_name,
                i,
            }: {
                input_name: string;
                i: number;
            }): JSX.Element =>
                err(() => {
                    const group_section_item: i_sections.SectionTemplateItem =
                        s_sections.Template.generate_input_bindings_group_section_item({
                            input_name,
                        });
                    const input: i_inputs.InputAndLink =
                        d_sections.Sections.generate_input_bindings_input({
                            input_name,
                            group_section_item,
                        });

                    return (
                        <c_sections.Input
                            key={i}
                            section_item={group_section_item}
                            input={input}
                            remove_property_reaction_id={d_sections.Val.remove_property_reaction_id}
                            edit_group_label_reaction_id={
                                d_sections.Val.edit_group_label_reaction_id
                            }
                        />
                    );
                }, 'cnt_3246');

            const genearate_exe_input = ({
                section_name,
                exe_name,
                i,
            }: {
                section_name: string;
                exe_name: string;
                i: number;
            }): JSX.Element =>
                err(() => {
                    const section_item: i_sections.SectionTemplateItem =
                        s_sections.Template.generate_exe_group_section_item({ exe_name });
                    const input: i_inputs.InputAndLink = d_sections.Sections.generate_exe_input({
                        section_name,
                        exe_name,
                        section_item,
                    });

                    return (
                        <c_sections.Input
                            key={i}
                            section_item={section_item}
                            input={input}
                            val_type_reaction_id={d_sections.Val.val_type_reaction_id}
                            remove_property_reaction_id={d_sections.Val.remove_property_reaction_id}
                            edit_group_label_reaction_id={
                                d_sections.Val.edit_group_label_reaction_id
                            }
                            collapse_group_reaction_id={d_sections.Val.collapse_group_reaction_id}
                        />
                    );
                }, 'cnt_3246');

            const genearate_static_section_input = ({
                section_name,
                section_item,
                i,
            }: {
                section_name: string;
                section_item: i_sections.SectionTemplateItem;
                i: number;
            }): JSX.Element[] =>
                err(() => {
                    if (
                        s_sections.Sections.create_static_inputs_cond({
                            section_item,
                            found_offers_for_current_locale,
                        })
                    ) {
                        const input: i_inputs.InputAndLink =
                            d_sections.Sections.generate_static_section_input({
                                section_name,
                                section_item,
                            });

                        return [
                            <c_sections.Input key={i} section_item={section_item} input={input} />,
                        ];
                    }

                    return [];
                }, 'cnt_3246');

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
                    const section_item: i_sections.SectionTemplateItem =
                        s_sections.Template.generate_audio_section_item({
                            input_label,
                            placeholder,
                        });
                    const input: i_inputs.InputAndLink = d_sections.Sections.generate_audio_input({
                        object_name,
                        key_name,
                        section_item,
                    });

                    return (
                        <c_sections.Input
                            key={`${object_name}_${key_name}_${i}`}
                            section_item={section_item}
                            input={input}
                        />
                    );
                }, 'cnt_7238');

            const all_layouts_ordered: string[] = get(
                d_settings.Settings.data_raw,
                'settings.layouts.all_layouts_ordered',
            );

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
                                        input_label: app.msg(
                                            `${object_name}_${section_item.name === '0' ? 'off' : 'on'}_label_text`,
                                        ),
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
                        s_sections.Template.language_audio.forEach((object_name: string): void =>
                            err(() => {
                                if (isObject(all_layouts_ordered)) {
                                    all_layouts_ordered.forEach(
                                        (layout_name: string, i: number): void =>
                                            err(() => {
                                                language_audio_inputs.push(
                                                    generate_audio_input({
                                                        i,
                                                        object_name,
                                                        key_name: layout_name,
                                                        input_label: `${app.msg(`${object_name}_label_text`)}_${layout_name}`,
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

            let generated_sections: JSX.Element[] | undefined;
            const found_offers_for_current_locale =
                d_offers.Offers.found_offers_for_current_locale();
            const language_audio_inputs: JSX.Element[] = [];

            Object.keys(s_sections.Template.ensure_sections()).forEach(
                (section_name: string): void =>
                    err(() => {
                        if (section_name === data.settings.prefs.current_section) {
                            if (section_name === 'input_bindings') {
                                generated_sections = Object.keys(
                                    data.settings.hotkeys.context_remap.input_bindings,
                                ).map(
                                    (input_name: string, i: number): JSX.Element =>
                                        err(
                                            () =>
                                                genearate_input_bindings_input({
                                                    input_name,
                                                    i,
                                                }),
                                            'cnt_4363',
                                        ),
                                );

                                generated_sections.push(
                                    generate_add_new_setting_input({
                                        name_prefix: 'input_bindings',
                                        val_accessor:
                                            'settings.hotkeys.context_remap.input_bindings',
                                    }),
                                );
                            } else if (section_name === 'exe') {
                                generated_sections = Object.keys(
                                    data.settings.hotkeys.context_remap.exe,
                                ).map(
                                    (exe_name: string, i: number): JSX.Element =>
                                        err(
                                            () =>
                                                genearate_exe_input({
                                                    section_name,
                                                    exe_name,
                                                    i,
                                                }),
                                            'cnt_4363',
                                        ),
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
                                              err(
                                                  () =>
                                                      genearate_static_section_input({
                                                          section_name,
                                                          section_item,
                                                          i,
                                                      }),
                                                  'cnt_4363',
                                              ),
                                      )
                                    : [];

                                if (data.settings.prefs.current_section === 'audio') {
                                    const feature_state_inputs: JSX.Element[] =
                                        genearate_feature_state_inputs();

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

    const sections: JSX.Element[] | undefined = generate_sections();
    const section: o_inputs.Section = d_sections.Sections.create_current_section();

    return (
        <div className={x.cls(['section', data.settings.prefs.current_section])}>
            {d_sections.Sections.include_section_help ? undefined : (
                <div className='section_help'>
                    {section.include_help ? (
                        <c_inputs.HelpBtn section_or_input={section} />
                    ) : undefined}
                    {section.include_help ? (
                        <c_inputs.Help section_or_input={section} />
                    ) : undefined}
                </div>
            )}
            <div className='inputs'>{sections}</div>
        </div>
    );
});
