#Include %A_ScriptDir%\config.ahk
#Include %A_ScriptDir%\log.ahk
#Include %A_ScriptDir%\ui\win.ahk
#Include %A_ScriptDir%\ui\msgs.ahk
#Include %A_ScriptDir%\ui\tray.ahk

dimensions_obj := get_dimensions_from_config()
win_is_open := 0
is_maximized := dimensions_obj["is_maximized"]
previous_is_maximized := ""
is_minimized := 1
windows_obj_exists := false
wvc := ""
wv := ""
win := Gui("+Resize MinSize400x200")
win.Title := 'Keymeleon - Settings'

win_move(dimensions_obj)
create_context_menu_items()

win.OnEvent("Close", tray_click_action)
win.OnEvent("Size", win_size) ; Event when resizing window from sides
OnMessage(0x0003, win_drag) ; Event when dragging window by title bar
