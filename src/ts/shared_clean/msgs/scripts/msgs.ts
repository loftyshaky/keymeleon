import { t } from '@loftyshaky/shared-app/shared';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public send = (msg: t.Msg): void =>
        err(() => {
            if (window.chrome && window.chrome.webview) {
                window.chrome.webview.postMessage(JSON.stringify(msg));
            }
        }, 'cnt_1224');
}

export const Msgs = Class.get_instance();
