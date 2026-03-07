import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';
import fromPairs from 'lodash/fromPairs';
import sortBy from 'lodash/sortBy';
import toPairs from 'lodash/toPairs';
import unset from 'lodash/unset';
import set from 'lodash/set';
import get from 'lodash/get';
import { makeObservable, action, toJS } from 'mobx';

import { s_theme, i_data } from '@loftyshaky/shared-app/shared';
import { i_settings } from 'shared/internal';
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

    private set_val = ({
        val_setter,
        val,
        sort = false,
    }: {
        val_setter: string;
        val: any;
        sort?: boolean;
    }): void =>
        err(() => {
            const updated_data = toJS(data);
            set(updated_data, val_setter, val);

            data.settings = (
                sort ? this.deep_obj_sort_by_key<any>({ obj: updated_data }) : updated_data
            ).settings;

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
        sort = false,
    }: {
        val_unsetter: string;
        val_setter: string;
        val: any;
        sort?: boolean;
    }): void =>
        err(() => {
            this.unset_val({ val_setter: val_unsetter });
            this.set_val({ val_setter, val, sort });
        }, 'shr_1127');

    private write = ({ config }: { config: any }): void =>
        err(() => {
            s_msgs.Msgs.send({ msg: 'write_config', config });
        }, 'shr_1128');

    public write_change_val = ({
        val_setter,
        val,
        val_type,
        sort = false,
    }: {
        val_setter: string | undefined;
        val: any;
        val_type?: i_settings.ValType;
        sort?: boolean;
    }): void =>
        err(() => {
            if (n(val_setter)) {
                this.set_val({
                    val_setter,
                    val,
                    sort,
                });

                const data_clone = n(val_type) ? toJS(data) : data;

                if (n(val_type)) {
                    set(data_clone, val_setter, this.transform_val({ val, val_type }));
                }

                this.write({ config: data_clone.settings });
            }
        }, 'shr_1129');

    public write_unset = ({ val_setter }: { val_setter: string | undefined }): void =>
        err(() => {
            if (n(val_setter)) {
                this.unset_val({
                    val_setter,
                });
                this.write({ config: data.settings });
            }
        }, 'shr_1130');

    public write_change_key = ({
        val_unsetter,
        val_setter,
        val,
        sort = false,
    }: {
        val_unsetter: string | undefined;
        val_setter: string | undefined;
        val: any;
        sort?: boolean;
    }): void =>
        err(() => {
            if (n(val_unsetter) && n(val_setter)) {
                this.set_key({
                    val_unsetter,
                    val_setter,
                    val,
                    sort,
                });
            }
            this.write({ config: data.settings });
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

    private transform_val = ({
        val,
        val_type,
    }: {
        val: i_data.Val;
        val_type: i_settings.ValType;
    }): i_data.Val =>
        err(() => {
            let val_final: i_data.Val = val;

            if (n(val)) {
                if (val_type === 'number') {
                    val_final = +val;
                } else if (val_type === 'array') {
                    val_final = (val as string).split(',');

                    if (val_final.length === 1 && val_final[0] === '') {
                        val_final = [];
                    }
                }
            }

            return val_final;
        }, 'cnt_1288');
}

export const Settings = Class.get_instance();
