import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { c_sections, o_sections, s_sections, p_settings } from 'settings/internal';

export const Body: React.FunctionComponent<p_settings.Body> = observer((props) => {
    const { on_render } = props;

    useEffect(() => {
        on_render();
    }, [on_render]);

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
                    <div className='sections'>
                        <c_sections.Section />
                    </div>
                </div>
            </div>
        </div>
    );
});
