EVENT_OBJECT_REORDER := 0x8004
EVENT_SYSTEM_FOREGROUND := 0x0003      ; Window gets foreground (Alt+Tab)

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

register_shell_hook(callback, event_min, event_max) {
    callback_ptr := CallbackCreate(callback, "F")

    DllCall("SetWinEventHook", "UInt", event_min, "UInt", event_max, "Ptr", 0, "Ptr", callback_ptr, "UInt", 0, "UInt",
        0, "UInt", 0, "Ptr")
}

check_if_changed_active_window(event) { ; Params: h_hook, event, hwnd, id_object, id_child, dw_event_thread, dwms_event_time
    global EVENT_OBJECT_REORDER
    global EVENT_SYSTEM_FOREGROUND

    return event == EVENT_OBJECT_REORDER || event == EVENT_SYSTEM_FOREGROUND
}
