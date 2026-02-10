import React from 'react';
import { observer } from 'mobx-react';

import { c_app_version } from '@loftyshaky/shared-app/shared';
import { p_settings } from 'settings/internal';

export const Section: React.FunctionComponent<p_settings.Section> = observer((props) => {
    const { section_name, children } = props;

    return (
        <div className={x.cls(['section', section_name])}>
            <h1 className='section_name' role='none'>
                {ext.msg(`${section_name}_section_text`)}
            </h1>
            <div className='section_content'>
                {children}
                {section_name === 'links' ? <c_app_version.Body /> : undefined}
            </div>
        </div>
    );
});
