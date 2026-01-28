import { x, configuration } from './internal.js';

export const create_section_btn = ({ name }) => {
    const current_section = configuration.get_config_val({
        val_accessor: ['ui', 'current_section'],
    });
    const current_section_final =
        current_section !== '' && typeof current_section === 'string'
            ? current_section
            : 'features';

    const el = x.create(
        'button',
        `btn section_btn ${name} ${
            current_section_final === name ? 'current' : ''
        }`
    );
    el.dataset.name = name;
    el.textContent = x.convert_cls_to_label(name);

    x.append(s('.section_btns'), el);
};

export const select_section = (e) => {
    const current_section = configuration.get_config_val({
        val_accessor: ['ui', 'current_section'],
    });
    const sections = sa('.section');
    const section_btns = sa('.section_btn');
    const new_section =
        n(e) && n(e.target) ? e.target : s('.section_btn.current');

    sections.forEach((section, i) => {
        x.add_cls(section, 'none');
        x.remove_cls(section_btns[i], 'current');
    });

    x.remove_cls(s(`.section.${new_section.dataset.name}`), 'none');
    x.add_cls(new_section, 'current');

    configuration.write_change({
        val_setter: ['ui', 'current_section'],
        val: new_section.dataset.name,
    });
};
