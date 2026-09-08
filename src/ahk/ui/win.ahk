display_main_page(dimensions_obj) {
    global main_win
    global main_wvc
    global main_wv
    global is_maximized
    global is_minimized

    if (is_maximized) {
        main_win.Maximize()
    } else {
        main_win.Show("W" dimensions_obj["width"] " H" dimensions_obj["height"] " X" dimensions_obj[
            "x"] " Y" dimensions_obj["y"])

    }

    set_win_icon_w(main_win)

    WinActivate(main_win.Hwnd)

    main_wvc := WebView2.CreateControllerAsync(main_win.Hwnd).await2()
    main_wv := main_wvc.CoreWebView2
    main_wvc.add_AcceleratorKeyPressed(disable_page_refresh)
    main_wv.add_ContextMenuRequested(remove_context_menu_items)
    main_wv.add_WebMessageReceived(on_message)
    main_wv.add_NewWindowRequested(on_new_window)

    navigate_page(main_wv, "settings")
}

display_dependencies_page() {
    global dependencies_win
    global dependencies_wvc
    global dependencies_wv

    dependencies_win.Show("W1024 H768")

    set_win_icon_w(dependencies_win)

    WinActivate(dependencies_win.Hwnd)

    dependencies_wvc := WebView2.CreateControllerAsync(dependencies_win.Hwnd).await2()
    dependencies_wv := dependencies_wvc.CoreWebView2
    dependencies_wvc.add_AcceleratorKeyPressed(disable_page_refresh)
    dependencies_wv.add_ContextMenuRequested(remove_context_menu_items)
    dependencies_wv.add_WebMessageReceived(on_message)

    navigate_page(dependencies_wv, "dependencies")
}

navigate_page(wv, page_name) {
    wv.SetVirtualHostNameToFolderMapping("app.localhost", A_ScriptDir, 2)
    wv.Navigate("http://app.localhost/" page_name ".html")
}

main_win_size(gui_obj, min_max, client_width, client_height) {
    global window_was_closed
    global is_maximized
    global previous_is_maximized
    global restored_down_once
    global windows_obj_exists

    if (min_max = -1) {
        previous_is_maximized := is_maximized
    } else {
        previous_is_maximized := ""
    }

    dimensions_obj := get_dimensions_from_config()
    is_minimized := false
    restored_down := min_max = 0 && is_maximized
    window_was_closed_copy := window_was_closed

    if (restored_down) { ; Restored down - when restoring down from maximized
        is_maximized := false

        if (!restored_down_once) {
            win_move(dimensions_obj)
        }

        set_dimension_to_config("is_maximized", is_maximized)
    } else if (min_max = 1) { ; Maximized
        is_maximized := true

        set_dimension_to_config("is_maximized", is_maximized)
    } else if (min_max = -1) { ; Minimized
        is_maximized := false
        is_minimized := true

        set_dimension_to_config("is_maximized", is_maximized)
        set_dimension_to_config("is_minimized", is_minimized)
    } else if (window_was_closed_copy) { ; Restored down - when opening settings page in restored down state
        window_was_closed := 0

        win_move(dimensions_obj)
    }

    if (windows_obj_exists && !window_was_closed_copy) {
        set_dimension_to_config("is_maximized", is_maximized)

        if (!is_minimized) {
            if (is_maximized) {
                config_from_file := get_config(config_path)

                config_write(config_from_file, false)

            } else {
                WinGetPos(, , &win_width, &win_height, "ahk_id " gui_obj.hwnd)
                WinGetClientPos(, , &new_client_width, &new_client_height, "ahk_id " gui_obj.hwnd)

                set_dimension_to_config("width", win_width)
                set_dimension_to_config("height", win_height)
            }
        }
    }

    if (min_max != -1) {
        try main_wvc.Fill()
    }

    if (restored_down) {
        restored_down_once := true
    }
}

dependencies_win_size(gui_obj, min_max, client_width, client_height) {
    global dependencies_wvc

    if (min_max != -1) {
        try dependencies_wvc.Fill()
    }
}

win_hide() {
    global main_win
    global is_maximized
    global previous_is_maximized

    restored_down_once := false

    min_max := WinGetMinMax(main_win)

    if (n(previous_is_maximized)) {
        is_maximized := previous_is_maximized
    }

    main_win.Hide()

}

win_move(dimensions_obj) { ; set x and y coords as well as width and height of window
    global main_win

    WinMove(dimensions_obj["x"], dimensions_obj["y"],
        dimensions_obj["width"], dimensions_obj["height"],
        main_win)
}

main_win_drag(w_param, l_param, msg, hwnd) {
    global config
    global windows_obj_exists

    min_max := WinGetMinMax("ahk_id " hwnd)

    if (min_max != 0) { ; Maximized or minimized
        return
    }

    WinGetPos(&win_x, &win_y, , , "ahk_id " hwnd)

    if (hwnd = main_win.Hwnd) {
        if (windows_obj_exists) {
            set_dimension_to_config("x", win_x)
            set_dimension_to_config("y", win_y)

            config_from_file := get_config(config_path)

            config_write(config_from_file, false)
        }
    }
}

set_dimension_to_config(key, dimension) {
    config_from_file := get_config(config_path)

    config_from_file["prefs"]["window"]["dimensions"][key] := dimension

    config_write(config_from_file, false)
}

get_dimensions_from_config() {
    global windows_obj_exists

    config_from_file := get_config(config_path)
    window_obj := config_get(["prefs", "window"], "", config_from_file)
    windows_obj_exists := n(window_obj)

    default_dimensions_obj := Map()
    default_dimensions_obj["is_maximized"] := 1
    default_dimensions_obj["x"] := 50
    default_dimensions_obj["y"] := 50
    default_dimensions_obj["width"] := 1150
    default_dimensions_obj["height"] := 800

    dimensions_obj := config_get(["dimensions"], window_obj, config_from_file)
    dimensions_obj_final := n(dimensions_obj) ? dimensions_obj : default_dimensions_obj

    if (windows_obj_exists) {
        config_from_file["prefs"]["window"]["dimensions"] := dimensions_obj_final

        config_write(config_from_file, false)

        config_is_maximized := config_get(["is_maximized"], dimensions_obj_final, config_from_file)
        config_x := config_get(["x"], dimensions_obj_final, config_from_file)
        config_y := config_get(["y"], dimensions_obj_final, config_from_file)
        config_width := config_get(["width"], dimensions_obj_final, config_from_file)
        config_height := config_get(["height"], dimensions_obj_final, config_from_file)

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

disable_page_refresh(source, args) {
    is_f5_down := GetKeyState("F5", "P")
    is_r_down := GetKeyState("r", "P")
    is_ctrl_down := GetKeyState("Ctrl", "P")

    if ((is_r_down && is_ctrl_down) || is_f5_down) {
        args.IsBrowserAcceleratorKeyEnabled := false
        args.Handled := true
    }
}

remove_context_menu_items(source, args) {
    menu_items := args.MenuItems
    menu_items_length := menu_items.Count

    loop (menu_items_length) {
        i := menu_items_length - A_Index
        item := menu_items.GetValueAtIndex(i)

        if (item.Name != "inspectElement") {
            menu_items.RemoveValueAtIndex(i)
        }
    }
}

on_new_window(wv, args) { ; Opens links in default browser.
    url := args.Uri

    if (!InStr(url, "app.localhost")) {
        Run(url)

        args.Handled := true
    }

}
