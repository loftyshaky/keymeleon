last_switched_layout := ""
layout_change_step := 0
switching_layout_with_dedicated_hotkey := false
last_exe := ""
last_exe_was_present_in_conditional_exe_list := false
all_layouts_in_switch_order := n(config_get(["layouts", "secondary_layouts"])) ? config_get(["layouts", "secondary_layouts"]).clone() : false

generate_all_layouts_in_switch_order_arr() {
    global all_layouts_in_switch_order

    primary_layout := config_get(["layouts", "primary_layout"])

    if (n(primary_layout)) {
        all_layouts_in_switch_order.InsertAt(1, primary_layout)
    }
}


switch_layout(new_layout, is_automatic_layout_switching) {
    global last_switched_layout
    global switching_layout_with_dedicated_hotkey

    enable_sequential_layout_switching := config_get(["features", "enable_sequential_layout_switching"])
    enable_dedicated_layout_switching := config_get(["features", "enable_dedicated_layout_switching"])
    enable_windows_api_layout_switching := config_get(["features", "enable_windows_api_layout_switching"])
    fallback_layout_switching_exes := config_get(["layouts", "fallback_layout_switching_exes"])

    if ((!switching_layout_with_dedicated_hotkey && n(enable_sequential_layout_switching) && enable_sequential_layout_switching) || (switching_layout_with_dedicated_hotkey && n(enable_dedicated_layout_switching) && enable_dedicated_layout_switching)) {
        classes_of_windows_that_wont_let_you_change_layout_with_windows_api := ["Progman", "Shell_TrayWnd", "Windows.UI.Core.CoreWindow"] ; Desktop, Taskbar (when you clicked on the taskbar), Start menu
        window_class := WinGetClass("A")
        can_change_layout_with_windows_api := !find_i_in_array(window_class ? window_class : "", classes_of_windows_that_wont_let_you_change_layout_with_windows_api)

        found_fallback_layout_switching_exe := false

        try {
            pid := WinGetPID("A")
            process_name := WinGetProcessName("ahk_pid " pid)
            exe_name := StrReplace(process_name, ".exe", "")

            found_fallback_layout_switching_exe := n(fallback_layout_switching_exes) && n(find_i_in_array(exe_name, fallback_layout_switching_exes))
        }

        if (n(enable_windows_api_layout_switching) && enable_windows_api_layout_switching && can_change_layout_with_windows_api && !found_fallback_layout_switching_exe) {
            set_layout_using_windows_api(new_layout, is_automatic_layout_switching)
        } else {
            set_layout_by_simulating_key_pressess(new_layout, is_automatic_layout_switching)
        }

        last_switched_layout := new_layout

        if (!is_automatic_layout_switching) {
            bind_unbind_context_hotkeys(last_switched_layout)
        }
    }
}

set_layout_by_simulating_key_pressess(new_layout, is_automatic_layout_switching) {
    global layout_change_step

    step_is_0 := layout_change_step = 0

    if (!is_automatic_layout_switching) {
        play_layout_switching_audio(new_layout, is_automatic_layout_switching)
    }

    current_layout := get_current_layout()
    all_layouts_ordered := config_get(["layouts", "all_layouts_ordered"])

    if (n(all_layouts_ordered) && is_arr(all_layouts_ordered)) {
        current_layout_i := find_i_in_array(current_layout, all_layouts_ordered)
        new_layout_i := find_i_in_array(new_layout, all_layouts_ordered)
        primary_layout := config_get(["layouts", "primary_layout"])
        new_layout := config_get(["layouts", "all_layouts_ordered", new_layout_i])
        total_layot_count := all_layouts_ordered.Length
        new_layout_is_primary := new_layout = primary_layout

        if (n(primary_layout) && n(new_layout)) {
            if (new_layout_i != current_layout_i) {
                if (new_layout_is_primary) {
                    if (current_layout_i = total_layot_count) {
                        layout_change_step := new_layout_i
                    } else if (new_layout_i < current_layout_i) {
                        layout_change_step := new_layout_i + (total_layot_count - current_layout_i)
                    } else if (new_layout_i > current_layout_i) {
                        layout_change_step := new_layout_i - current_layout_i
                    }
                } else {
                    if (new_layout_i > current_layout_i) {
                        layout_change_step := new_layout_i - current_layout_i
                    } else if (new_layout_i < current_layout_i) {
                        layout_change_step := new_layout_i + (total_layot_count - current_layout_i)
                    }
                }

                if (step_is_0) {
                    ;block_keys(false)

                    loop_through_layouts()
                } else {
                    ;block_keys(true)
                }
            }
        }
    }

    if (is_automatic_layout_switching) {
        play_layout_switching_audio(new_layout, is_automatic_layout_switching)
    }

}

set_layout_using_windows_api(new_layout, is_automatic_layout_switching) {
    if (!is_automatic_layout_switching) {
        play_layout_switching_audio(new_layout, is_automatic_layout_switching)
    }

    all_layouts_ordered := config_get(["layouts", "all_layouts_ordered"])
    fallback_layout_switching_exes := config_get(["layouts", "fallback_layout_switching_exes"])
    current_layout := get_current_layout()
    window_ids := WinGetList()
    layout_i := find_i_in_array(new_layout, all_layouts_ordered)
    new_layout_id := config_get(["layouts", "layout_ids", layout_i])

    if (n(new_layout_id)) {
        for (i, window_id in window_ids) {
            try { ; prevent the "Access is denied" error when changing a layout (doesn't always happen; reason unknown)
                current_exe_name := get_current_exe_name()
                pid := WinGetPID("ahk_id " window_id)
                process_name := WinGetProcessName("ahk_pid " pid)
                exe_name := StrReplace(process_name, ".exe", "")
                automatic_exe_windows_api_layout_switching_delay := config_get(["hotkeys", "context_remap", "exe", exe_name, "automatic_exe_windows_api_layout_switching_delay"])
                automatic_exe_windows_api_layout_switching_delay_final := IsInteger(automatic_exe_windows_api_layout_switching_delay) ? automatic_exe_windows_api_layout_switching_delay : 0

                if (is_automatic_layout_switching && exe_name = current_exe_name) {
                    Sleep(automatic_exe_windows_api_layout_switching_delay_final)
                }

                if (!n(fallback_layout_switching_exes) || !n(find_i_in_array(exe_name, fallback_layout_switching_exes))) {
                    PostMessage(0x50, 0, new_layout_id, , window_id)
                }
            }
        }
    }

    if (is_automatic_layout_switching) {
        play_layout_switching_audio(new_layout, is_automatic_layout_switching)
    }
}

loop_through_layouts() {
    global layout_change_step

    layout_switching_delay := config_get(["layouts", "layout_switching_delay"])
    layout_switching_delay_final := n(layout_switching_delay) ? layout_switching_delay : 0
    step_is_0 := layout_change_step = 0

    if (step_is_0 = False) {
        Send("{LWin down}")
        Sleep(layout_switching_delay_final)
        Send("{Space}")
        Sleep(layout_switching_delay_final)
        Send("{LWin up}")
        Sleep(layout_switching_delay_final * 2) ; * 2 Needed to prevent spontaneous opening (or closing) of start menu in Windows 11 when you switch layout by dedicated Ctrl + Shift + [F8 - F11].

        layout_change_step--

        loop_through_layouts()
    } else {
        ;block_keys(true)
    }
}

set_primary_layout() {
    global switching_layout_with_dedicated_hotkey

    layout := config_get(["layouts", "primary_layout"])

    if (n(layout)) {
        switching_layout_with_dedicated_hotkey := false

        current_layout := get_current_layout()

        if (current_layout != "not_found") {
            switch_layout(layout, false)
        }
    }
}

set_secondary_layout() {
    global switching_layout_with_dedicated_hotkey

    primary_layout := config_get(["layouts", "primary_layout"])
    secondary_layouts := config_get(["layouts", "secondary_layouts"])

    if (n(primary_layout) && n(secondary_layouts) && is_arr(secondary_layouts)) {
        switching_layout_with_dedicated_hotkey := false

        current_layout := get_current_layout()

        if (current_layout != "not_found") {
            last_secondary_layout := secondary_layouts.Length
            current_layout := get_current_layout()

            if (current_layout = primary_layout || current_layout = last_secondary_layout) {
                first_secondary_layout := config_get(["1"], secondary_layouts)

                if (n(first_secondary_layout)) {
                    switch_layout(first_secondary_layout, false)
                }
            } else {
                next_current_secondary_layout_i := get_next_current_secondary_layout_i()
                next_secondary_layout := config_get([next_current_secondary_layout_i], secondary_layouts)

                if (n(next_secondary_layout)) {
                    switch_layout(next_secondary_layout, false)
                }
            }
        }
    }
}

set_dedicated_with_dedicated_hotkey(hotkey) {
    global config
    global all_layouts_in_switch_order
    global switching_layout_with_dedicated_hotkey

    dedicated_layout_hotkeys := config_get(["hotkeys", "dedicated_layout_hotkeys"])

    if (n(dedicated_layout_hotkeys) && is_arr(dedicated_layout_hotkeys)) {
        switching_layout_with_dedicated_hotkey := true

        current_layout := get_current_layout()
        new_layout_i := find_i_in_array(hotkey, dedicated_layout_hotkeys)

        if (current_layout != "not_found") {
            layout := all_layouts_in_switch_order[new_layout_i]

            switch_layout(layout, false)
        }
    }
}

get_current_layout_id() {
    try {
        focused := ControlGetFocus("A")
        ctrl_id := ControlGetHwnd(focused, "A")

        ; Get thread ID and keyboard layout
        thread_id := DllCall("GetWindowThreadProcessId", "Ptr", ctrl_id, "Ptr", 0)
        input_locale_id := DllCall("GetKeyboardLayout", "UInt", thread_id, "Ptr")


        return input_locale_id

    } catch {
        ; Fallback: get layout for active window if control method fails
        thread_id := DllCall("GetWindowThreadProcessId", "Ptr", WinGetID("A"), "Ptr", 0)
        input_locale_id := DllCall("GetKeyboardLayout", "UInt", thread_id, "Ptr")

        return input_locale_id
    }
}

get_current_layout() {
    layout_ids := config_get(["layouts", "layout_ids"])

    if (n(layout_ids) && is_arr(layout_ids)) {
        current_layout_id := get_current_layout_id()
        is_cmd_window := current_layout_id = 0

        if (is_cmd_window = True) {
            return "cmd"
        }

        layout_i := find_i_in_array(current_layout_id, layout_ids)

        if (layout_i is integer) {
            layout_name := config_get(["layouts", "all_layouts_ordered", layout_i])

            return layout_name
        }
    }

    return "not_found"
}

display_current_layout_id() {
    current_layout_id := get_current_layout_id()

    MsgBox("Current layout ID: " current_layout_id)
}

get_next_current_secondary_layout_i() {
    secondary_layouts := config_get(["layouts", "secondary_layouts"])
    current_layout := get_current_layout()

    if (n(secondary_layouts) is_arr(secondary_layouts) && current_layout != "not_found") {
        secondary_layout_offset_plus_1 := find_i_in_array(current_layout, secondary_layouts) + 1

        if (secondary_layout_offset_plus_1 > secondary_layouts.Length) {
            return 1
        } else {
            return secondary_layout_offset_plus_1
        }
    } else {
        return 1
    }
}

switch_layout_on_exe_change() {
    global switching_layout_with_dedicated_hotkey
    global last_exe
    global last_exe_was_present_in_conditional_exe_list

    try {
        window_class := WinGetClass("A")
        new_exe := WinGetProcessName("A")
        new_exe_name := StrReplace(new_exe, ".exe", "")
        new_exe_is_present_in_conditional_exe_list := n(config_get([new_exe_name], get_exe_obj()))

        if (window_class != 'Shell_TrayWnd' && new_exe_name != 'SearchHost' && new_exe != last_exe && (new_exe_is_present_in_conditional_exe_list || last_exe_was_present_in_conditional_exe_list)) { ; window_class != 'Shell_TrayWnd' = prevent incorrect layout change when user presses Win key in a game, then on desktop clicked on the game icon in taskbar. / new_exe_name != 'SearchHost' = prevent incorrect layout change when user Win.
            last_exe_was_present_in_conditional_exe_list := false
            last_exe := new_exe
            new_layout := get_exe_config_val("layout", false)

            switching_layout_with_dedicated_hotkey := true

            switch_layout(new_layout, true)
        }

        if (new_exe_is_present_in_conditional_exe_list) {
            last_exe_was_present_in_conditional_exe_list := true
        }

        last_exe := new_exe
    }
}

on_exe_change() {
    watch_any_window_activation(exe_change_handler)
}

exe_change_handler(*) {
    global last_switched_layout

    switch_layout_on_exe_change()
    bind_unbind_context_hotkeys(last_switched_layout)
}