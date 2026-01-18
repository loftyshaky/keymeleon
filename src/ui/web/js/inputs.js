import * as x from './x.js';

export const create_section_btn = ({ cls, label }) => {
    const el = x.create(
        'button',
        `btn ${cls} ${cls === 'hotkeys' ? 'current' : ''}`
    );
    el.textContent = n(label) ? label : convert_cls_to_label({ cls });

    x.append(s('.sections'), el);
};

const convert_cls_to_label = ({ cls }) => {
    const underscores_replaced_with_spaces = cls.replace('_', ' ');
    const first_letter_uppercase =
        underscores_replaced_with_spaces.charAt(0).toUpperCase() +
        underscores_replaced_with_spaces.slice(1);

    return first_letter_uppercase;
};
