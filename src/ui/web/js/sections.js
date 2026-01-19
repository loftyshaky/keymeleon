import * as x from './x.js';
import * as inputs from './inputs.js';
import * as headers from './headers.js';

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
                name: 'context_key_remapping',
                inputs: [],
            },
        ],
    },
    { name: 'audio' },
    { name: 'links' },
];

export const create_sections = () => {
    sections.forEach((section) => {
        inputs.create_section_btn({ name: section.name });

        const section_el = x.create('div', `section ${section.name}`);
        section_el.dataset.name = section.name;
        x.append(s('.sections'), section_el);

        if (n(section.subsections)) {
            section.subsections.forEach((subsection) => {
                headers.create_subsection_header({
                    name: subsection.name,
                    parent: section_el,
                });
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
                }
            });
        }
    });
};
