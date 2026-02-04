import { x, configuration, controls } from './internal.js';

export const create_checkbox = ({
    name,
    default_val,
    type,
    parent_section,
    config_val_accessor,
    val,
}) => {
    const value = n(val)
        ? val
        : configuration.get_config_val({ val_accessor: config_val_accessor });
    const input_item = x.create('div', `input_item checkbox ${name}`);
    x.append(parent_section, input_item);

    const input_w = x.create('div', 'input_w');
    x.append(input_item, input_w);

    const checkbox = x.create('input', 'checkbox');
    checkbox.type = 'checkbox';
    checkbox.id = name;
    checkbox.name = name;
    checkbox.checked = value;
    checkbox.dataset.config_val_accessor = config_val_accessor;

    const input_control_els = controls.create_input_controls({
        input_el: checkbox,
        input_default_val: default_val,
        parent: input_w,
        config_val_accessor,
        type,
    });

    x.append(input_w, checkbox);

    create_label({ name, parent: input_w });

    checkbox.addEventListener('input', (e) =>
        update_checkbox_val(
            { el: input_control_els.remove_property_control },
            e,
        ),
    );
};

export const create_text_input = ({
    name,
    type,
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

    create_label({ name, parent: input_item, convert_cls_to_label });

    const input_w = x.create('div', 'input_w');
    x.append(input_item, input_w);

    const text_input = x.create('input', 'text');
    text_input.type = subtype;
    text_input.id = name;
    text_input.name = name;
    text_input.value = value;
    text_input.placeholder = placeholder;
    text_input.autocomplete = 'off';
    text_input.spellcheck = false;
    text_input.dataset.config_val_accessor = config_val_accessor;
    text_input.dataset.val_type = val_type;

    const input_control_els = controls.create_input_controls({
        input_el: text_input,
        parent: input_w,
        config_val_accessor,
        type,
    });

    x.append(input_w, text_input);

    text_input.addEventListener('input', (e) =>
        update_text_input_val(
            { el: input_control_els.remove_property_control },
            e,
        ),
    );
};

export const create_label = ({ name, parent, convert_cls_to_label = true }) => {
    const label = x.create('label', 'input_label');
    label.setAttribute('for', name);
    label.textContent = convert_cls_to_label
        ? x.convert_cls_to_label(name)
        : name;
    x.append(parent, label);
};

const update_checkbox_val = ({ el }, e) => {
    configuration.update_checkbox_val(e);

    add_config_val({ el });
};

const update_text_input_val = ({ el }, e) => {
    configuration.update_text_input_val(e);

    add_config_val({ el });
};

const add_config_val = ({ el }) => {
    if (el) {
        x.remove_cls(el, 'off');
    }
};
