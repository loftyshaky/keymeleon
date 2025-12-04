#Requires AutoHotkey v2.0

log(messages) {
    global user_dir

    FileAppend(FormatTime(A_Now, "yyyy-MM-dd HH:mm:ss") "." A_MSec ":`n" (is_arr(messages) ? join(messages, "`n") : messages) "`n`n", user_dir "Log.txt")
}