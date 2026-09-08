import { init_shared } from '@loftyshaky/shared-app/shared';
import type { t } from '@loftyshaky/shared-app/shared_clean';
import { init } from 'dependencies/internal';
import { d_settings } from 'shared/internal';

window.chrome.webview.addEventListener('message', (e: t.Any) =>
    err_async(async () => {
        const msg_obj = JSON.parse(JSON.parse(e.data));
        const msg_str: string = msg_obj.msg;

        if (msg_str === 'get_config_response') {
            await d_settings.Settings.set({ settings: msg_obj.config });

            await app.read_data_into_vars();
            show_unable_to_access_settings_error();

            init_shared();
            await init();
        }
    }, 'cnt_1224'),
);
