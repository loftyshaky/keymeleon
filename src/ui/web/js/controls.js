import { x, svg, configuration, sections } from './internal.js';

const create_control = ({
    name,
    input_control,
    input_el,
    input_default_val,
    parent,
    config_val_accessor,
    type,
    force_on,
}) => {
    if (input_control.display_in.includes(type)) {
        const control_el = x.create(
            'span',
            `control ${input_control.name} ${input_control.on_and_off({ config_val_accessor, force_on })}`,
        );
        control_el.dataset.name = name;
        control_el.innerHTML = svg[input_control.svg_name];
        control_el.dataset.config_val_accessor = config_val_accessor;

        x.append(parent, control_el);

        control_el.addEventListener('click', () =>
            input_control.on_click({
                input_el,
                input_default_val,
                el: control_el,
                config_val_accessor,
            }),
        );

        return control_el;
    }
};

export const create_header_controls = ({
    name,
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
            on_click: activate_input_control,
        },
        {
            name: 'change_section_visibility',
            svg_name: 'keyboard_arrow_down',
            display_in: [
                'context_remap',
                'input_bindings',
                'exe',
                'app_exe_name',
                'key_bindings',
                'custom_binding_name',
            ],
            on_and_off: remove_property_control_on_and_off,
            on_click: activate_header_control,
        },
    ].forEach((input_control) => {
        const input_control_el = create_control({
            name,
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
    name,
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
            on_click: activate_input_control,
        },
    ].forEach((input_control) => {
        const input_control_el = create_control({
            name,
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

    return val !== '' || force_on ? '' : 'off';
};

const activate_input_control = ({ input_el, input_default_val, el }) => {
    const is_input_bindings_section =
        el.dataset.config_val_accessor.includes('input_bindings,');

    x.add_cls(el, 'off');

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

export const activate_header_control = ({ config_val_accessor }) => {
    const join_config_val_accessor = ({ config_val_accessor }) =>
        config_val_accessor.join(',');

    const section_selector = `.subsection[data-config_val_accessor="${join_config_val_accessor({ config_val_accessor })}"] > *:not(.header_w), .inner_subsection[data-config_val_accessor="${join_config_val_accessor({ config_val_accessor })}"] > *:not(.header_w)`;
    const control_selector = `.subsection[data-config_val_accessor="${join_config_val_accessor({ config_val_accessor })}"] > .header_w .control.change_section_visibility, .inner_subsection[data-config_val_accessor="${join_config_val_accessor({ config_val_accessor })}"] > .header_w .control.change_section_visibility`;
    const is_visible_config_val_accessor = [
        ...['ui', 'window', 'section_visibility_state'],
        ...config_val_accessor,
        'is_visible',
    ];
    const is_visible = configuration.get_config_val({
        val_accessor: is_visible_config_val_accessor,
    });

    if (sections.first_run) {
        if (!is_visible) {
            // is collapsed
            x.dynamic_css(
                document.head,
                config_val_accessor.join('_'),
                `${section_selector}{display:none}${control_selector}{background-color:#f14444}`,
            );
        }
    } else if (is_visible) {
        // 0 collapse
        x.dynamic_css(
            document.head,
            config_val_accessor.join('_'),
            `${section_selector}{display:none}${control_selector}{background-color:#f14444}`,
        );

        configuration.write_change({
            val_setter: is_visible_config_val_accessor,
            val: false,
        });
    } else {
        // 1 expand
        x.remove(sa(`style[data-name="${config_val_accessor.join('_')}"]`));

        configuration.write_change({
            val_setter: is_visible_config_val_accessor,
            val: true,
        });
    }
};
