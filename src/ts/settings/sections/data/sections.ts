import { makeObservable, computed } from 'mobx';

import { s_utils } from '@loftyshaky/shared-app/shared';
import { o_inputs, i_inputs } from '@loftyshaky/shared-app/inputs';
import { s_sections } from 'settings/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {
        makeObservable(this, {
            current_section: computed,
        });
    }

    public get current_section() {
        return n(data.settings.prefs.current_section) ? data.settings.prefs.current_section : 'all';
    }

    public sections: o_inputs.Section[] | i_inputs.Sections = [];

    public init = (): void =>
        err(() => {
            this.sections = [
                ...[
                    s_sections.Template.generate_section({ section_name: 'features' }),
                    s_sections.Template.generate_section({ section_name: 'layouts' }),
                    s_sections.Template.generate_section({ section_name: 'hotkeys' }),
                    s_sections.Template.generate_input_bindings_section(),
                    s_sections.Template.generate_exe_section(),
                ],
            ];

            this.sections = s_utils.Utils.to_object({
                arr: this.sections as o_inputs.Section[],
            });
            this.sections.features.inputs = s_utils.Utils.to_object({
                arr: this.sections.features.inputs as o_inputs.Section[],
            });
            this.sections.layouts.inputs = s_utils.Utils.to_object({
                arr: this.sections.layouts.inputs as o_inputs.Section[],
            });
            this.sections.hotkeys.inputs = s_utils.Utils.to_object({
                arr: this.sections.hotkeys.inputs as o_inputs.Section[],
            });
            this.sections.input_bindings.inputs = s_utils.Utils.to_object({
                arr: this.sections.input_bindings.inputs as o_inputs.Section[],
            });
            this.sections.exe.inputs = s_utils.Utils.to_object({
                arr: this.sections.exe.inputs as o_inputs.Section[],
            });
        }, 'cnt_1269');
}

export const Sections = Class.get_instance();
