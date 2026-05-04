import get from 'lodash/get';
import { d_settings } from 'shared/internal';
import { d_inputs } from '@loftyshaky/shared-app/inputs';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    public calculate = (): Promise<void> =>
        err_async(async () => {
            d_inputs.InputWidth.min_width = 324;

            const val_accessor: string = 'settings.ui.input_width';
            const input_width: number = get(data, val_accessor);
            const current_section: string = get(data, 'settings.prefs.current_section');

            if (n(input_width)) {
                d_inputs.InputWidth.width = input_width;
            } else {
                await d_inputs.InputWidth.calculate();

                if (current_section === 'exe') {
                    d_settings.Settings.write_change_val({
                        val_setter: val_accessor,
                        val: d_inputs.InputWidth.width,
                    });
                }
            }
        }, 'cnt_5464');
}

export const InputWidth = Class.get_instance();
