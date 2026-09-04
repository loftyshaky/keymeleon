create_context_menu_items() {
    A_TrayMenu.Add()
    A_TrayMenu.Add("Settings", tray_click_action)
}

tray_click_action(*) {
    global window_was_closed
    global win_is_open
    global dimensions_obj_global

    if (win_is_open) {
        window_was_closed := 1
        win_is_open := 0

        win_hide()
    } else {
        win_is_open := 1

        win_display_initial(dimensions_obj_global)
    }
}
