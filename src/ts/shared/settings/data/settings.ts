import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';
import fromPairs from 'lodash/fromPairs';
import sortBy from 'lodash/sortBy';
import toPairs from 'lodash/toPairs';
import unset from 'lodash/unset';
import set from 'lodash/set';
import get from 'lodash/get';
import { makeObservable, action, toJS } from 'mobx';

import { s_theme } from '@loftyshaky/shared-app/shared';
import { s_msgs } from 'shared_clean/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    public constructor() {
        makeObservable<Class, 'set_val' | 'unset_val'>(this, {
            set: action,
            set_val: action,
            unset_val: action,
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

    public get_val = ({ val_accessor }: { val_accessor: string }): any =>
        err(() => get(data.settings, val_accessor), 'shr_1126');

    private set_val = ({ val_setter, val }: { val_setter: string; val: any }): void =>
        err(() => {
            const updated_data = toJS(data);
            set(updated_data, val_setter, val);

            data.settings = this.deep_obj_sort_by_key<any>({ obj: updated_data }).settings;

            s_theme.Theme.set({
                name: data.settings.prefs.options_page_theme,
            });
        }, 'shr_1127');

    private unset_val = ({ val_setter }: { val_setter: string }): void =>
        err(() => {
            const updated_data = toJS(data);

            unset(updated_data, val_setter);

            data.settings = updated_data.settings;

            s_theme.Theme.set({
                name: data.settings.prefs.options_page_theme,
            });
        }, 'shr_1107');

    public set_key = ({
        val_unsetter,
        val_setter,
        val,
    }: {
        val_unsetter: string;
        val_setter: string;
        val: any;
    }): void =>
        err(() => {
            this.unset_val({ val_setter: val_unsetter });
            this.set_val({ val_setter, val });
        }, 'shr_1127');

    private write = (): void =>
        err(() => {
            s_msgs.Msgs.send({ msg: 'write_config', config: data.settings });
        }, 'shr_1128');

    public write_change_val = ({ val_setter, val }: { val_setter: string; val: any }): void =>
        err(() => {
            this.set_val({
                val_setter,
                val,
            });

            this.write();
        }, 'shr_1129');

    public write_unset = ({ val_setter }: { val_setter: string }): void =>
        err(() => {
            this.unset_val({
                val_setter,
            });
            this.write();
        }, 'shr_1130');

    public write_change_key = ({
        val_unsetter,
        val_setter,
        val,
    }: {
        val_unsetter: string;
        val_setter: string;
        val: any;
    }): void =>
        err(() => {
            this.set_key({
                val_unsetter,
                val_setter,
                val,
            });

            this.write();
        }, 'shr_1129');

    private deep_obj_sort_by_key = <T>({ obj }: { obj: T }): T =>
        err(() => {
            if (!isObject(obj) || isArray(obj)) {
                return obj;
            }

            return fromPairs(
                sortBy(toPairs(obj), [0]).map(([key, val]) => [
                    key,
                    this.deep_obj_sort_by_key({ obj: val }),
                ]),
            ) as T;
        }, 'shr_1129');
}

export const Settings = Class.get_instance();
