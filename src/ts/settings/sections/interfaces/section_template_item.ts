import type { i_settings } from 'shared/internal';

export interface SectionTemplateItem {
    name: string;
    type?:
        | 'checkbox'
        | 'text'
        | 'textarea'
        | 'number'
        | 'select'
        | 'icon_btn'
        | 'link_btn'
        | 'group'
        | 'link';
    default_val?: boolean | string;
    val_type?: i_settings.ValType;
    placeholder?: string;
    include_help?: boolean;
    developer_mode_setting?: boolean;
    href?: string;
    input_errors?: string[];
}
