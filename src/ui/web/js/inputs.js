import { x, configuration } from './internal.js';

export const create_checkbox = ({
    name,
    parent_section,
    config_val_accessor,
    val,
}) => {
    const value = n(val)
        ? val
        : configuration.get_config_val({ val_accessor: config_val_accessor });
    const input_item = x.create('div', `input_item checkbox ${name}`);
    x.append(parent_section, input_item);

    const checkbox = x.create('input', '');
    checkbox.type = 'checkbox';
    checkbox.id = name;
    checkbox.name = name;
    checkbox.checked = value;
    checkbox.dataset.config_val_accessor = config_val_accessor;

    x.append(input_item, checkbox);

    create_label({ name, input_item });

    checkbox.addEventListener('input', configuration.update_checkbox_val);
};

export const create_text_input = ({
    name,
    parent_section,
    config_val_accessor,
    subtype,
    val_type,
    placeholder,
    val,
    convert_cls_to_label,
}) => {
    const value = n(val)
        ? val
        : configuration.get_config_val({ val_accessor: config_val_accessor });

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
    text_input.dataset.config_val_accessor = config_val_accessor;
    text_input.dataset.val_type = val_type;

    x.append(input_item, text_input);

    text_input.addEventListener('input', configuration.update_text_input_val);
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
