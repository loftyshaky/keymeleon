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
wvc := ""
wv := ""
win := Gui("+Resize MinSize400x200")
win.Title := 'Keymeleon - Settings'

create_context_menu_items()

win.OnEvent("Close", tray_click_action)
win.OnEvent("Size", win_size) ; Event when resizing window from sides
OnMessage(0x0232, win_drag) ; Event when dragging window by title bar
