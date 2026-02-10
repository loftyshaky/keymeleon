import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { c_inputs, o_inputs } from '@loftyshaky/shared-app/inputs';
import { c_settings, d_sections, p_settings } from 'settings/internal';

export const Body: React.FunctionComponent<p_settings.Body> = observer((props) => {
    const { on_render } = props;

    useEffect(() => {
        on_render();
    }, [on_render]);

    return (
        <div className='main'>
            <div className='main_2'>
                <div className='sections custom settings'>
                    {Object.values(d_sections.Sections.sections).map(
                        (section: o_inputs.Section, i: number): JSX.Element => (
                            <c_settings.Section
                                key={i}
                                section_name={section.name}
                                section={section}
                            >
                                <c_inputs.SectionContent
                                    section={section}
                                    inputs={section.inputs}
                                />
                            </c_settings.Section>
                        ),
                    )}
                </div>
            </div>
        </div>
    );
});
