import { x } from './internal.js';

export const create_subsection = ({
    name,
    cls,
    parent,
    convert_cls_to_label,
}) => {
    const subsection_el = x.create('div', `${cls}`);
    const header_el = x.create('h1', `header`);

    subsection_el.dataset.name = name;
    header_el.textContent = convert_cls_to_label
        ? x.convert_cls_to_label(name)
        : name;

    x.append(subsection_el, header_el);
    x.append(parent, subsection_el);
};
