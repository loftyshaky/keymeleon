get_icon_link() {
    enable_windows_api_layout_switching := config_get(["features", "enable_windows_api_layout_switching"])
    icon_file_path_prefix := A_ScriptDir "\icons\change_layout_"
    icon_file_path_type := "win_space"
    icon_file_ext := ".ico"

    if (n(enable_windows_api_layout_switching) && enable_windows_api_layout_switching) {
        icon_file_path_type := "windows_api"
    }

    icon_file_path_prefix := "icons\change_layout_"

    return icon_file_path_prefix icon_file_path_type icon_file_ext
}

set_icons() {
    enable_windows_api_layout_switching := config_get(["features", "enable_windows_api_layout_switching"])
    icon_file_path_prefix := A_ScriptDir "\icons\change_layout_"
    icon_file_path_type := "win_space"
    icon_file_ext := ".ico"

    if (n(enable_windows_api_layout_switching) && enable_windows_api_layout_switching) {
        icon_file_path_type := "windows_api"
    }

    icon_file_path_prefix := "icons\change_layout_"

    icon_link := get_icon_link()

    set_tray_icon(icon_link)
    set_win_icon(icon_link)
}

set_win_icon_w() {
    icon_link := get_icon_link()

    set_win_icon(icon_link)
}

set_tray_icon(icon_link) {
    TraySetIcon(icon_link)
}

set_win_icon(icon_link) {
    global win

    if (!win.Hwnd) {
        return
    }

    if (!WinExist("ahk_id " win.Hwnd)) {
        return
    }

    hIcon := DllCall("LoadImage", "UInt", 0, "Str", icon_link, "UInt", 1, "Int", 0, "Int", 0, "UInt", 0x10)

    if (hIcon) {
        SendMessage(0x80, 0, hIcon, , "ahk_id " win.Hwnd)
        SendMessage(0x80, 1, hIcon, , "ahk_id " win.Hwnd)
    }
    return
}
