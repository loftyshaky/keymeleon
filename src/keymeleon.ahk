#Requires AutoHotkey v2.0
#SingleInstance Force
#InputLevel 1

ProcessSetPriority "Realtime"
SetWorkingDir(A_ScriptDir)

#Include %A_ScriptDir%\lib\_JXON.ahk

#Include %A_ScriptDir%\config.ahk
#Include %A_ScriptDir%\user_dir.ahk

config := load_config_json("config.json")

set_up_user_dir()

#Include %A_ScriptDir%\utils.ahk
#Include %A_ScriptDir%\keys.ahk
#Include %A_ScriptDir%\context_remap.ahk
#Include %A_ScriptDir%\tray.ahk
#Include %A_ScriptDir%\audio.ahk
#Include %A_ScriptDir%\features.ahk
#Include %A_ScriptDir%\layouts.ahk
#Include %A_ScriptDir%\log.ahk

last_switched_layout := get_current_layout()

bind_play_audio_on_key_press()
set_tray_icon()
generate_all_layouts_in_switch_order_arr()
bind_unbind_layout_layout_switching_keys()
bind_unbind_layout_dedicated_layout_switching_keys()
on_exe_change()
bind_unbind_context_hotkeys('none')

bind_hotkey_to_function(["hotkeys", "display_current_layout_id"], (*) => display_current_layout_id())
bind_hotkey_to_function(["hotkeys", "toggle_windows_api_layout_switching"], (*) => toggle_feature("enable_windows_api_layout_switching"))
bind_hotkey_to_function(["hotkeys", "toggle_sequential_layout_switching"], (*) => toggle_feature("enable_sequential_layout_switching"))
bind_hotkey_to_function(["hotkeys", "toggle_dedicated_layout_switching"], (*) => toggle_feature("enable_dedicated_layout_switching"))
bind_hotkey_to_function(["hotkeys", "toggle_layout_switching_audio"], (*) => toggle_feature("enable_layout_switching_audio"))
bind_hotkey_to_function(["hotkeys", "toggle_typing_audio"], (*) => toggle_feature("enable_typing_audio"))
bind_hotkey_to_function(["hotkeys", "toggle_feature_state_audio"], (*) => toggle_feature("enable_feature_state_audio"))
bind_hotkey_to_function(["hotkeys", "toggle_all_bindings"], (*) => toggle_feature("enable_all_bindings"))