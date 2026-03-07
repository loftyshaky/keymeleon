import { i_settings } from 'shared/internal';

export interface SectionTemplateItem {
    name: string;
    type?: 'checkbox' | 'text' | 'number' | 'select' | 'group';
    default_val?: boolean | string;
    val_type?: i_settings.ValType;
    placeholder?: string;
}
