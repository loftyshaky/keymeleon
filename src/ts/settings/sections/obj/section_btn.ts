import { computedFn } from 'mobx-utils';

import { d_developer_mode } from '@loftyshaky/shared-app/settings';
import { d_settings } from 'shared/internal';

export class SectionBtn {
    public section_name = '';

    public constructor(obj: SectionBtn) {
        Object.assign(this, obj);
    }

    public selected_cls? = computedFn(function (this: SectionBtn): string {
        return data.settings.prefs.current_section === this.section_name ? 'selected' : '';
    });

    public tab_index? = computedFn(function (this: SectionBtn): number {
        return data.settings.prefs.current_section === this.section_name ? -1 : 0;
    });

    public section_name_text? = (): string =>
        err(
            () =>
                app.msg(`${this.section_name}_section_text`) ||
                x.underscore_to_readable(this.section_name),
            'cnt_4835',
        );

    public change_current_section_val? = (): void =>
        err(() => {
            d_settings.Settings.write_change_val({
                val_setter: 'settings.prefs.current_section',
                val: this.section_name,
            });

            if (this.section_name === 'prefs') {
                void d_developer_mode.DeveloperMode.enable({
                    save_callback: async () =>
                        d_settings.Settings.write_change_val({
                            val_setter: 'settings.prefs.developer_mode',
                            val: 1,
                            val_type: 'number',
                        }),
                });
            }
        }, 'cnt_1129');
}
