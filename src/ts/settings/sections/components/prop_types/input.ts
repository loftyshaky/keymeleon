import { i_inputs } from '@loftyshaky/shared-app/inputs';
import { i_sections } from 'settings/internal';

export interface Input {
    section_item: i_sections.SectionTemplateItem;
    input: i_inputs.Input;
    i: number;
    val_type_reaction_id?: string;
    remove_property_reaction_id?: string;
    edit_group_label_reaction_id?: string;
    collapse_group_reaction_id?: string;
}
