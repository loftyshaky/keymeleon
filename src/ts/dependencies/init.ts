import { InitAll } from 'shared/internal';

export const init = (): Promise<void> =>
    err_async(async () => {
        await InitAll.init();

        void InitAll.render_dependencies();
    }, 'kmn_1229');
