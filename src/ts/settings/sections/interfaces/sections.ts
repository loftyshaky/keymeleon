import type { t } from '@loftyshaky/shared-app/shared_clean';
import type { i_sections } from 'settings/internal';

export interface Sections {
    [key: string]: t.Any;

    features: i_sections.SectionTemplateItem[];
    layouts: i_sections.SectionTemplateItem[];
    hotkeys: i_sections.SectionTemplateItem[];
    input_bindings: string[];
    exe: i_sections.SectionTemplateItem[];
}
