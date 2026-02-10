#Requires AutoHotkey v2.0

user_dir := ""
config_path := ""

set_up_user_dir() {
    global config
    global user_dir
    global config_path

    custom_user_dir := config_get(["user_dir"])
    user_dir := n(custom_user_dir) ? custom_user_dir "\" : A_MyDocuments "\Keymeleon\"
    audio_dir := user_dir "audio"
    dirs := [user_dir, audio_dir, audio_dir "\layout_switching", audio_dir "\typing", audio_dir "\feature_state"]
    config_path := user_dir "config.json"

    for (i, dir in dirs) {
        if (!FileExist(dir)) {
            DirCreate(dir)
        }
    }

    if (!FileExist(config_path)) {
        FileAppend("{}", config_path)
    }

    config := load_config_json(config_path)
}
