import type { i_inputs } from '@loftyshaky/shared-app/inputs';
import { d_inputs } from '@loftyshaky/shared-app/inputs';
import type { i_error } from '@loftyshaky/shared-app/shared_clean';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {}

    private comma_separated_list_any: RegExp = /^[^,\s]+(?:\s*,\s*[^,\s]+)*\s*$/;
    private comma_separated_list_negative_positive_integer: RegExp = /^-?\d+(?:,\s*-?\d+)*\s*$/;
    private any_character_no_space: RegExp = /^[^\s]+$/;
    private any_character_except_comma: RegExp = /^[^\s,]+$/;
    private comma_separated_exe_names: RegExp = /^[^\\/:*?"<>|,.]+(?:\s*,\s*[^\\/:*?"<>|,.]+)*$/;
    private exe_name: RegExp = /^[^\\/:*?"<>|,.]+$/;
    private positive_integer: RegExp = /^\d+$/;
    private ahk_hotkey: RegExp = /^[~$*^!+#<>]*[a-zA-Z0-9_]+(?:\s+(?:up|Up))?$/;
    private comma_separated_ahk_hotkey: RegExp =
        /^[~$*^!+#<>]*[a-zA-Z0-9_]+(?:\s+(?:up|Up))?(?:\s*,\s*[~$*^!+#<>]*[a-zA-Z0-9_]+(?:\s+(?:up|Up))?)*\s*$/;

    private file_extension: RegExp = /^[^\\/:*?"<>|. ]{1,20}$/;
    private filename: RegExp = /^[^\\/:*?"<>|]+\.[^\\/:*?"<>|. ]{1,20}$/;
    private comma_separated_modifiers: RegExp =
        /^(?:LWin|RWin|Control|Ctrl|Alt|Shift|LControl|LCtrl|RControl|RCtrl|LShift|RShift|LAlt|RAlt)(?:\s*,\s*(?:LWin|RWin|Control|Ctrl|Alt|Shift|LControl|LCtrl|RControl|RCtrl|LShift|RShift|LAlt|RAlt))*$/;

    public validate_input = ({ input }: { input: i_inputs.Input }): boolean =>
        err(() => {
            const raw_val = d_inputs.Val.access({ input });
            let regex: RegExp | undefined;
            const allow_empty: boolean = true;
            let is_invalid_json_input: boolean = false;

            if (n(input.input_errors)) {
                is_invalid_json_input = input.input_errors.includes('invalid_json');

                if (input.input_errors.includes('invalid_layouts')) {
                    regex = this.comma_separated_list_any;
                } else if (input.input_errors.includes('invalid_layout_ids')) {
                    regex = this.comma_separated_list_negative_positive_integer;
                } else if (input.input_errors.includes('invalid_layout')) {
                    regex = this.any_character_except_comma;
                } else if (input.input_errors.includes('invalid_exe_names')) {
                    regex = this.comma_separated_exe_names;
                } else if (input.input_errors.includes('invalid_exe_name')) {
                    regex = this.exe_name;
                } else if (input.input_errors.includes('invalid_integer')) {
                    regex = this.positive_integer;
                } else if (input.input_errors.includes('invalid_ahk_hotkey')) {
                    regex = this.ahk_hotkey;
                } else if (input.input_errors.includes('invalid_ahk_hotkeys')) {
                    regex = this.comma_separated_ahk_hotkey;
                } else if (input.input_errors.includes('invalid_file_extension')) {
                    regex = this.file_extension;
                } else if (input.input_errors.includes('invalid_filename')) {
                    regex = this.filename;
                } else if (input.input_errors.includes('invalid_modifiers')) {
                    regex = this.comma_separated_modifiers;
                } else if (input.input_errors.includes('invalid_any_character_no_space')) {
                    regex = this.any_character_no_space;
                }
            }

            if (input.type && ['checkbox', 'select'].includes(input.type)) {
                return false;
            }

            if (is_invalid_json_input) {
                try {
                    JSON.parse(raw_val as string);

                    return false;
                } catch (error_obj: unknown) {
                    show_err_ribbon(error_obj as i_error.ErrorObj, 'aer_1060', { silent: true });
                }
            } else if (n(regex)) {
                return (
                    !regex.test((raw_val as string).trim()) &&
                    !(allow_empty && (raw_val as string).trim() === '')
                );
            }

            return true;
        }, 'aer_1061');
}

export const Validation = Class.get_instance();
