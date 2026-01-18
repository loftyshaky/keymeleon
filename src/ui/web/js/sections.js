import * as inputs from './inputs.js';

const section_names = ['features', 'hotkeys', 'layouts', 'audio', 'links'];

export const create_sections = () => {
    section_names.forEach((section_name) => {
        inputs.create_section_btn({ cls: section_name });
    });
};
