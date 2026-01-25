import * as x from './x.js';

export const create_subsection = ({
    name,
    cls,
    parent,
    name_spaces_replaced_with_underscore = undefined,
}) => {
    const name_final = name_spaces_replaced_with_underscore
        ? name_spaces_replaced_with_underscore
        : name;
    const subsection_el = x.create('div', `${cls} ${name_final}`);
    const header_el = x.create('h1', `${name_final}`);
    header_el.textContent = x.convert_cls_to_label(name);

    x.append(subsection_el, header_el);
    x.append(parent, subsection_el);
};
