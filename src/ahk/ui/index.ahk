#Include %A_ScriptDir%\keymeleon.ahk
#Include %A_ScriptDir%\ui\win.ahk
#Include %A_ScriptDir%\ui\msgs.ahk
#Include %A_ScriptDir%\ui\tray.ahk

dimensions_obj_global := get_dimensions_from_config()
win_is_open := 0
window_was_closed := 1
is_maximized := dimensions_obj_global["is_maximized"]
previous_is_maximized := false
is_minimized := 1
restored_down_once := false
windows_obj_exists := false
main_win := Gui("+Resize MinSize400x200")
main_win.Title := 'Keymeleon - Settings'
main_wvc := ""
main_wv := ""
dependencies_win := Gui("+Resize MinSize400x200")
dependencies_win.Title := "Keymeleon - Dependencies"
dependencies_wvc := ""
dependencies_wv := ""

create_context_menu_items()

OnMessage(0x0232, main_win_drag) ; Event when dragging window by title bar
main_win.OnEvent("Close", tray_click_action)
main_win.OnEvent("Size", main_win_size) ; Event when resizing window from sides
dependencies_win.OnEvent("Size", dependencies_win_size)
