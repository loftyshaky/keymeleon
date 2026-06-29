import '@loftyshaky/shared-app/app';
import { d_data } from '@loftyshaky/shared-app/shared';
import { init } from 'announcement/internal';

void (async () => {
    await d_data.Settings.set_from_storage();
    show_unable_to_access_settings_error();

    await init();
})();
