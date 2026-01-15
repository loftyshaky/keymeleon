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
            log(msg_obj["audio"]["default_file_extension"])
        }

    } catch as e {
        MsgBox("Error handling web message: " e.Message " at line " e.Line)
    }
}
