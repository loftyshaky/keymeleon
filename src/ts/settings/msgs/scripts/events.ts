import { init_shared } from '@loftyshaky/shared-app/shared';
import { d_settings } from 'shared/internal';
import { init, s_sections } from 'settings/internal';

window.chrome.webview.addEventListener('message', (e: any) =>
    err_async(async () => {
        const msg_obj = JSON.parse(JSON.parse(e.data));
        const msg_str: string = msg_obj.msg;

        if (msg_str === 'get_config_response') {
            d_settings.Settings.set({ settings: msg_obj.config });

            await app.read_data_into_vars();
            await show_unable_to_access_settings_error();

            init_shared();
            await init();
        } else if (msg_str === 'get_current_layout_id_response') {
            s_sections.BtnBar.copy_current_layout_id_to_clipboard_responder({
                current_layout_id: msg_obj.current_layout_id,
            });
        }
    }, 'cnt_1224'),
);
