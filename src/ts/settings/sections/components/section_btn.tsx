import React from 'react';
import { observer } from 'mobx-react';

import { p_sections } from 'settings/internal';

export const SectionBtn: React.FunctionComponent<p_sections.SectionBtn> = observer((props) => {
    const { section_btn } = props;

    return (
        <button
            className={x.cls([
                'section_btn',
                section_btn.section_name,
                section_btn.selected_cls!(),
            ])}
            type='button'
            onClick={section_btn.change_current_section_val}
        >
            {section_btn.section_name_text!()}
        </button>
    );
});
