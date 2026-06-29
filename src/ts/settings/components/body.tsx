import { observer } from 'mobx-react-lite';
import React, { type JSX, useEffect, useRef } from 'react';

import { c_app_version, c_offers, d_offers } from '@loftyshaky/shared-app/shared';
import type { p_settings } from 'settings/internal';
import { c_sections, d_sections, o_sections, s_sections } from 'settings/internal';
import { d_settings } from 'shared/internal';

export const Body: React.FunctionComponent<p_settings.Body> = observer((props) => {
    const { on_render } = props;
    const { add_new_setting } = d_sections.Val;
    const sections_ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        on_render();

        d_settings.Settings.transform_on_render();
        s_sections.Sections.set_scroll_height({ sections_el: sections_ref.current });
    }, [on_render, add_new_setting]);

    return (
        <div className='main'>
            <div className={x.cls(['main_2', 'settings'])}>
                <div className='section_btns'>
                    {Object.keys(s_sections.Template.ensure_sections()).map(
                        (section_name: string): JSX.Element => (
                            <c_sections.SectionBtn
                                key={section_name}
                                section_btn={new o_sections.SectionBtn({ section_name })}
                            />
                        ),
                    )}
                </div>
                <div className='sections_and_offers'>
                    <c_sections.BtnBar />
                    {d_offers.Offers.found_offers_for_current_locale() ? (
                        <c_offers.Body
                            is_visible={data.settings.prefs.offers_are_visible}
                            offer_banner_type='horizontal'
                        />
                    ) : undefined}
                    <div className='sections' ref={sections_ref}>
                        <c_sections.Section />
                    </div>
                </div>
            </div>
            <c_app_version.Body />
        </div>
    );
});
