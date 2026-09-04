#Requires AutoHotkey v2.0

exe_change_polling_rate := 1000

get_config(config_path) {
    config_json := FileRead(config_path)
    return Jxon_Load(&config_json)
}

load_config_json(config_path) {
    config := Map()

    try {
        config := get_config(config_path)
    }

    return config
}

config_get(keys, accessed := "", custom_config := "") {
    global config

    if (!IsSet(config)) {
        return ""
    }

    config_final := custom_config == "" ? config : custom_config

    if (accessed = "") {
        if (config_final = "") {
            return ""
        }

        accessed := config_final
    }

    current := accessed

    for (i, key in keys) {
        key_string := String(key)

        if (!IsObject(current) || !current.Has(key_string)) {
            if (keys[1] = "features") {
                return 1
            }

            return ""
        }

        current := current[key_string]
    }

    return current
}

config_write(new_config, update_config_in_memory := true) {
    global config
    global config_path

    config_json := jxon_dump(new_config, indent := 4)

    if (update_config_in_memory) {
        config := new_config
    }

    file := FileOpen(config_path, "w")
    file.write(config_json)
    file.close()
}

get_exe_obj() {
    if (!IsSet(config)) {
        return ""
    }

    return config_get(["hotkeys", "context_remap", "exe"])
}

get_exe_config_val(val_key, is_automatic_layout_switching) {
    global last_exe_that_tried_to_play_audio_in

    exe_name := get_current_exe_name()
    exe_config_val_final := 0
    found_val := false
    exe := get_exe_obj()
    exe_default := config_get(["default"], exe)
    exe_named := is_automatic_layout_switching ? config_get([last_exe_that_tried_to_play_audio_in], exe) || config_get([
        exe_name], exe) : config_get([exe_name], exe)

    if (n(exe)) {
        set_vars(exe_obj) {
            exe_config_val := config_get([val_key], exe_obj)

            if (n(exe_config_val)) {
                found_val := true
                exe_config_val_final := exe_config_val
            }
        }

        if (n(exe_named)) {
            set_vars(exe_named)
        } else if (n(exe_default)) {
            set_vars(exe_default)
        }
    }

    return found_val ? exe_config_val_final : ""
}
