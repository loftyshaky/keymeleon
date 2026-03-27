n(val := "") { ; not empty
    return val != ""
}

is_arr(var) {
    return Type(var) = "Array"
}

find_i_in_array(val, arr) {
    for (i, array_item in arr) {
        if (val = array_item) {
            return i
        }
    }
}

join(arr, sep) {
    result := ""

    for str in arr
        result .= str " " sep
    return RTrim(result, sep)
}

map_to_string(map) {
    result := "Map Contents:`n"

    for (key, val in map) {
        result .= key ": " (IsObject(val) ? "{object}" : val) "`n"
    }

    return result
}

register_shell_hook_1(callback) { ; If you use resume_current_process_suspended when you're on desktop without any app maximized the app game will open, MINIMIZE and then suspend instead of open and suspend. The register_shell_hook_2 is alternative hook which fixes this.
    DllCall("RegisterShellHookWindow", "UInt", A_ScriptHwnd)
    OnMessage(DllCall("RegisterWindowMessage", "Str", "SHELLHOOK"), callback)
}

register_shell_hook_2(callback) {
    event_min := 0x0003
    event_max := 0x0003

    callback_ptr := CallbackCreate(callback, "F")

    DllCall("SetWinEventHook", "UInt", event_min, "UInt", event_max, "Ptr", 0, "Ptr", callback_ptr, "UInt", 0, "UInt",
        0, "UInt", 0, "Ptr")
}

check_if_changed_active_window_1(w_param) { ; Params: w_param, l_param, msg, hwnd.
    return w_param == 4 || w_param == 32772
}

check_if_changed_active_window_2(event) { ; Params: h_hook, event, hwnd, id_object, id_child, dw_event_thread, dwms_event_time
    return event == 0x0003
}
