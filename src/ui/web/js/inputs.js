import { x } from './internal.js';

export const create_section_btn = ({ name }) => {
    const el = x.create(
        'button',
        `btn ${name} ${name === 'hotkeys' ? 'current' : ''}`
    );
    el.textContent = x.convert_cls_to_label(name);

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

    create_label({ name, input_item });
};

export const create_text_input = ({
    name,
    parent_section,
    config_val_accessor,
    subtype,
    placeholder,
    val,
    convert_cls_to_label,
}) => {
    const value = n(val) ? val : x.get_nested_val(config_val_accessor, config);

    const input_item = x.create('div', `input_item ${subtype} ${name}`);
    x.append(parent_section, input_item);

    create_label({ name, input_item, convert_cls_to_label });

    const text_input = x.create('input', '');
    text_input.type = subtype;
    text_input.id = name;
    text_input.name = name;
    text_input.value = value;
    text_input.placeholder = placeholder;
    text_input.autocomplete = 'off';
    text_input.spellcheck = false;
    x.append(input_item, text_input);
};

export const create_label = ({
    name,
    input_item,
    convert_cls_to_label = true,
}) => {
    const label = x.create('label', 'input_label');
    label.setAttribute('for', name);
    label.textContent = convert_cls_to_label
        ? x.convert_cls_to_label(name)
        : name;
    x.append(input_item, label);
};
