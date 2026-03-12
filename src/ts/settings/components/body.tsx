import React, { useRef, useEffect } from 'react';
import { observer } from 'mobx-react';

import { c_sections, o_sections, d_sections, s_sections, p_settings } from 'settings/internal';

export const Body: React.FunctionComponent<p_settings.Body> = observer((props) => {
    const { on_render } = props;
    const { add_new_setting } = d_sections.Val;
    const sections_ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        on_render();

        if (d_sections.Sections.scroll_sections_to_bottom && n(sections_ref.current)) {
            sections_ref.current.scrollTop = sections_ref.current.scrollHeight;
        }

        d_sections.Sections.scroll_sections_to_bottom = false;
    }, [on_render, add_new_setting]);

    return (
        <div className='main'>
            <div className={x.cls(['main_2', 'settings'])}>
                <div className='section_btns'>
                    {Object.keys(s_sections.Template.sections).map(
                        (section_name: string, i: number): JSX.Element => (
                            <c_sections.SectionBtn
                                key={i}
                                section_btn={new o_sections.SectionBtn({ section_name })}
                            />
                        ),
                    )}
                </div>
                <div className='sections_and_offers'>
                    <div className='sections' ref={sections_ref}>
                        <c_sections.Section />
                    </div>
                </div>
            </div>
        </div>
    );
});
