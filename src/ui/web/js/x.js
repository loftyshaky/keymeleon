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

    all: (els, callback) => {
        if (n(els)) {
            if (
                !(els instanceof Window) &&
                (els instanceof NodeList || els.length > 1)
            ) {
                Array.from(els).forEach((el) => {
                    callback(el);
                });
            } else {
                callback(els);
            }
        }
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

export const before = (el_to_insert_before, child) => {
    if (
        n(el_to_insert_before) &&
        n(child) &&
        n(el_to_insert_before.parentNode) &&
        [1, 11].includes(child.nodeType)
    ) {
        el_to_insert_before.before(child);
    }
};

// < dom manipulation

export const matches = (el, selector) => {
    if (n(el) && el.nodeType === 1) {
        return el.matches(selector);
    }

    return false;
};

export const add_cls = (els, cls) => {
    const one = (el) => {
        if (n(el) && el.nodeType === 1) {
            el.classList.add(cls);
        }
    };

    shared.all(els, one);
};

export const remove_cls = (els, cls) => {
    const one = (el) => {
        if (n(el) && el.nodeType === 1) {
            el.classList.remove(cls);
        }
    };

    shared.all(els, one);
};

// > add event listener to one or multiple elements t
export const bind = (els, event, f) => {
    const one = (el) => {
        if (n(el.addEventListener)) {
            el.addEventListener(event, f);
        }
    };

    shared.all(els, one);
};
// < add event listener to one or multiple elements t

export const convert_cls_to_label = (cls) => {
    const underscores_replaced_with_spaces = cls.replace(/_/g, ' ');
    const first_letter_uppercase =
        underscores_replaced_with_spaces.charAt(0).toUpperCase() +
        underscores_replaced_with_spaces.slice(1);

    return first_letter_uppercase;
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

export const set_nested_val = (val_setter, val, obj) => {
    let current = { ...obj };
    let root = current;

    val_setter.forEach((key, i) => {
        if (i < val_setter.length - 1) {
            if (!n(current[key])) {
                current[key] = {};
            }
            current = current[key];
        } else {
            current[key] = val;
        }
    });

    return root;
};

export const remove_nested_val = (obj, val_accessor) => {
    const parent_path = val_accessor.slice(0, -1);
    const last_key = val_accessor[val_accessor.length - 1];

    const parent = parent_path.reduce((acc, key) => {
        return acc && typeof acc === 'object' && n(acc) ? acc[key] : undefined;
    }, obj);

    if (
        parent &&
        typeof parent === 'object' &&
        n(parent) &&
        parent.hasOwnProperty(last_key)
    ) {
        delete parent[last_key];
    }
};

export const get_keys = (obj) => (n(obj) ? Object.keys(obj) : []);

export const split_comma_trim = (val) =>
    val.split(',').map((item) => item.trim());
