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

watch_any_window_activation(callback) {
    on_window_activate(w_param, l_param, msg, hwnd) {
        if (w_param = 4 || w_param = 32772) { ; HSHELL_WINDOWACTIVATE
            callback(w_param, l_param, msg, hwnd)
        }
    }

    DllCall("RegisterShellHookWindow", "UInt", A_ScriptHwnd)
    msg_num := DllCall("RegisterWindowMessage", "Str", "SHELLHOOK")
    OnMessage(msg_num, on_window_activate)
}
