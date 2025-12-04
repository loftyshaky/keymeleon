keys := ["sc029", "sc002", "sc003", "sc004", "sc005", "sc006", "sc007", "sc008", "sc009", "sc00A", "sc00B", "sc00C", "sc00D", "sc010", "sc011", "sc012", "sc013", "sc014", "sc015", "sc016", "sc017", "sc018", "sc019", "sc01A", "sc01B", "sc02B", "sc01E", "sc01F", "sc020", "sc021", "sc022", "sc023", "sc024", "sc025", "sc026", "sc027", "sc028", "sc02C", "sc02D", "sc02E", "sc02F", "sc030", "sc031", "sc032", "sc033", "sc034","sc035", "sc039"] ; oredred from top-right (`1234 etc.)
numpad_keys := ["sc047", "sc048", "sc049", "sc04B", "sc04C", "sc04D", "sc04F", "sc050", "sc051", "sc052", "sc053"]
numpad_calculation_character_keys := ["sc135", "sc037", "sc04A", "sc04E"]

key_blocker := InputHook("L0 I")
key_blocker.KeyOpt("{All}", "S") ; Blocks all keys

block_keys(keys_are_enabled) {
    global key_blocker

    if (keys_are_enabled) {
        key_blocker.Stop()
    } else {
        key_blocker.Start() ; Strart blocking
    }
}

bind_play_audio_on_key_press() {
    ih := InputHook("V L0 I10", "")
    ih.KeyOpt("{All}", "N")

    ih.OnKeyDown := play_typing_audio
    ih.Start()
}

bind_hotkey_to_function(config_val, function) {
    config_val := config_get(config_val)

    if (n(config_val)) {
        Hotkey(config_val, function)
    }
}

bind_unbind_layout_layout_switching_keys() {
    enable_sequential_layout_switching := config_get(["features", "enable_sequential_layout_switching"])
    set_primary_layout_hotkey := config_get(["hotkeys", "set_primary_layout"])
    set_secondary_layout_hotkey := config_get(["hotkeys", "set_secondary_layout"])
    layout_switching_state := n(enable_sequential_layout_switching) && enable_sequential_layout_switching ? "On" : "Off"

    if (n(set_primary_layout_hotkey)) {
        Hotkey(set_primary_layout_hotkey, (*) => set_primary_layout(), layout_switching_state)
    }

    if (n(set_secondary_layout_hotkey)) {
        Hotkey(set_secondary_layout_hotkey, (*) => set_secondary_layout(), layout_switching_state)
    }
}

bind_unbind_layout_dedicated_layout_switching_keys() {
    enable_dedicated_layout_switching := config_get(["features", "enable_dedicated_layout_switching"])
    dedicated_layout_hotkeys := config_get(["hotkeys", "dedicated_layout_hotkeys"])

    if (n(enable_dedicated_layout_switching) && n(dedicated_layout_hotkeys) && is_arr(dedicated_layout_hotkeys)) {
        dedicated_layout_switching_state := n(enable_dedicated_layout_switching) && enable_dedicated_layout_switching ? "On" : "Off"

        for (i, dedicated_layout_hotkey in dedicated_layout_hotkeys) {
            Hotkey(dedicated_layout_hotkey, (hotkey) => set_dedicated_with_dedicated_hotkey(hotkey), dedicated_layout_switching_state)
        }
    }
}