import { x, svg, configuration } from './internal.js';

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

    const input_controls_els = create_input_controls({
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
            { el: input_controls_els.remove_property_control },
            e
        )
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

    const input_controls_els = create_input_controls({
        input_el: text_input,
        parent: input_w,
        config_val_accessor,
        type,
    });

    x.append(input_w, text_input);

    text_input.addEventListener('input', (e) =>
        update_text_input_val(
            { el: input_controls_els.remove_property_control },
            e
        )
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

const create_input_controls = ({
    input_el,
    input_default_val,
    parent,
    config_val_accessor,
    type,
}) => {
    const input_controls_els = {};
    const input_controls = x.create('span', 'input_controls');
    x.append(parent, input_controls);

    [
        {
            name: 'remove_property_control',
            svg_name: 'delete_',
            display_in: [
                'specific_exe',
                'input_bindings',
                'custom_binding_name',
            ],
            on_and_off: remove_property_control_on_and_off,
            on_click: remove_config_val,
        },
    ].forEach((input_control) => {
        const input_control_el = create_input_control({
            input_el,
            input_default_val,
            name: input_control.name,
            svg_name: input_control.svg_name,
            display_in: input_control.display_in,
            parent: input_controls,
            config_val_accessor,
            type,
            on_and_off: remove_property_control_on_and_off,
            on_click: remove_config_val,
        });

        input_controls_els[input_control.name] = input_control_el;
    });

    return input_controls_els;
};

const create_input_control = ({
    input_el,
    input_default_val,
    name,
    svg_name,
    display_in,
    parent,
    config_val_accessor,
    type,
    on_and_off,
    on_click,
}) => {
    if (display_in.includes(type)) {
        const input_control = x.create(
            'span',
            `input_control ${name} ${on_and_off({ config_val_accessor })}`
        );
        input_control.innerHTML = svg[svg_name];
        input_control.dataset.config_val_accessor = config_val_accessor;

        x.append(parent, input_control);

        input_control.addEventListener('click', () =>
            on_click({ input_el, input_default_val, el: input_control })
        );

        return input_control;
    }
};

const remove_property_control_on_and_off = ({ config_val_accessor }) => {
    const val = configuration.get_config_val({
        val_accessor: config_val_accessor,
    });

    return val === '' ? 'off' : 'on';
};

const update_checkbox_val = ({ el }, e) => {
    configuration.update_checkbox_val(e);

    add_config_val({ el });
};

const update_text_input_val = ({ el }, e) => {
    configuration.update_text_input_val(e);

    add_config_val({ el });
};

const remove_config_val = ({ input_el, input_default_val, el }) => {
    x.add_cls(el, 'off');
    x.remove_cls(el, 'on');

    if (x.matches(input_el, '.checkbox')) {
        input_el.checked = input_default_val;
    } else {
        input_el.value = '';
    }

    configuration.remove_val({ el });
};

const add_config_val = ({ el }) => {
    if (el) {
        x.remove_cls(el, 'off');
        x.add_cls(el, 'on');
    }
};
