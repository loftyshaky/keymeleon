import { init } from 'dependencies/internal';

void (async () => {
    show_unable_to_access_settings_error();

    await init();
})();
