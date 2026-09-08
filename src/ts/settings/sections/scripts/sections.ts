import type { i_inputs } from '@loftyshaky/shared-app/inputs';
import type { i_sections } from 'settings/internal';
import { s_msgs } from 'shared_clean/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {}

    public scroll_sections_to_bottom: boolean = false;

    public set_scroll_height = ({ sections_el }: { sections_el: HTMLElement | null }): void =>
        err(() => {
            if (n(sections_el) && this.scroll_sections_to_bottom) {
                sections_el.scrollTop = sections_el.scrollHeight;
            }

            this.scroll_sections_to_bottom = false;
        }, 'cnt_3478');

    public create_static_inputs_cond = ({
        section_item,
        found_offers_for_current_locale,
    }: {
        section_item: i_sections.SectionTemplateItem;
        found_offers_for_current_locale: boolean;
    }): boolean =>
        err(
            () =>
                (section_item.name === 'offers_are_visible' && found_offers_for_current_locale) ||
                section_item.name !== 'offers_are_visible',
            'cnt_6565',
        );

    public trigger_link_btn_action = ({ input }: { input: i_inputs.Input }): void =>
        err(() => {
            if (input.name === 'dependencies') {
                s_msgs.Msgs.send({ msg: 'display_dependencies_page' });
            }
        }, 'cnt_3465');
}

export const Sections = Class.get_instance();
