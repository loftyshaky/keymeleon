#Requires AutoHotkey v2.0

is_suspended := Map()
is_focused := Map()
exe_dims := Map()
last_suspended_exe := ""
last_minimized_exe := ""
currently_focused_exe := ""

toggle_current_process_minimized_state() {
    global currently_focused_exe
    global last_minimized_exe

    if (!process_is_suspended(currently_focused_exe)) {
        target_exe_name := (last_minimized_exe == "" ? currently_focused_exe : last_minimized_exe)
        target_exe := "ahk_exe " target_exe_name ".exe"

        if (WinActive(target_exe)) {
            last_minimized_exe := currently_focused_exe

            simulate_print_screen("pre_minimize_screenshot")
            minimize_window(target_exe_name)
        } else {
            last_minimized_exe := ""

            show_window(target_exe_name)
        }
    }
}

minimize_window(target_exe_name) {
    target_exe := "ahk_exe " target_exe_name ".exe"

    if (currently_focused_exe != "" && WinExist(target_exe)) {
        process_minimize_method := config_get(["hotkeys", "context_remap", "exe", target_exe_name,
            "process_minimize_method"])

        if (!n(process_minimize_method) || process_minimize_method == "minimize") {
            WinMinimize(target_exe)
        } else if (process_minimize_method == "hide") {
            hide_window(target_exe)
        } else if (process_minimize_method == "reposition") {
            move_window_off_screen(target_exe_name)
        }
    }
}

show_window(target_exe_name, force := false) {
    target_exe := "ahk_exe " target_exe_name ".exe"

    if (currently_focused_exe != "" || force) {
        process_minimize_method := config_get(["hotkeys", "context_remap", "exe", target_exe_name,
            "process_minimize_method"])
        shown_window := false

        if (WinExist(target_exe)) {
            if (!n(process_minimize_method) || process_minimize_method == "minimize") {
                WinRestore(target_exe)

                shown_window := true
            } else if (process_minimize_method == "hide") {
                WinShow(target_exe)

                shown_window := true
            } else if (process_minimize_method == "reposition") {
                restore_window_position(target_exe_name)

                shown_window := true
            }
        }

        if (shown_window && WinExist(target_exe)) {
            WinActivate(target_exe)
        }
    }
}

hide_window(target_exe) {
    WinHide(target_exe)

    focus_on_desktop()
}

move_window_off_screen(target_exe_name) {
    global exe_dims

    target_exe := "ahk_exe " target_exe_name ".exe"
    hwnd := WinExist(target_exe)

    if (hwnd) {
        set_exe_window_original_dims(target_exe_name)

        WinMove(99999, 99999, , , hwnd)

        focus_on_desktop()
        toggle_taskbar_and_alt_tab_itmes(false, hwnd)
    }
}

restore_window_position(target_exe_name) {
    global exe_dims

    target_exe := "ahk_exe " target_exe_name ".exe"
    hwnd := WinExist(target_exe)

    if (hwnd) {
        WinMove(exe_dims[target_exe_name]["original_x"], exe_dims[target_exe_name]["original_y"], , , hwnd)

        toggle_taskbar_and_alt_tab_itmes(true, hwnd)
    }
}

set_exe_window_original_dims(target_exe_name) {
    WinGetPos(&original_x, &original_y, &original_w, &original_h)

    exe_dims[target_exe_name]["original_x"] := original_x
    exe_dims[target_exe_name]["original_y"] := original_y
}

focus_on_desktop() {
    WinActivate("ahk_class Progman")
}

toggle_taskbar_and_alt_tab_itmes(show, hwnd) {
    WinSetExStyle((show ? "-" : "+") "0x80", hwnd) ; Alt+Tab
    WinSetExStyle((show ? "+" : "-") "0x40000", hwnd) ; Taskbar
}

process_is_suspended(exe_name) {
    global is_suspended
    global last_suspended_exe

    return last_suspended_exe == "" ? false : is_suspended[last_suspended_exe]
}

toggle_process_suspend_state_inner(need_to_suspend, exe_name) {
    pid := get_process_pid(exe_name)

    if (pid) {
        process_handle := DllCall("OpenProcess", "UInt", 0x1F0FFF, "Int", 0, "Int", pid, "Ptr")

        if (!process_handle) {
            return
        }

        DllCall("ntdll.dll\Nt" (need_to_suspend ? "Suspend" : "Resume") "Process", "Ptr", process_handle)
        DllCall("CloseHandle", "Ptr", process_handle)
    }
}

get_process_pid(exe_name) {
    pid_or_exe_name_with_exe_suffix := exe_name ".exe"
    pid := ProcessExist(pid_or_exe_name_with_exe_suffix)

    if (pid) {
        return pid
    }

    return false
}

toggle_process_suspend_state(mode, new_is_suspended_state := unset, is_focused_last := false) {
    global is_suspended
    global is_focused
    global last_suspended_exe
    global currently_focused_exe

    one_of_the_exes_suspended := last_suspended_exe != ""
    target_processes := config_get(["process_control", "target_processes"])
    found_exe_name_in_toggle_process_suspend_exes_arr := false
    last_suspended_exe_title := "ahk_exe " last_suspended_exe ".exe"
    currently_focused_exe_copy := currently_focused_exe
    is_focused_current_for_arg := last_suspended_exe != "" && is_focused[last_suspended_exe]
    currently_focused_exe_title := "ahk_exe " currently_focused_exe_copy ".exe"

    if (n(target_processes) && is_arr(target_processes)) {
        found_exe_name_in_toggle_process_suspend_exes_arr := n(find_i_in_array(currently_focused_exe,
            target_processes))
    }

    if (one_of_the_exes_suspended) { ; Resume
        last_suspended_exe_window_is_active := WinActive(last_suspended_exe_title)
        currently_focused_exe_is_the_same_as_last_suspended_exe := currently_focused_exe == last_suspended_exe
        resume_pre_focus_delay := get_delay('resume_pre_unminimize')

        toggle_process_suspend_state_inner(false, last_suspended_exe)

        if (WinExist(last_suspended_exe_title) && (mode == "minimize_and_suspend" || mode ==
            "resume_current_process_suspended")) {
            Sleep(resume_pre_focus_delay)

            show_window(last_suspended_exe)
        }

        is_suspended[last_suspended_exe] := false
        last_suspended_exe := ""

        if (currently_focused_exe_is_the_same_as_last_suspended_exe && mode == "minimize_and_suspend" &&
            last_suspended_exe_window_is_active) {
            toggle_process_suspend_state(mode, true)
        }

        if (mode == "resume_current_process_suspended") {
            toggle_process_suspend_state("resume_current_process_suspended_recursive", true,
                is_focused_current_for_arg
            )
        }

    }
    else if ((mode == "minimize_and_suspend" || mode == "resume_current_process_suspended") && !WinActive(
        currently_focused_exe_title)) {
        show_window(currently_focused_exe_copy)

        if (mode == "resume_current_process_suspended") {
            toggle_process_suspend_state("resume_current_process_suspended_recursive", true,
                is_focused_current_for_arg
            )
        }
    } else if (found_exe_name_in_toggle_process_suspend_exes_arr) {
        simulate_print_screen("pre_suspend_screenshot")

        currently_focused_exe_copy := currently_focused_exe
        new_is_suspended_state_2 := IsSet(new_is_suspended_state) ? new_is_suspended_state : !is_suspended[
            currently_focused_exe_copy]

        if (mode == "minimize_and_suspend" || mode == "resume_current_process_suspended" || (mode ==
            "resume_current_process_suspended_recursive" && is_focused_last)) {
            suspend_post_minimize_delay := get_delay('suspend_post_minimize')

            minimize_window(currently_focused_exe_copy)
            Sleep(suspend_post_minimize_delay)
        }

        is_suspended[currently_focused_exe_copy] := new_is_suspended_state_2
        last_suspended_exe := currently_focused_exe_copy

        toggle_process_suspend_state_inner(new_is_suspended_state_2, currently_focused_exe_copy)

    }
}

toggle_current_process_suspend_state() {
    toggle_process_suspend_state('suspend_toggle')
}

toggle_current_process_minimize_and_suspend_state() {
    toggle_process_suspend_state('minimize_and_suspend')
}

resume_current_process_suspended() {
    global currently_focused_exe

    toggle_process_suspend_state('resume_current_process_suspended')
}

resume_all_suspended_processes() {
    global is_suspended
    global last_suspended_exe

    target_processes := config_get(["process_control", "target_processes"])

    if (n(target_processes) && is_arr(target_processes)) {
        for (i, exe_name in target_processes) {
            toggle_process_suspend_state_inner(false, exe_name)

            show_window(exe_name, true)

            is_suspended[exe_name] := false
        }

        last_suspended_exe := ""
    }
}

fill_arr_vals() {
    global is_suspended
    global is_focused
    global exe_dims

    target_processes := config_get(["process_control", "target_processes"])

    if (n(target_processes) && is_arr(target_processes)) {
        for (i, exe_name in target_processes) {
            is_suspended[exe_name] := false
            is_focused[exe_name] := false
            exe_dims[exe_name] := Map()
            exe_dims[exe_name]["original_x"] := 0
            exe_dims[exe_name]["original_y"] := 0

        }
    }
}

listen_for_focus_change() {
    global EVENT_SYSTEM_FOREGROUND
    global currently_focused_exe
    global last_suspended_exe
    global last_minimized_exe

    target_processes := config_get(["process_control", "target_processes"])

    if (n(target_processes) && is_arr(target_processes)) {
        register_shell_hook(focus_change_handler, EVENT_SYSTEM_FOREGROUND, EVENT_SYSTEM_FOREGROUND)

        focus_change_handler(h_hook, event, hwnd, id_object, id_child, dw_event_thread, dwms_event_time) {
            one_of_the_exe_is_focused := false
            focused_exe_name := ''

            try {
                if (check_if_changed_active_window(event)) {
                    window_process := WinGetProcessName("ahk_id " hwnd)
                    target_processes := config_get(["process_control", "target_processes"])

                    for (i, exe_name in target_processes) {
                        if (window_process == exe_name ".exe") {
                            one_of_the_exe_is_focused := true
                            focused_exe_name := exe_name

                            if (currently_focused_exe != exe_name) {
                                last_suspended_exe := ""
                            }

                            currently_focused_exe := exe_name
                            last_minimized_exe := last_minimized_exe == exe_name ? "" : last_minimized_exe
                            is_focused[exe_name] := true
                        }
                        else {
                            is_focused[exe_name] := false
                        }
                    }
                }

            }
            catch {
                return
            }

            if (one_of_the_exe_is_focused) {
                bind_process_control_hotkeys_to_function(focused_exe_name)
            } else {
                bound_local := false

                for (i, exe_name in target_processes) {
                    if (WinActive("ahk_exe " exe_name ".exe")) {
                        bound_local := true
                        focused_exe_name := exe_name
                        bind_process_control_hotkeys_to_function(focused_exe_name)

                    }
                }

                if (!bound_local) {
                    bind_process_control_hotkeys_to_function()
                }
            }
        }
    }
}

simulate_print_screen(type) {
    pre_screenshot := config_get(["process_control", type])
    pre_screenshot_delay := get_delay('pre_screenshot')
    post_screenshot_delay := get_delay('post_screenshot')

    if (pre_screenshot) {
        Sleep(pre_screenshot_delay)
        SendInput("{PrintScreen}")
        Sleep(post_screenshot_delay)
    }
}

get_delay(name) {
    delay := config_get(["process_control", name "_delay"])

    return n(delay) ? delay : 100
}

bind_process_control_hotkeys_to_function(focused_exe_name := "") {
    target_processes := config_get(["process_control", "target_processes"])
    minimize_actions := ["toggle_current_process_minimized_state", "resume_all_suspended_processes"]

    hotkey_actions := [
        "toggle_current_process_suspend_state",
        "toggle_current_process_minimize_and_suspend_state",
        "resume_current_process_suspended",
        "resume_all_suspended_processes",
        "toggle_current_process_minimized_state",
    ]

    hotkey_actions_functions := [
        (*) => toggle_current_process_suspend_state(),
        (*) =>
            toggle_current_process_minimize_and_suspend_state(),
        (*) => resume_current_process_suspended(),
        (*) => resume_all_suspended_processes(),
        (*) => toggle_current_process_minimized_state()
    ]

    for (i, action in hotkey_actions) {
        bind_hotkey_to_function(["hotkeys", action], hotkey_actions_functions[i], false)

        if (n(target_processes) && is_arr(target_processes)) {
            for (exe_name_i, exe_name in target_processes) {
                bind_hotkey_to_function(
                    ["hotkeys", "context_remap", "exe", exe_name, action],
                    hotkey_actions_functions[i],
                    false
                )
            }
        }
    }

    for (i, action in hotkey_actions) {
        context_setting := config_get(["hotkeys", "context_remap", "exe", focused_exe_name, action])
        enable_process_suspend_hotkeys := config_get(["hotkeys", "context_remap", "exe", focused_exe_name,
            "enable_process_suspend_hotkeys"])
        is_always_allowed_action := n(find_i_in_array(action,
            minimize_actions))

        if (is_always_allowed_action || enable_process_suspend_hotkeys || focused_exe_name == "") {
            if (n(context_setting)) {
                bind_hotkey_to_function(
                    ["hotkeys", "context_remap", "exe", focused_exe_name, action],
                    hotkey_actions_functions[i],
                    true
                )
            } else {
                bind_hotkey_to_function(["hotkeys", action], hotkey_actions_functions[i], true)
            }
        }
    }
}
