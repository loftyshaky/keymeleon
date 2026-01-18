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
    { name: 'layouts' },
    { name: 'hotkeys', subsections: ['general', 'context_key_remapping'] },
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
                    name: subsection,
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
        }
    });
};
