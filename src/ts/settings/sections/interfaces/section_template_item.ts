import { i_settings } from 'shared/internal';

export interface SectionTemplateItem {
    name: string;
    type?: 'checkbox' | 'text' | 'textarea' | 'number' | 'select' | 'icon_btn' | 'group';
    default_val?: boolean | string;
    val_type?: i_settings.ValType;
    placeholder?: string;
    developer_mode_setting?: boolean;
}
