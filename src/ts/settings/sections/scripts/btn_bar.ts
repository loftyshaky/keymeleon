import { s_msgs } from 'shared_clean/internal';
import { o_inputs } from '@loftyshaky/shared-app/inputs';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    public btns: o_inputs.IconBtn[] = [];

    public reload_config = (): void =>
        err(() => {
            s_msgs.Msgs.send({ msg: 'reload_config' });
        }, 'seg_1727');

    public copy_current_layout_id_to_clipboard = (): void =>
        err(() => {
            s_msgs.Msgs.send({ msg: 'get_current_layout_id' });
        }, 'seg_1727');

    public copy_current_layout_id_to_clipboard_responder = ({
        current_layout_id,
    }: {
        current_layout_id: string;
    }): Promise<void> =>
        err_async(async () => {
            await navigator.clipboard.writeText(current_layout_id);

            if (current_layout_id === '') {
                show_notification({
                    error_msg_key: 'copy_current_layout_id_to_clipboard_error',
                    notification_type: 'error',
                    hide_delay: 2000,
                });
            } else {
                show_notification({
                    error_msg_key: 'copy_current_layout_id_to_clipboard_notification',
                    notification_type: 'positive',
                    hide_delay: 2000,
                });
            }
        }, 'seg_1727');
}

export const BtnBar = Class.get_instance();
