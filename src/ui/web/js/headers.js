import { x, configuration, controls } from './internal.js';

export const create_header = ({
    name,
    type,
    cls,
    parent,
    config_val_accessor,
    convert_cls_to_label,
}) => {
    const subsection = configuration.get_config_val({
        val_accessor: config_val_accessor,
    });

    if (subsection !== '' || ['general'].includes(type)) {
        const subsection_el = x.create('div', `${cls}`);
        const header_el = x.create('h1', `header`);
        const input_w = x.create('div', 'header_w');

        subsection_el.dataset.name = name;
        header_el.textContent = convert_cls_to_label
            ? x.convert_cls_to_label(name)
            : name;

        controls.create_header_controls({
            parent: input_w,
            config_val_accessor,
            type,
        });

        x.append(subsection_el, input_w);
        x.append(input_w, header_el);
        x.append(parent, subsection_el);
    }
};
