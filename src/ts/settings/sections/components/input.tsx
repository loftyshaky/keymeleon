import React, { memo, useMemo } from 'react';

import { c_inputs, o_inputs } from '@loftyshaky/shared-app/inputs';
import { s_sections, p_sections } from 'settings/internal';

export const Input: React.FunctionComponent<p_sections.Input> = memo(
    (props) => {
        const { section_item, input } = props;

        return useMemo(() => {
            if (section_item.type === 'group') {
                return <c_inputs.Group input={input as o_inputs.Group} />;
            }

            if (section_item.type === 'checkbox') {
                return <c_inputs.Checkbox input={input as o_inputs.Checkbox} calculate_width />;
            }

            if (section_item.type === 'select') {
                return (
                    <c_inputs.Select
                        input={input as o_inputs.Select}
                        include_label
                        calculate_width
                    />
                );
            }

            if (section_item.type === 'icon_btn') {
                return <c_inputs.IconBtn input={input as o_inputs.IconBtn} />;
            }

            return <c_inputs.Text input={input as o_inputs.Text} include_label calculate_width />;
        }, [section_item.type, input]);
    },
    // Custom comparison function for props
    (prev_props, next_props) => {
        if (
            s_sections.Template.static_sections.includes(data.settings.prefs.current_section) ||
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
