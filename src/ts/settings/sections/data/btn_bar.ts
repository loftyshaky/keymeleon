import { o_inputs } from '@loftyshaky/shared-app/inputs';
import { svg } from 'shared/internal';
import { s_sections } from 'settings/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    public btns: o_inputs.IconBtn[] = [];

    public init = (): void =>
        err(() => {
            this.btns = [
                new o_inputs.IconBtn({
                    name: 'reload_config',
                    Svg: svg.Refresh,
                    event_callback: s_sections.BtnBar.reload_config,
                }),
                new o_inputs.IconBtn({
                    name: 'copy_current_layout_id_to_clipboard',
                    Svg: svg.Translate,
                    event_callback: s_sections.BtnBar.copy_current_layout_id_to_clipboard,
                }),
                new o_inputs.IconBtn({
                    name: 'collapse_all',
                    Svg: svg.Dehaze,
                    event_callback: s_sections.BtnBar.collapse_all,
                }),
            ];
        }, 'seg_1127');
}

export const BtnBar = Class.get_instance();
