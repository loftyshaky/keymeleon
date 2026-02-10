last_exe_that_tried_to_play_audio_in := ""

play_audio(audio_type, layout := false, feature_state_bool := "", force_play := false) {
    global user_dir

    enable_feature_state_audio := audio_type = "feature_state" && (check_if_need_to_play_audio("feature_state", false) ||
    force_play)
    current_layout := layout ? layout : get_current_layout()
    custom_file_name := config_get(["audio", audio_type, enable_feature_state_audio ? feature_state_bool :
        current_layout])
    custom_file_extension := config_get(["audio", "default_file_extension"])
    fallback_file_name := enable_feature_state_audio ? feature_state_bool : current_layout
    fallback_file_extension := "wav"
    file_name := n(custom_file_name) ? custom_file_name : fallback_file_name
    file_extension := n(custom_file_extension) ? custom_file_extension : fallback_file_extension
    audio_file_name := file_name (n(custom_file_name) ? "" : "." file_extension)

    play_audio_inner(audio_file_path) {
        audio_file_path := user_dir "audio\" audio_file_path

        if (FileExist(audio_file_path)) {
            SoundPlay(audio_file_path)
        }
    }

    play_audio_inner(audio_type "\" audio_file_name)
}

check_if_need_to_play_audio(audio_type, is_automatic_layout_switching) {
    automatic_layout_change_siffix := is_automatic_layout_switching ? "_for_automatic_layout_change" : ""
    feature_key := "enable_" audio_type "_audio" automatic_layout_change_siffix
    global_enable_audio := config_get(["features", feature_key])
    exe_enable_audio := get_exe_config_val(feature_key, is_automatic_layout_switching)
    exe_enable_audio_final := !n(exe_enable_audio) || exe_enable_audio = "default" ? "" : exe_enable_audio

    return is_automatic_layout_switching && !n(exe_enable_audio_final) || (!is_automatic_layout_switching && (!n(
        exe_enable_audio_final) && n(global_enable_audio) && global_enable_audio)) || n(exe_enable_audio_final) &&
    exe_enable_audio_final
}

play_layout_switching_audio(new_layout, is_automatic_layout_switching) {
    global last_exe_that_tried_to_play_audio_in

    exe_name := get_current_exe_name()

    if (exe_name != 'default' && exe_name != last_exe_that_tried_to_play_audio_in) {
        last_exe_that_tried_to_play_audio_in := exe_name
    }

    audio_type := "layout_switching"

    if (check_if_need_to_play_audio(audio_type, is_automatic_layout_switching)) {
        play_audio(audio_type, new_layout)
    }

    if (exe_name != 'default') {
        last_exe_that_tried_to_play_audio_in := exe_name
    }
}

play_typing_audio(ih, vk, sc) {
    global keys
    global numpad_keys
    global numpad_calculation_character_keys

    audio_type := "typing"
    sc_code := Format("sc{:03X}", sc)

    ctrl_held := GetKeyState("Ctrl", "P")
    alt_held := GetKeyState("Alt", "P")
    shift_held := GetKeyState("Shift", "P")
    win_held := GetKeyState("LWin", "P") || GetKeyState("RWin", "P")
    num_lock_is_on := GetKeyState("NumLock", "T")

    pressed_key := n(find_i_in_array(sc_code, keys))
    pressed_numpad_key := n(find_i_in_array(sc_code, numpad_keys))
    pressed_numpad_calculation_character_key := n(find_i_in_array(sc_code, numpad_calculation_character_keys))
    pressed_numpad_key_cond := pressed_numpad_calculation_character_key || (num_lock_is_on && pressed_numpad_key && !
        shift_held)

    if (check_if_need_to_play_audio(audio_type, false) && (pressed_key || pressed_numpad_key_cond) && !ctrl_held && !
    alt_held && !win_held) {
        play_audio(audio_type)
    }
}

play_feature_state_audio(feature_state_bool, force_play) {
    audio_type := "feature_state"

    if (check_if_need_to_play_audio(audio_type, false) || force_play) {
        play_audio(audio_type, false, feature_state_bool, force_play)
    }
}
