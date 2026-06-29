import { observer } from 'mobx-react-lite';
import React, { type JSX } from 'react';

import type { o_inputs } from '@loftyshaky/shared-app/inputs';
import { c_inputs } from '@loftyshaky/shared-app/inputs';
import { d_sections } from 'settings/internal';

export const BtnBar: React.FunctionComponent = observer(() => (
    <div className='btn_bar_w'>
        <div className='btn_bar'>
            {d_sections.BtnBar.btns.map(
                (button: o_inputs.IconBtn): JSX.Element => (
                    <c_inputs.IconBtn key={button.name} input={button} />
                ),
            )}
        </div>
    </div>
));
