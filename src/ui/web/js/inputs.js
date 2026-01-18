import * as x from './x.js';

export const create_section_btn = ({ name }) => {
    const el = x.create(
        'button',
        `btn ${name} ${name === 'hotkeys' ? 'current' : ''}`
    );
    el.textContent = x.convert_cls_to_label({ cls: name });

    x.append(s('.section_btns'), el);
};

export const create_checkbox = ({
    name,
    parent_section,
    config_val_accessor,
}) => {
    const value = x.get_nested_val(config_val_accessor, config);

    const input_item = x.create('div', `input_item checkbox ${name}`);
    x.append(parent_section, input_item);

    const checkbox = x.create('input', '');
    checkbox.type = 'checkbox';
    checkbox.id = name;
    checkbox.name = name;
    checkbox.checked = value;
    x.append(input_item, checkbox);

    const label = x.create('label', 'input_label');
    label.for = name;
    label.textContent = x.convert_cls_to_label({ cls: name });
    x.append(input_item, label);
};
