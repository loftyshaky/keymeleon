import * as msgs from './msgs.js';

export const get_config = () => {
    msgs.send_msg({ msg: 'get_config' });
};
