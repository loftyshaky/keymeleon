import { o_inputs, i_inputs } from '@loftyshaky/shared-app/inputs';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    public options: i_inputs.Options = {};

    public init = (): void =>
        err(() => {
            this.options = {
                send_mode: [
                    new o_inputs.Option({ name: 'send', val: 'Send' }),
                    new o_inputs.Option({ name: 'send_input', val: 'SendInput' }),
                    new o_inputs.Option({ name: 'send_text', val: 'SendText' }),
                    new o_inputs.Option({ name: 'send_play', val: 'SendPlay' }),
                    new o_inputs.Option({ name: 'send_event', val: 'SendEvent' }),
                ],
            };
        }, 'seg_1127');
}

export const Options = Class.get_instance();
