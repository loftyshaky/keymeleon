import { i_inputs } from '@loftyshaky/shared-app/inputs';
import { i_sections } from 'settings/internal';

export interface Input {
    section_item: i_sections.SectionTemplateItem;
    input: i_inputs.Input;
    i: number;
}
