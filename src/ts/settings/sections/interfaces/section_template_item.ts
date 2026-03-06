export interface SectionTemplateItem {
    name: string;
    type?: 'checkbox' | 'text' | 'number' | 'select' | 'group';
    default_val?: boolean;
    val_type?: string | number | string[];
    placeholder?: string;
}
