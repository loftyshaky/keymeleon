import { init } from 'dependencies/internal';

(async () => {
    await show_unable_to_access_settings_error();

    await init();
})();
