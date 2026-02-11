navigate_page(page_name) {
    wv.SetVirtualHostNameToFolderMapping("app.localhost", A_ScriptDir, 2)
    wv.Navigate("http://app.localhost/" page_name ".html")
}

win_display_initial(dimensions_obj) {
    global wvc
    global wv
    global is_maximized
    global is_minimized

    if (is_maximized) {
        win.Maximize()
    } else {
        win.Show("W" dimensions_obj["width"] " H" dimensions_obj["height"] " X" dimensions_obj[
            "x"] " Y" dimensions_obj["y"])
    }

    set_win_icon_w()

    WinActivate(win.Hwnd)

    wvc := WebView2.create(win.Hwnd)
    wv := wvc.CoreWebView2
    wv.add_WebMessageReceived(on_message)

    navigate_page("settings")
}

win_size(gui_obj, min_max, client_width, client_height) {
    global config
    global is_maximized
    global previous_is_maximized
    global windows_obj_exists

    if (min_max = -1) {
        previous_is_maximized := is_maximized
    } else {
        previous_is_maximized := ""
    }

    dimensions := get_dimensions_from_config()
    is_minimized := false

    if (min_max = 0 && is_maximized) { ; Restored down
        is_maximized := false

        win_move(dimensions)

    } else if (min_max = 1) { ; Maximized
        is_maximized := true
    } else if (min_max = -1) { ; Minimized
        is_maximized := false
        is_minimized := true
    }

    if (windows_obj_exists) {
        set_dimension_to_config("is_maximized", is_maximized)

        if (!is_minimized) {
            if (is_maximized) {
                config_write(config)

            } else {
                WinGetPos(, , &win_width, &win_height, "ahk_id " gui_obj.hwnd)

                set_dimension_to_config("width", is_minimized ? win_width : client_width)
                set_dimension_to_config("height", is_minimized ? win_height : client_height)

                config_write(config)
            }
        }
    }

    if (min_max != -1) {
        try wvc.Fill()
    }
}

win_drag(w_param, l_param, msg, hwnd) {
    global config
    global windows_obj_exists

    min_max := WinGetMinMax("ahk_id " hwnd)

    if (min_max != 0) { ; Maximized or minimized
        return
    }

    WinGetPos(&win_x, &win_y, , , "ahk_id " hwnd)

    if (hwnd = win.Hwnd) {
        if (windows_obj_exists) {
            set_dimension_to_config("x", win_x)
            set_dimension_to_config("y", win_y)

            config_write(config)
        }
    }
}

win_move(dimensions_obj) { ; set x and y coords as well as width and height of window
    global win

    WinMove(dimensions_obj["x"], dimensions_obj["y"],
        dimensions_obj["width"], dimensions_obj["height"],
        win)
}

win_hide() {
    global win
    global is_maximized
    global previous_is_maximized

    min_max := WinGetMinMax(win)

    if (n(previous_is_maximized)) {
        is_maximized := previous_is_maximized
    }

    win.Hide()
}

set_dimension_to_config(key, dimension) {
    global config

    config["prefs"]["window"]["dimensions"][key] := dimension
}

get_dimensions_from_config() {
    global windows_obj_exists

    window_obj := config_get(["prefs", "window"])
    windows_obj_exists := n(window_obj)

    default_dimensions_obj := Map()
    default_dimensions_obj["is_maximized"] := 1
    default_dimensions_obj["x"] := 0
    default_dimensions_obj["y"] := 0
    default_dimensions_obj["width"] := 1000
    default_dimensions_obj["height"] := 700

    dimensions_obj := config_get(["dimensions"], window_obj)
    dimensions_obj_final := n(dimensions_obj) ? dimensions_obj : default_dimensions_obj

    if (windows_obj_exists) {
        config["prefs"]["window"]["dimensions"] := dimensions_obj_final

        config_is_maximized := config_get(["is_maximized"], dimensions_obj_final)
        config_x := config_get(["x"], dimensions_obj_final)
        config_y := config_get(["y"], dimensions_obj_final)
        config_width := config_get(["width"], dimensions_obj_final)
        config_height := config_get(["height"], dimensions_obj_final)

        dimensions_obj_final["is_maximized"] := n(config_is_maximized) ? config_is_maximized :
            default_dimensions_obj["is_maximized"]
        dimensions_obj_final["x"] := n(config_x) ? config_x :
            default_dimensions_obj["x"]
        dimensions_obj_final["y"] := n(config_y) ? config_y :
            default_dimensions_obj["y"]
        dimensions_obj_final["width"] := n(config_width) ? config_width :
            default_dimensions_obj["width"]
        dimensions_obj_final["height"] := n(config_height) ? config_height :
            default_dimensions_obj["height"]
    }

    return dimensions_obj_final
}
