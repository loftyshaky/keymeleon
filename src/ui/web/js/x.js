globalThis.l = console.log.bind(console);

// > undefined/null check
globalThis.n = (val) => val != null; // not nil (nil is undefined or null)

globalThis.nn = (val) => val !== null; // not null
// < undefined/null check

// > selecting elements
globalThis.s = (selector) =>
    shared.ensure_els(document.querySelector(selector));

globalThis.sa = (selector) =>
    shared.ensure_els(document.querySelectorAll(selector));

globalThis.sb = (base_el, selector) => {
    if (n(base_el)) {
        return shared.ensure_els(base_el.querySelector(selector));
    }

    return undefined;
};

globalThis.sab = (base_el, selector) => {
    const els = n(base_el) ? base_el.querySelectorAll(selector) : undefined;

    return shared.ensure_els(els);
};
// > selecting elements

const shared = {
    ensure_els: (els) => {
        if (n(els)) {
            return els;
        }

        return undefined;
    },

    resolve_variable: (variable) => {
        if (typeof variable === 'function') {
            return variable();
        }

        return variable;
    },
};

// > dom manipulation
export const create = (el_type, cls) => {
    const el = document.createElement(el_type);
    el.className = cls;

    return el;
};

export const append = (parent, child) => {
    if (n(parent) && n(child) && [1, 11].includes(parent.nodeType)) {
        parent.appendChild(child);
    }
};
// < dom manipulation

export const convert_cls_to_label = (cls) => {
    const underscores_replaced_with_spaces = cls.replace(/_/g, ' ');
    const first_letter_uppercase =
        underscores_replaced_with_spaces.charAt(0).toUpperCase() +
        underscores_replaced_with_spaces.slice(1);

    return first_letter_uppercase;
};

export const replace_spaces_with_underscore = (text) => {
    return `_${text.replace(/ /g, '_')}`;
};

export const get_nested_val_undefined = (val_accessor, obj) => {
    return n(val_accessor)
        ? val_accessor.reduce((current_obj, key) => current_obj?.[key], obj)
        : undefined;
};

export const get_nested_val = (val_accessor, obj) => {
    const nested_val = n(val_accessor)
        ? get_nested_val_undefined(val_accessor, obj)
        : undefined;

    return n(nested_val) ? nested_val : '';
};
