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
