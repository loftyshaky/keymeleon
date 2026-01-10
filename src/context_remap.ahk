bind_context_hotkey(input_binding_i, input_binding, ignore_modifiers, allow_native_function, keys_are_enabled, found_exe_hotkey) {
    Hotkey((allow_native_function ? "~" : "") (ignore_modifiers ? "*" : "") input_binding, (*) => run_hotkey(input_binding, input_binding_i, found_exe_hotkey, allow_native_function), keys_are_enabled)
}

bind_unbind_context_hotkeys(current_layout := 'none') {
    if (current_layout == 'none') {
        current_layout := get_current_layout()
    }

    input_bindings := config_get(["hotkeys", "context_remap", "input_bindings"])

    if (n(input_bindings) && IsObject(input_bindings)) {
        for (input_binding_i, input_binding in input_bindings) {
            enable_all_bindings := config_get(["features", "enable_all_bindings"])

            input_binding_is_obj := IsObject(input_binding)
            key := config_get(["key"], input_binding)
            macro := config_get(["macro"], input_binding)
            key_or_macro := n(key) ? key : macro
            input_binding := input_binding_is_obj && n(key_or_macro) ? key_or_macro : input_binding

            exe_key_bindings := get_exe_config_val("key_bindings", false)
            found_exe_hotkey := n(config_get([input_binding_i], exe_key_bindings))
            exe_key_binding := config_get([input_binding_i], exe_key_bindings)
            exe_key_binding_is_obj := IsObject(exe_key_binding)
            binding_disabled_layouts_val := get_exe_config_val("binding_disabled_layouts", false)
            binding_disabled_layouts_arr := is_arr(binding_disabled_layouts_val) ? binding_disabled_layouts_val : []

            ignore_modifiers_obj_val := config_get(["ignore_modifiers"], exe_key_binding)
            ignore_modifiers_obj_bool := ignore_modifiers_obj_val = "" ? 0 : ignore_modifiers_obj_val
            allow_native_function_obj_val := config_get(["allow_native_function"], exe_key_binding)
            allow_native_function_obj_bool := allow_native_function_obj_val = "" ? 1 : allow_native_function_obj_val
            ignore_modifiers := exe_key_binding_is_obj ? ignore_modifiers_obj_bool : 0
            allow_native_function := exe_key_binding_is_obj ? allow_native_function_obj_bool : 1

            current_layout_is_in_binding_disabled_layouts := find_i_in_array(current_layout, binding_disabled_layouts_arr)

            bind_context_hotkey(input_binding_i, input_binding, ignore_modifiers, allow_native_function, "Off", false)

            if (enable_all_bindings && !current_layout_is_in_binding_disabled_layouts) {
                bind_context_hotkey(input_binding_i, input_binding, ignore_modifiers, allow_native_function, "On", found_exe_hotkey)
            }
        }
    }
}

run_hotkey(input_binding, input_binding_i, found_exe_hotkey, allow_native_function) {
    if (found_exe_hotkey) {
        exe_key_bindings := get_exe_config_val("key_bindings", false)
        exe_key_binding := config_get([input_binding_i], exe_key_bindings)

        if (n(exe_key_binding)) {
            if (!allow_native_function) {
                ;SendInput("{vkE8}")
            }

            send_one_command_or_run_macro(input_binding, exe_key_binding)
        }
    }

    ;release_keys()
}

get_current_exe_name() {
    exes := config_get(["hotkeys", "context_remap", "exe"])
    exe_name_final := "default"

    if (n(exes) && IsObject(exes)) {
        for (exe_name, exe in exes) {
            if (WinActive("ahk_exe " exe_name ".exe")) {
                exe_name_final := exe_name

                break
            }
        }
    }

    return exe_name_final
}


send_one_command_or_run_macro(input_binding, exe_key_binding) {
    input_binding_modifiers := get_input_binding_modifiers(input_binding)


    if (is_arr(exe_key_binding) || n(config_get(["macro"], exe_key_binding))) {
        send_macro(input_binding_modifiers, exe_key_binding)
    } else {
        send_one_command(input_binding_modifiers, exe_key_binding)
    }
}

send_one_command(input_binding_modifiers, exe_key_binding) {
    ;release_key("Ctrl")
    ;release_key("Shift")
    ;release_key("Alt")
    ;release_key("LWin")
    ;release_key("RWin")

    ;KeyWait("Control")
    ;KeyWait("Shift")
    ;KeyWait("Alt")
    ;KeyWait("LWin")
    ;KeyWait("RWin")

    if (IsObject(exe_key_binding)) {
        key := config_get(["key"], exe_key_binding)
        wait := config_get(["wait"], exe_key_binding)
        wait_final := n(wait) ? wait : 0
        key_wait := config_get(["key_wait"], exe_key_binding)
        key_wait_final := n(key_wait) ? key_wait : 0
        modifiers := config_get(["modifiers"], exe_key_binding)
        modifier_keys_final := is_arr(modifiers) ? modifiers : [modifiers]
        delay_before := config_get(["delay_before"], exe_key_binding)
        delay_before_final := n(delay_before) ? delay_before : 0
        delay_between := config_get(["delay_between"], exe_key_binding)
        delay_between_final := n(delay_between) ? delay_between : 0
        pre_key_delay := config_get(["pre_key_delay"], exe_key_binding)
        pre_key_delay_final := n(pre_key_delay) ? pre_key_delay : 0
        post_key_delay := config_get(["post_key_delay"], exe_key_binding)
        post_key_delay_final := n(post_key_delay) ? post_key_delay : 0
        modifiers_release_timeout := config_get(["modifiers_release_timeout"], exe_key_binding)
        modifiers_release_timeout_final := n(modifiers_release_timeout) ? modifiers_release_timeout : 0
        modifier_keys_exist := n(modifiers) && modifier_keys_final.Length != 0

        if (n(key)) {
            release_input_binding_modifiers(input_binding_modifiers, modifiers_release_timeout_final)
            Sleep(delay_before_final)

            if (modifier_keys_exist) {
                send_modifier_keys(modifier_keys_final, "down", "none")
                Sleep(pre_key_delay_final)
            }

            if (wait_final || key_wait_final) {
                SendInput("{" key " down}")
                key_wait_f(wait_final, key_wait_final)
                SendInput("{" key " up}")
            } else {
                SendInput("{" key " down}")
                Sleep(delay_between_final)
                SendInput("{" key " up}")
            }

            if (modifier_keys_exist) {
                Sleep(post_key_delay_final)
                send_modifier_keys(modifier_keys_final, "up", true)
            }

        }

    } else {
        SendInput("{" exe_key_binding " down}")
        SendInput("{" exe_key_binding " up}")
    }
}

send_macro(input_binding_modifiers, exe_key_binding) {
    macro_items_inner := config_get(["macro"], exe_key_binding)
    macro_items_final := []
    repeat_count := config_get(["repeat_count"], exe_key_binding)
    modifiers_release_timeout := config_get(["modifiers_release_timeout"], exe_key_binding)
    modifiers_release_timeout_final := n(modifiers_release_timeout) ? modifiers_release_timeout : 0

    release_input_binding_modifiers(input_binding_modifiers, modifiers_release_timeout_final)

    if (repeat_count && n(macro_items_inner)) {
        Loop repeat_count {
            for (i, macro_item_2 in macro_items_inner) {
                macro_items_final.push(macro_item_2)
            }
        }
    } else {
        for (i, macro_item in (n(macro_items_inner) ? macro_items_inner : exe_key_binding)) {
            repeatable_macro := config_get(["macro"], macro_item)
            repeatable_macro_repeat_count := config_get(["repeat_count"], macro_item)

            if (n(repeatable_macro)) {
                if (n(repeatable_macro_repeat_count)) {
                    Loop repeatable_macro_repeat_count {
                        for (i, macro_item_2 in repeatable_macro) {
                            macro_items_final.push(macro_item_2)
                        }
                    }
                } else {
                    for (i, macro_item_2 in repeatable_macro) {
                        macro_items_final.push(macro_item_2)
                    }
                }
            } else {
                macro_items_final.push(macro_item)
            }
        }
    }

    last_macro_item := macro_items_final[macro_items_final.Length]
    delay := config_get(["delay"], last_macro_item)

    if (n(delay)) {
        macro_items_final.Pop()
    }

    for (i, macro_item in macro_items_final) {
        send_macro_item(macro_item)
    }
}

send_macro_item(macro_item) {
    key := config_get(["key"], macro_item)
    delay := config_get(["delay"], macro_item)
    wait := config_get(["wait"], macro_item)
    wait_final := n(wait) ? wait : 0
    key_wait := config_get(["key_wait"], macro_item)
    key_wait_final := n(key_wait) ? key_wait : 0

    if (wait_final || key_wait_final) {
        key_wait_f(wait_final, key_wait_final)
    } if (n(key)) {
        SendInput("{" key "}")
    } else if (n(delay)) {
        Sleep(delay)
    }
}

send_modifier_keys(modifiers, state, state_compare) {
    for (i, modifier_key in modifiers) {
        if (state_compare = 'none' || GetKeyState(modifier_key) = state_compare) {
            SendInput("{" modifier_key " " state "}")
        }
    }
}

get_input_binding_modifiers(input_binding) {
    modifier_array := []

    if (InStr(input_binding, "^")) {
        modifier_array.push("Ctrl")
    }

    if (InStr(input_binding, "!")) {
        modifier_array.push("Alt")
    }

    if (InStr(input_binding, "+")) {
        modifier_array.push("Shift")
    }

    if (InStr(input_binding, "#")) {
        modifier_array.push("LWin")
        modifier_array.push("RWin")
    }

    return modifier_array
}

get_modifier_string(modifiers) {
    modifier_string := ""

    for (i, modifier_key in modifiers) {
        if (InStr(modifier_key, "Ctrl")) {
            modifier_string .= "^"
        } else if (InStr(modifier_key, "!")) {
            modifier_string .= "!"
        } else if (InStr(modifier_key, "+")) {
            modifier_string .= "+"
        } else if (InStr(modifier_key, "Win")) {
            modifier_string .= "#"
        }
    }

    return modifier_string
}

release_input_binding_modifiers(input_binding_modifiers, modifiers_release_timeout) {
    for (i, input_binding_modifier in input_binding_modifiers) {
        SendInput("{" input_binding_modifier " up}")
    }

    for (i, input_binding_modifier in input_binding_modifiers) {
        KeyWait(input_binding_modifier, "T" (modifiers_release_timeout / 1000))
    }
}

release_keys() {
    modifiers := [
        "LCtrl",
        "RCtrl",
        "LAlt",
        "RAlt",
        "LShift",
        "RShift",
        "LWin",
        "RWin"
    ]

    for (i, modifier_key in modifiers) {
        if (GetKeyState(modifier_key)) {
            ControlSend("{Blind}{" modifier_key " Up}", , "A")
        }
    }
}

key_wait_f(wait, key_wait) {
    if (wait || key_wait) {
        KeyWait(key_wait ? key_wait : RegExReplace(A_ThisHotkey, "[\~\^\!\+\#]"))
    }
}