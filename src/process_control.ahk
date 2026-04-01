#Requires AutoHotkey v2.0

is_suspended := Map()
is_focused := Map()
last_suspended_exe := ""
last_minimized_exe := ""
currently_focused_exe := ""

toggle_current_process_minimized_state() {
    global currently_focused_exe
    global last_minimized_exe

    if (!process_is_suspended(currently_focused_exe)) {
        target_exe := "ahk_exe " (last_minimized_exe == "" ? currently_focused_exe : last_minimized_exe) ".exe"

        if (WinActive(target_exe)) {
            last_minimized_exe := currently_focused_exe

            simulate_print_screen("pre_minimize_screenshot")
            minimize_window(target_exe)
        } else {
            last_minimized_exe := ""

            activate_window(target_exe)
        }
    }
}

minimize_window(target_exe) {
    if (currently_focused_exe != "" && WinExist(target_exe)) {
        WinMinimize(target_exe)
    }
}

activate_window(target_exe) {
    if (currently_focused_exe != "" && WinExist(target_exe)) {
        WinActivate(target_exe)
    }
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
            activate_window(last_suspended_exe_title)
        }

        is_suspended[last_suspended_exe] := false
        last_suspended_exe := ""

        if (currently_focused_exe_is_the_same_as_last_suspended_exe && mode == "minimize_and_suspend" &&
            last_suspended_exe_window_is_active) {
            toggle_process_suspend_state(mode, true)
        }

        if (mode == "resume_current_process_suspended") {
            toggle_process_suspend_state("resume_current_process_suspended_recursive", true, is_focused_current_for_arg
            )
        }

    }
    else if ((mode == "minimize_and_suspend" || mode == "resume_current_process_suspended") && !WinActive(
        currently_focused_exe_title)) {
        activate_window(currently_focused_exe_title)

        if (mode == "resume_current_process_suspended") {
            toggle_process_suspend_state("resume_current_process_suspended_recursive", true, is_focused_current_for_arg
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

            minimize_window(currently_focused_exe_title)
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

            is_suspended[exe_name] := false
        }

        last_suspended_exe := ""
    }
}

fill_is_suspended_arr() {
    global is_suspended
    global is_focused

    target_processes := config_get(["process_control", "target_processes"])

    if (n(target_processes) && is_arr(target_processes)) {
        for (i, exe_name in target_processes) {
            is_suspended[exe_name] := false
            is_focused[exe_name] := false
        }
    }
}

listen_for_focus_change() {
    global change_focus_event
    global currently_focused_exe
    global last_suspended_exe
    global last_minimized_exe

    target_processes := config_get(["process_control", "target_processes"])

    if (n(target_processes) && is_arr(target_processes)) {
        register_shell_hook(focus_change_handler, change_focus_event, change_focus_event)

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

    hotkey_actions := Map(
        "toggle_current_process_suspend_state", (*) => toggle_current_process_suspend_state(),
        "toggle_current_process_minimize_and_suspend_state", (*) =>
            toggle_current_process_minimize_and_suspend_state(),
        "resume_current_process_suspended", (*) => resume_current_process_suspended(),
        "resume_all_suspended_processes", (*) => resume_all_suspended_processes(),
        "toggle_current_process_minimized_state", (*) => toggle_current_process_minimized_state()
    )

    for (action, callback in hotkey_actions) {
        bind_hotkey_to_function(["hotkeys", action], callback, false)

        if (n(target_processes) && is_arr(target_processes)) {
            for (i, exe_name in target_processes) {
                bind_hotkey_to_function(
                    ["hotkeys", "context_remap", "exe", exe_name, action],
                    callback,
                    false
                )
            }
        }
    }

    for (action, callback in hotkey_actions) {
        context_setting := config_get(["hotkeys", "context_remap", "exe", focused_exe_name, action])

        if (n(context_setting)) {
            bind_hotkey_to_function(
                ["hotkeys", "context_remap", "exe", focused_exe_name, action],
                callback,
                true
            )
        } else {
            bind_hotkey_to_function(["hotkeys", action], callback, true)
        }
    }
}
