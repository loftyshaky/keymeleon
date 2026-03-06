import { i_sections } from 'settings/internal';

export interface Sections {
    [key: string]: any;

    features: i_sections.SectionTemplateItem[];
    layouts: i_sections.SectionTemplateItem[];
    hotkeys: i_sections.SectionTemplateItem[];
    input_bindings: string[];
    exe: i_sections.SectionTemplateItem[];
}
