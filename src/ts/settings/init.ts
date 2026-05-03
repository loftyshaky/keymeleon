import { InitAll } from 'shared/internal';
import { d_sections, s_sections } from 'settings/internal';

export const init = (): Promise<void> =>
    err_async(async () => {
        s_sections.Template.set_templates();
        d_sections.Options.init();
        await InitAll.init();

        InitAll.render_settings();
    }, 'cnt_1221');
