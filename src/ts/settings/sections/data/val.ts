import get from 'lodash/get';
import set from 'lodash/set';
import { makeObservable, action } from 'mobx';

import { o_inputs, i_inputs } from '@loftyshaky/shared-app/inputs';
import { d_settings } from 'shared/internal';
import { d_sections } from 'settings/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {
        makeObservable(this, {
            remove_property: action,
        });
    }

    public change = action(
        (/* { input }: { input: i_inputs.Input } */): Promise<void> =>
            err(async () => {}, 'cnt_1288'),
    );

    public remove_val = (/* { input }: { input: i_inputs.Input } */): Promise<void> =>
        err(async () => {}, 'cnt_1290');

    public remove_property = ({
        input_type,
        input,
        section_path,
    }: {
        input_type: string;
        input: i_inputs.Input;
        section_path: string;
    }): Promise<void> =>
        err_async(async () => {
            if (n(input.val_accessor)) {
                // Remove from data
                d_settings.Settings.write_unset({ val_setter: input.val_accessor });

                if (
                    [
                        'input_bindings',
                        'key_bindings_group',
                        'individual_input_key_binding_group',
                        'individual_exe_group',
                    ].includes(input_type)
                ) {
                    // the code below can remove "exe" and "key_bindings" inputs from sections ui too, but I don't this here
                    const { sections } = d_sections.Sections;
                    const path_parts = section_path.split('.');
                    const parent_path = path_parts.slice(0, -1).join('.');
                    const last_key = path_parts[path_parts.length - 1];
                    const parent = get(sections, parent_path);

                    if (n(parent)) {
                        const copy = { ...parent };

                        delete copy[last_key];

                        set(sections, parent_path, copy);
                    }
                }
            }
        }, 'cnt_1291');

    public remove_property_side_btn_is_enabled_cond = ({
        input,
    }: {
        input: i_inputs.Input;
    }): boolean =>
        err(() => {
            if (input.val_accessor) {
                const property = get(data, input.val_accessor);

                return n(property);
            }

            return false;
        }, 'cnt_4897');

    public collapse_group_side_btn_is_enabled_cond = ({
        input,
    }: {
        input: i_inputs.Input;
    }): boolean =>
        err(() => {
            const val_accessor: string | undefined = (input as o_inputs.Group)
                .content_is_visible_val_accessor;
            let side_btn_is_enabled_cond: number = 0;

            if (n(val_accessor)) {
                const content_is_visible: any = get(data, val_accessor);

                if (
                    n(content_is_visible) &&
                    (content_is_visible === true || content_is_visible === 1)
                ) {
                    side_btn_is_enabled_cond = 1;
                }
            }

            return Boolean(side_btn_is_enabled_cond);
        }, 'cnt_7844');

    public collapse_group = ({ input }: { input: i_inputs.Input }): void =>
        err(() => {
            const val_accessor: string | undefined = (input as o_inputs.Group)
                .content_is_visible_val_accessor;

            if (n(val_accessor)) {
                const content_is_visible: any = get(data, val_accessor);
                let new_content_is_visible_val: number = 1;

                if (
                    n(content_is_visible) &&
                    (content_is_visible === true || content_is_visible === 1)
                ) {
                    new_content_is_visible_val = 0;
                }

                d_settings.Settings.write_change({
                    val_setter: val_accessor,
                    val: new_content_is_visible_val,
                });
            }
        }, 'cnt_7844');
}

export const Val = Class.get_instance();
