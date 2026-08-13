import fromPairs from 'lodash/fromPairs';
import get from 'lodash/get';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import map from 'lodash/map';
import set from 'lodash/set';
import sortBy from 'lodash/sortBy';
import toPairs from 'lodash/toPairs';
import trim from 'lodash/trim';
import unset from 'lodash/unset';
import { action, makeObservable, toJS } from 'mobx';

import type { i_data, t } from '@loftyshaky/shared-app/shared';
import { d_schema, o_schema } from '@loftyshaky/shared-app/shared_clean';
import type { i_settings } from 'shared/internal';
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
            set_transformed: action,
        });
    }

    public data_raw: t.AnyRecord = {};
    public set_once: boolean = false;

    public set = ({ settings }: { settings: t.AnyRecord }): Promise<void> =>
        err_async(async () => {
            const settings_final = await (this.set_once
                ? Promise.resolve(settings)
                : this.transform({ settings }));

            this.data_raw.settings = settings_final;
            data.settings = settings_final;
        }, 'shr_1124');

    public get = (): void =>
        err(() => {
            s_msgs.Msgs.send({ msg: 'get_config' });
        }, 'shr_1125');

    private set_val = ({
        val_setter,
        val,
        sort = false,
    }: {
        val_setter: string;
        val: t.Any;
        sort?: boolean;
    }): void =>
        err(() => {
            const updated_data = toJS(data);

            set(this.data_raw, val_setter, val);
            set(updated_data, val_setter, val);

            data.settings = (
                sort ? this.deep_obj_sort_by_key<t.Any>({ obj: updated_data }) : updated_data
            ).settings;
        }, 'shr_1127');

    private unset_val = ({ val_setter }: { val_setter: string }): void =>
        err(() => {
            const updated_data = toJS(data);

            unset(this.data_raw, val_setter);
            unset(updated_data, val_setter);

            data.settings = updated_data.settings;
        }, 'shr_1107');

    public set_key = ({
        val_unsetter,
        val_setter,
        val,
        sort = false,
    }: {
        val_unsetter: string;
        val_setter: string;
        val: t.Any;
        sort?: boolean;
    }): void =>
        err(() => {
            this.unset_val({ val_setter: val_unsetter });
            this.set_val({ val_setter, val, sort });
        }, 'shr_1127');

    private write = ({ config }: { config: t.AnyRecord }): void =>
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
        val: t.Any;
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

                if (n(val_type)) {
                    set(this.data_raw, val_setter, this.transform_val({ val, val_type }));
                }

                this.write({ config: this.data_raw.settings });
            }
        }, 'shr_1129');

    public write_unset = ({ val_setter }: { val_setter: string | undefined }): void =>
        err(() => {
            if (n(val_setter)) {
                this.unset_val({
                    val_setter,
                });
                this.write({ config: this.data_raw.settings });
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
        val: t.Any;
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
            this.write({ config: this.data_raw.settings });
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
                    val_final = map((val as string).split(','), trim);

                    if (val_final.length === 1 && val_final[0] === '') {
                        val_final = [];
                    }
                } else if (val_type === 'macro') {
                    val_final = JSON.parse(val as string);
                }
            }

            return val_final;
        }, 'cnt_1288');

    public set_transformed = ({
        val_type,
        val_accessor,
    }: {
        val_type: i_settings.ValType | undefined;
        val_accessor: string | undefined;
    }): void =>
        err(() => {
            if (n(val_accessor)) {
                const val = get(data, val_accessor);

                let transformed_val = '';

                if (n(val) && typeof val !== 'string') {
                    if (val_type === 'array') {
                        transformed_val = (val as string[]).join(', ');
                    } else if (val_type === 'macro') {
                        transformed_val = JSON.stringify(val, undefined, 4);
                    }

                    if (transformed_val !== '') {
                        set(data, val_accessor, transformed_val);
                    }
                }
            }
        }, 'aer_1082');

    private transform = ({ settings }: { settings: t.AnyRecord }): t.AnyRecord =>
        err_async(async () => {
            const version = d_schema.Schema.get_version_legacy({ settings });

            const transform_items_prefs: o_schema.TransformItem[] = [
                new o_schema.TransformItem({
                    new_key: 'detect_infinite_loops',
                    new_val: false,
                }),
            ];

            const updated_prefs = await d_schema.Schema.transform({
                data_obj: settings.prefs,
                version,
                transform_items: transform_items_prefs,
                force: false,
            });

            updated_prefs.version = app.get_app_version();

            settings.prefs = updated_prefs;

            return settings;
        }, 'aer_1085');

    public transform_on_render = (): void =>
        err(() => {
            if (!this.set_once) {
                this.write({ config: this.data_raw.settings });
            }

            this.set_once = true;
        }, 'shr_1728');
}

export const Settings = Class.get_instance();
