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

register_shell_hook(callback) {
    DllCall("RegisterShellHookWindow", "UInt", A_ScriptHwnd)
    OnMessage(DllCall("RegisterWindowMessage", "Str", "SHELLHOOK"), callback)
}

check_if_active_window_changed(w_param) {
    return w_param = 4 || w_param = 32772
}
