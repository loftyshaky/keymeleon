import React, { memo, useMemo } from 'react';
// import { observer } from 'mobx-react';

import { c_inputs, o_inputs } from '@loftyshaky/shared-app/inputs';
import { p_sections } from 'settings/internal';

export const Input: React.FunctionComponent<p_sections.Input> = memo(
    (props) => {
        const { section_item, input, i } = props;

        return useMemo(() => {
            if (section_item.type === 'group') {
                return <c_inputs.Group key={i} input={input as o_inputs.Group} />;
            }

            if (section_item.type === 'checkbox') {
                return (
                    <c_inputs.Checkbox key={i} input={input as o_inputs.Checkbox} calculate_width />
                );
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

            return (
                <c_inputs.Text
                    key={i}
                    input={input as o_inputs.Text}
                    include_label
                    calculate_width
                />
            );
        }, [section_item.type, i, input]);
    },
    // Custom comparison function for props
    (prev_props, next_props) => {
        if (
            prev_props.val_type_reaction_id !== next_props.val_type_reaction_id ||
            prev_props.remove_property_reaction_id !== next_props.remove_property_reaction_id ||
            prev_props.edit_group_label_reaction_id !== next_props.edit_group_label_reaction_id ||
            prev_props.collapse_group_reaction_id !== next_props.collapse_group_reaction_id
        ) {
            // if changed value reaction_id, rerender

            return false;
        }

        // If all props are equal, don't rerender
        return true;
    },
);
