import '@loftyshaky/shared-app/app';
import { d_settings } from 'shared/internal';
import 'settings/internal';

(async () => {
    d_settings.Settings.get();
})();
