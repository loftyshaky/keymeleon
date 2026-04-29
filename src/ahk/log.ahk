#Requires AutoHotkey v2.0

log(messages) {
    global user_dir

    FileAppend(FormatTime(A_Now, "yyyy-MM-dd HH:mm:ss") "." A_MSec ":`n" (is_arr(messages) ? join(messages, "`n") :
        messages) "`n`n", user_dir "Log.txt")
}

obj_to_str(obj) {
    static indent_level := 0

    if (!IsObject(obj)) {
        return IsNumber(obj) ? obj : '"' obj '"'
    }

    is_empty := true

    for (key, val in obj) {
        is_empty := false
        break
    }

    if (is_empty) {
        return "{}"
    }

    ; Calculate indentation
    current_indent := ""
    next_indent := ""

    loop (indent_level) {
        current_indent .= " "
    }
    loop (indent_level + 4) {
        next_indent .= " "
    }

    indent_level += 4
    result := "{" . "`n" . next_indent
    sep := ""

    for (key, val in obj) {
        result .= sep

        if (IsInteger(key)) {
            result .= key
        } else {
            result .= '"' key '"'
            result .= ": " . obj_to_str(val)
            sep := ",`n" . next_indent
        }
    }
    result .= "`n" . current_indent . "}"
    indent_level -= 4

    return result
}
