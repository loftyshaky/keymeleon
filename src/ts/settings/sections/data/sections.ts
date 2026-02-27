import { makeObservable, observable, computed } from 'mobx';

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
            sections: observable,
            current_section: computed,
        });
    }

    public get current_section() {
        return n(data.settings.prefs.current_section) ? data.settings.prefs.current_section : 'all';
    }

    public sections: any = {};

    // Recursive function to make all nested objects observable
    private make_deep_observable = (obj: any): any => {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }

        if (Array.isArray(obj)) {
            return obj.map((item) => this.make_deep_observable(item));
        }

        // Create a plain copy first
        const plainObj = { ...obj };

        // Recursively process all properties
        Object.keys(plainObj).forEach((key) => {
            if (plainObj[key] && typeof plainObj[key] === 'object') {
                plainObj[key] = this.make_deep_observable(plainObj[key]);
            }
        });

        // Make the object observable
        return observable.object(plainObj);
    };

    public init = (): void =>
        err(() => {
            // Create sections array
            const sectionsArray = [
                s_sections.Template.generate_section({ section_name: 'features' }),
                s_sections.Template.generate_section({ section_name: 'layouts' }),
                s_sections.Template.generate_section({ section_name: 'hotkeys' }),
                s_sections.Template.generate_input_bindings_section(),
                s_sections.Template.generate_exe_section(),
            ];

            // Convert to plain object
            const sections_obj: i_inputs.Sections = s_utils.Utils.to_object({
                arr: sectionsArray as o_inputs.Section[],
            });

            ['features', 'layouts', 'hotkeys', 'input_bindings', 'exe'].forEach(
                (section_name: string) => {
                    const convert_nested_inputs_to_objects = (obj: any): void =>
                        err(() => {
                            if (!obj || typeof obj !== 'object') {
                                return;
                            }

                            Object.keys(obj).forEach((key: string) =>
                                err(() => {
                                    const item = obj[key];

                                    if (n(item) && n(item.inputs) && Array.isArray(item.inputs)) {
                                        item.inputs = s_utils.Utils.to_object({
                                            arr: item.inputs as any[],
                                        });

                                        convert_nested_inputs_to_objects(item.inputs);
                                    }
                                }, 'cnt_1270'),
                            );
                        }, 'cnt_1271');

                    const inputs_obj = s_utils.Utils.to_object({
                        arr: sections_obj[section_name].inputs as any[],
                    });

                    if (section_name === 'exe') {
                        convert_nested_inputs_to_objects(inputs_obj);
                    }

                    const observable_inputs = this.make_deep_observable(inputs_obj);

                    sections_obj[section_name] = observable.object({
                        ...sections_obj[section_name],
                        inputs: observable_inputs,
                    });
                },
            );

            this.sections = observable.object(sections_obj);
        }, 'cnt_1269');
}

export const Sections = Class.get_instance();
