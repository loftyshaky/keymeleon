import { x, svg, configuration, sections } from './internal.js';

const create_control = ({
    input_control,
    input_el,
    input_default_val,
    parent,
    config_val_accessor,
    type,
    force_on,
}) => {
    if (input_control.display_in.includes(type)) {
        const input_control_el = x.create(
            'span',
            `control ${input_control.name} ${input_control.on_and_off({ config_val_accessor, force_on })}`,
        );
        input_control_el.innerHTML = svg[input_control.svg_name];
        input_control_el.dataset.config_val_accessor = config_val_accessor;

        x.append(parent, input_control_el);

        input_control_el.addEventListener('click', () =>
            input_control.on_click({
                input_el,
                input_default_val,
                el: input_control_el,
            }),
        );

        return input_control_el;
    }
};

export const create_header_controls = ({
    parent,
    config_val_accessor,
    type,
}) => {
    const header_control_els = {};
    const header_controls = x.create('span', 'controls');
    x.append(parent, header_controls);

    [
        {
            name: 'remove_property_control',
            svg_name: 'delete_',
            display_in: [
                'context_remap',
                'input_bindings',
                'exe',
                'app_exe_name',
                'key_bindings',
                'custom_binding_name',
            ],
            on_and_off: remove_property_control_on_and_off,
            on_click: activate_control,
        },
    ].forEach((input_control) => {
        const input_control_el = create_control({
            input_control,
            parent: header_controls,
            config_val_accessor,
            type,
            force_on: true,
        });

        header_control_els[input_control.name] = input_control_el;
    });

    return header_control_els;
};

export const create_input_controls = ({
    input_el,
    input_default_val,
    parent,
    config_val_accessor,
    type,
}) => {
    const input_control_els = {};
    const input_controls = x.create('span', 'controls');
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
            on_click: activate_control,
        },
    ].forEach((input_control) => {
        const input_control_el = create_control({
            input_control,
            input_el,
            input_default_val,
            parent: input_controls,
            config_val_accessor,
            type,
            force_on: false,
        });

        input_control_els[input_control.name] = input_control_el;
    });

    return input_control_els;
};

const remove_property_control_on_and_off = ({
    config_val_accessor,
    force_on = false,
}) => {
    const val = configuration.get_config_val({
        val_accessor: config_val_accessor,
    });

    return val !== '' || force_on ? 'on' : 'off';
};

const activate_control = ({ input_el, input_default_val, el }) => {
    const is_input_bindings_section =
        el.dataset.config_val_accessor.includes('input_bindings,');

    x.add_cls(el, 'off');
    x.remove_cls(el, 'on');

    if (input_el) {
        if (x.matches(input_el, '.checkbox')) {
            input_el.checked = input_default_val;
        } else {
            input_el.value = '';
        }
    }

    configuration.remove_val({ el });

    if (!n(input_el) || is_input_bindings_section) {
        sections.create_sections();
    }
};
