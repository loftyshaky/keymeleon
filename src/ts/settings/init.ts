import { InitAll } from 'shared/internal';
import { d_sections } from 'settings/internal';

export const init = (): Promise<void> =>
    err_async(async () => {
        d_sections.Options.init();
        await InitAll.init();

        InitAll.render_settings();
    }, 'cnt_1221');
