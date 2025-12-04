set_tray_icon() {
    enable_windows_api_layout_switching := config_get(["features", "enable_windows_api_layout_switching"])
    icon_file_path_prefix := "icons\change_layout_"
    icon_file_path_type := "win_space"
    icon_file_ext := ".ico"

    if (n(enable_windows_api_layout_switching) && enable_windows_api_layout_switching) {
        icon_file_path_type := "windows_api"
    }

    icon_file_path_prefix := "icons\change_layout_"

    TraySetIcon(icon_file_path_prefix icon_file_path_type icon_file_ext)
}