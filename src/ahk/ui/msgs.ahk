on_message(sender, args) {
    global config

    try {
        send_response(response) {
            sender.PostWebMessageAsString(jxon_dump(response))
        }

        msg := args.TryGetWebMessageAsString()
        msg_obj := Jxon_Load(&msg)
        msg_str := msg_obj["msg"]
        response := Map()

        if (msg_str = "get_config") {
            response["msg"] := "get_config_response"
            response["config"] := config

            send_response(jxon_dump(response))
        } else if (msg_str = "write_config") {
            config_from_file := get_config(config_path)
            window_obj := config_get(["prefs", "window"], "", config_from_file)
            msg_obj["config"]["prefs"]["window"] := window_obj

            config_write(msg_obj["config"], false)
        } else if (msg_str = "reload_config") {
            Reload()
        } else if (msg_str = "get_current_layout_id") {
            response["msg"] := "get_current_layout_id_response"
            response["current_layout_id"] := get_current_layout_id()

            send_response(jxon_dump(response))
        }

    } catch as e {
        MsgBox("Error handling web message: " e.Message " at line " e.Line)
    }
}
