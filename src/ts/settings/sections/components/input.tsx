import React from 'react';
import { observer } from 'mobx-react';

import { c_inputs, o_inputs } from '@loftyshaky/shared-app/inputs';
import { p_sections } from 'settings/internal';

export const Input: React.FunctionComponent<p_sections.Input> = observer((props) => {
    const { section_item, input, i } = props;

    if (section_item.type === 'group') {
        return <c_inputs.Group key={i} input={input as o_inputs.Group} />;
    }

    if (section_item.type === 'checkbox') {
        return <c_inputs.Checkbox key={i} input={input as o_inputs.Checkbox} calculate_width />;
    }

    if (section_item.type === 'select') {
        return (
            <c_inputs.Select
                key={i}
                input={input as o_inputs.Select}
                include_label
                calculate_width
            />
        );
    }

    return <c_inputs.Text key={i} input={input as o_inputs.Text} include_label calculate_width />;
});
