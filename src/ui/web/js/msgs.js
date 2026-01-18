import * as sections from './sections.js';

window.chrome.webview.addEventListener('message', (e) => {
    const msg_obj = JSON.parse(JSON.parse(e.data));
    const msg_str = msg_obj.msg;

    if (msg_str === 'get_config_response') {
        globalThis.config = msg_obj.config;

        sections.create_sections();
    }
});

export const send_msg = (msg) => {
    if (window.chrome && window.chrome.webview) {
        window.chrome.webview.postMessage(JSON.stringify(msg));
    }
};
