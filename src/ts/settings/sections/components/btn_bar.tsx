import React from 'react';
import { observer } from 'mobx-react';

import { c_inputs, o_inputs } from '@loftyshaky/shared-app/inputs';
import { d_sections } from 'settings/internal';

export const BtnBar: React.FunctionComponent = observer(() => (
    <div className='btn_bar_w'>
        <div className='btn_bar'>
            {d_sections.BtnBar.btns.map(
                (button: o_inputs.IconBtn, i: number): JSX.Element => (
                    <c_inputs.IconBtn key={i} input={button} />
                ),
            )}
        </div>
    </div>
));
