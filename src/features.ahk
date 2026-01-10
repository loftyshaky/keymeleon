toggle_feature(feature_name) {
    global config
    global config_path

    features := config_get(["features"])

    if (!n(features)) {
        config["features"] := Map()
    }

    force_play := feature_name == 'enable_feature_state_audio' ? true : false
    feature := config_get([feature_name], features)
    config["features"][feature_name] := n(feature) && feature ? 0 : 1
    config_json := jxon_dump(config, indent := 4)

    file := FileOpen(config_path, "w")
    file.write(config_json)
    file.close()

    if (feature_name = "enable_sequential_layout_switching") {
        bind_unbind_layout_layout_switching_keys()
    }

    if (feature_name = "enable_dedicated_layout_switching") {
        bind_unbind_layout_dedicated_layout_switching_keys()
    }

    if (feature_name = "enable_all_bindings") {
        bind_unbind_context_hotkeys('none')
    }

    play_feature_state_audio(config["features"][feature_name], force_play)
    set_tray_icon()
}
