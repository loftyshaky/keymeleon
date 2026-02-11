import { o_inputs, i_inputs } from '@loftyshaky/shared-app/inputs';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    public sections: o_inputs.Section[] | i_inputs.Sections = [];

    public init = (): void =>
        err(() => {
            this.sections = [];
        }, 'cnt_1269');
}

export const Sections = Class.get_instance();
