import '@loftyshaky/shared-app/app';
import { d_settings } from 'shared/internal';
import 'dependencies/internal';

void (async () => {
    d_settings.Settings.get();
})();
