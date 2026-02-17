export interface SectionTemplateItem {
    name: string;
    type?: 'checkbox' | 'text' | 'number' | 'select';
    default_val?: boolean;
    val_type?: string | number | string[];
    placeholder?: string;
}
