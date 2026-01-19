import * as x from './x.js';

export const create_subsection_header = ({ name, label, parent }) => {
    const el = x.create('h1', `subsection ${name}`);
    el.textContent = n(label) ? label : x.convert_cls_to_label({ cls: name });

    x.append(s(`.sections .${parent.dataset.name}`), el);
};
