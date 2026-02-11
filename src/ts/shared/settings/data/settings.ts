import set from 'lodash/set';
import get from 'lodash/get';
import { makeObservable, action } from 'mobx';

import { s_theme } from '@loftyshaky/shared-app/shared';
import { s_msgs } from 'shared_clean/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    public constructor() {
        makeObservable(this, {
            set: action,
            set_val: action,
        });
    }

    public set = ({ settings }: { settings: any }): void =>
        err(() => {
            data.settings = settings;
        }, 'shr_1124');

    public get = (): void =>
        err(() => {
            s_msgs.Msgs.send({ msg: 'get_config' });
        }, 'shr_1125');

    public get_val = ({ val_accessor }: { val_accessor: string[] }): any =>
        err(() => get(data.settings, val_accessor), 'shr_1126');

    set_val = ({ val_setter, val }: { val_setter: string[]; val: any }): void =>
        err(() => {
            data.settings = set(data.settings, val_setter, val);

            s_theme.Theme.set({
                name: data.settings.prefs.options_page_theme,
            });
        }, 'shr_1127');

    write = (): void =>
        err(() => {
            s_msgs.Msgs.send({ msg: 'write_config', config: data.settings });
        }, 'shr_1128');

    write_change = ({ val_setter, val }: { val_setter: string[]; val: any }): void =>
        err(() => {
            this.set_val({
                val_setter,
                val,
            });

            this.write();
        }, 'shr_1129');
}

export const Settings = Class.get_instance();
