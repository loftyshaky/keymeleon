# Keymeleon
<a href="https://github.com/loftyshaky/keymeleon/tags"><img src="https://img.shields.io/github/v/tag/loftyshaky/keymeleon?label=Version&color=blue" alt="Version"></a> <img src="https://img.shields.io/badge/AutoHotkey-2.0+-purple.svg" alt="AutoHotkey"> <a href="LICENSE.md"><img src="https://img.shields.io/badge/License-MIT-orange.svg" alt="License: MIT"></a> <img src="https://img.shields.io/github/downloads/loftyshaky/keymeleon/total?label=Downloads%20&color=green" alt="GitHub all releases"> <img src="https://img.shields.io/github/downloads/loftyshaky/keymeleon/latest/total?sort=date&label=Downloads@Latest&color=green" alt="GitHub Release">

Keymeleon is a powerful AutoHotkey script that revolutionizes Windows keyboard layout management. It eliminates the frustration of manual layout switching by providing intelligent automation, customizable hotkeys, and rich audio feedback.

<h2 id="links">Links</h2>

[Latest release](https://github.com/loftyshaky/keymeleon/releases/latest)<br>
[README.md на русском](README-RU.md)<br>
[Credits](CREDITS.md)<br>
[License](LICENSE.md)

## Features

**Direct Layout Hotkeys** - Assign dedicated keys or hotkeys to switch directly to specific layouts. For example, set `Ctrl+Shift+F8` for Dvorak and `Ctrl+Shift+F9` for QWERTY.

**Sequential layout cycling** - Quickly toggle between primary and secondary layouts.

**Audible layout feedback** - Hear unique sounds when switching layouts and different typing sounds for each layouts.

**Layout auto-switching for apps** - Your keyboard layout automatically adapts to whatever app you're using. Play games with QWERTY for maximum compatibility, then instantly return to Dvorak for productive typing on your desktop - all without pressing any layout shortcuts.

**App-specific keybinds** - Remap any key to perform different actions depending on which program you're using. Create custom key mappings that only work in specific apps - for example, bind your MMO mouse side buttons to numeric keys (1, 2, 3, etc.) exclusively while gaming, while keeping their normal functions elsewhere.

**Layout-universal keyboard shortcuts** - Create consistent Windows shortcuts that work based on physical key positions rather than layout-specific characters. Press the same physical keys for Copy, Paste, and Select all etc. regardless of your active layout (QWERTY, Dvorak, etc.).

**Advanced macros** - Create complex key sequences with precise timing control.

<h2 id="table_of_contents">Table of Contents</h2>

- [System requirements](#system_requirements)
- [Quick Start](#quick_start)
- [User directory and configuration files](#user_directory_and_configuration_files)
- [Configuration example](#configuration_example)
- [Layout switching methods](#layout_switching_methods)
- [Layout switching techniques](#layout_switching_techniques)
- [Audio feedback](#audio_feedback)
- [Features](#features_reference)
- [Conditional layouts](#conditional_layouts)
- [Context key remapping](#context_key_remapping)
- [Macros](#macros)
- [Mouse button support](#mouse_button_support)
- [Remapping keyboard keys and hotkeys](#remapping_keyboard_keys_and_hotkeys)
- [Reference](#reference)

<h2 id="system_requirements">System requirements</h2>

- Windows 10/11
- [AutoHotkey v2.0+](https://www.autohotkey.com)

<h2 id="quick_start">Quick Start</h2>

1. Install [AutoHotkey v2.0](https://www.autohotkey.com) if you haven't already.

2. Download the [latest release](https://github.com/loftyshaky/keymeleon/releases/latest) and extract it to your preferred location.

3. Run `keymeleon.ahk` as an administrator to start the script.

<h2 id="user_directory_and_configuration_files">User directory and configuration files</h2>

### User directory structure

When you first run Keymeleon, it creates a dedicated user directory at `C:\Documents\Keymeleon\` containing all your settings and audio files:

```text
Keymeleon/
├── config.json           # Main configuration file with all settings.
├── audio/
│   ├── layout_switching/ # Layout switching sounds.
│   ├── typing/           # Unique typing sounds per layout.
│   └── feature_state/    # Sounds for enabling/disabling features.
```

Keymeleon uses two separate JSON configuration files for different purposes:

### User directory location config

- Is optional.

- Location: Same folder as the Keymeleon script.

- Purpose: Only sets the user directory location.

- Can only contain one property: `user_dir`.

- Must be created before first run.

### Main config

- Is mandatory.

- Location: Inside the Keymeleon user directory (`C:\Documents\Keymeleon\` by default).

- Purpose: Stores all your settings, hotkeys, layouts, and audio preferences.

- Created automatically after first run.

Important: After modifying this file, restart `keymeleon.ahk` for changes to take effect.

### Customizing user directory location

To change location of the user directory, create a `config.json` file in the script directory with this exact content, then run Keymeleon:

```json
{
    "user_dir": "D:\\Your\\Custom\\Path"
}
```

#### Important notes

- Use double backslashes (`\\`) in file paths.

- This file only accepts the `user_dir` property - no other settings.

- After setting this, the full user directory structure will be created at your custom location when you run Keymeleon.

<h2 id="configuration_example">Configuration example</h2>

Here's a comprehensive configuration example:

```json
{
    "audio": {
        "default_file_extension": "wav"
    },
    "features": {
        "enable_all_bindings": 1,
        "enable_dedicated_layout_switching": 1,
        "enable_feature_state_audio": 1,
        "enable_layout_switching_audio": 1,
        "enable_sequential_layout_switching": 1,
        "enable_typing_audio": 1,
        "enable_windows_api_layout_switching": 1
    },
    "hotkeys": {
        "dedicated_layout_hotkeys": ["^+F8", "^+F9", "^+F10", "^+F11"],
        "display_current_layout_id": "^!+sc017",
        "set_primary_layout": "ScrollLock",
        "set_secondary_layout": "Pause",
        "toggle_all_bindings": "^!+sc035",
        "toggle_dedicated_layout_switching": "^!+sc01A",
        "toggle_feature_state_audio": "^!+sc032",
        "toggle_layout_switching_audio": "^!+sc034",
        "toggle_sequential_layout_switching": "^!+sc01B",
        "toggle_typing_audio": "^!+sc033",
        "toggle_windows_api_layout_switching": "^!+sc019"
    },
    "layouts": {
        "all_layouts_ordered": ["en-DVORAK", "en-US", "es-ES", "de-DE"],
        "fallback_layout_switching_exes": ["x360ce"],
        "layout_ids": ["-268303351", "67699721", "67767306", "67568647"],
        "layout_switching_delay": 30,
        "primary_layout": "en-DVORAK",
        "secondary_layouts": ["en-US", "es-ES", "de-DE"]
    }
}
```

### Real-world example

For advanced configurations including application-specific layouts, key bindings, and mouse button mappings, explore the complete example in the [example-config](example-config/) folder.

<h2 id="layout_switching_methods">Layout switching methods</h2>

Keymeleon provides two powerful methods for switching between keyboard layouts, giving you both quick cycling and instant access to any layout.

### Switching methods

| Method                     | Description                                                                                        | Use Case                                                                          |
| :------------------------- | :------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| Sequential switching       | Quickly switch to your primary layout or cycle through secondary layouts using two dedicated keys. | Ideal for users who frequently toggle between a main layout and 1-2 alternatives. |
| Dedicated hotkey switching | Assign specific keyboard shortcuts to switch directly to individual layouts.                       | Perfect for users who need instant access to multiple specific layouts.           |

Sequential switching lets you press one key (e.g., `ScrollLock`) to jump to your primary layout (like Dvorak) from any layout, and another key (e.g., `Pause`) to cycle through your secondary layouts (like QWERTY, Spanish, German).

Dedicated hotkey switching gives each layout its own keyboard shortcut (e.g., `Ctrl+Shift+F8` for Dvorak, `Ctrl+Shift+F9` for QWERTY) for one-press access.

### Configuration settings

| Setting                     | Object    | Type     | Description                                                                                     | Example                                              |
| :-------------------------- | :-------- | :------- | :---------------------------------------------------------------------------------------------- | :--------------------------------------------------- |
| `all_layouts_ordered`       | `layouts` | `Array`  | Names of all layouts in exact Windows language bar order. Names must be unique.                 | `["en-DVORAK", "en-US", "es-ES", "de-DE"]`           |
| `layout_ids`                | `layouts` | `Array`  | Layout IDs corresponding to `all_layouts_ordered`. Get IDs with `Ctrl+Shift+Alt+I`.             | `["-268303351", "67699721", "67767306", "67568647"]` |
| `primary_layout`            | `layouts` | `String` | Your default layout name from `all_layouts_ordered`.                                            | `"en-DVORAK"`                                        |
| `secondary_layouts`         | `layouts` | `Array`  | Other layouts for cycling, in desired order.                                                    | `["en-US", "es-ES", "de-DE"]`                        |
| `dedicated_layout_hotkeys`  | `hotkeys` | `Array`  | Hotkeys for direct layout switching. First hotkey = `primary_layout`, rest = `secondary_layouts` in order. | `["^+F8", "^+F9", "^+F10", "^+F11"]`                 |
| `set_primary_layout`        | `hotkeys` | `String` | Hotkey to switch to primary layout.                                                             | `"ScrollLock"`                                       |
| `set_secondary_layout`      | `hotkeys` | `String` | Hotkey to cycle through secondary layouts.                                                      | `"Pause"`                                            |
| `display_current_layout_id` | `hotkeys` | `String` | Hotkey to show current layout ID.                                                               | `"^!+sc017"` (`Ctrl+Shift+Alt+I`)                    |

### Setup guide

#### Step 1: Define your layouts

```json
{
    "layouts": {
        "all_layouts_ordered": ["en-DVORAK", "en-US", "es-ES", "de-DE"],
        "layout_ids": ["-268303351", "67699721", "67767306", "67568647"],
        "primary_layout": "en-DVORAK",
        "secondary_layouts": ["en-US", "es-ES", "de-DE"]
    }
}
```

#### Step 2: Configure hotkeys

```json
{
    "hotkeys": {
        "dedicated_layout_hotkeys": ["^+F8", "^+F9", "^+F10", "^+F11"],
        "display_current_layout_id": "^!+sc017",
        "set_primary_layout": "ScrollLock",
        "set_secondary_layout": "Pause"
    }
}
```

### How it works

Sequential: Press `ScrollLock` for Dvorak, then `Pause` to cycle: QWERTY → Spanish → German → QWERTY...

Dedicated: Press `Ctrl+Shift+F8` for Dvorak, `Ctrl+Shift+F9` for QWERTY, `Ctrl+Shift+F10` for Spanish, `Ctrl+Shift+F11` for German.

### Getting layout IDs

1. Switch to a layout using Windows language bar.
2. Press `Ctrl+Shift+Alt+I` (or your configured hotkey).
3. Note the ID shown in the tooltip.
4. Add it to `layout_ids` in the same position as the layout name in `all_layouts_ordered`.

Note: Order is critical - the first ID in `layout_ids` must match the first layout in `all_layouts_ordered`, and so on.

<h2 id="layout_switching_techniques">Layout switching techniques</h2>

### Switching techniques

| Technique              | Tray icon color | Description                                                    | Best for                        |
| :--------------------- | :-------------- | :------------------------------------------------------------- | :------------------------------ |
| Windows API            | Blue            | Uses internal Windows functions for instant layout switching.  | Most apps, general use.         |
| `Win+Space` simulation | Green           | Simulates physical keyboard presses for maximum compatibility. | Problematic apps, system areas. |

#### Configuration settings

| Setting                               | Object     | Type   | Description                                          | Default                           |
| :------------------------------------ | :--------- | :----- | :--------------------------------------------------- | :-------------------------------- |
| `enable_windows_api_layout_switching` | `features` | `Number` | Enable (`1`) or disable (`0`) Windows API switching. | `1`                               |
| `toggle_windows_api_layout_switching` | `hotkeys`  | `String` | Hotkey to toggle between techniques.                    | `"^!+sc019"` (`Ctrl+Shift+Alt+P`) |
| `layout_switching_delay`              | `layouts`  | `Number` | Delay in milliseconds for `Win+Space` technique.        | `0`                               |
| `fallback_layout_switching_exes`      | `layouts`  | `Array`  | Apps that should always use `Win+Space` simulation.  | -                              |

### Usage

**Toggle between techniques:**

Press `Ctrl+Shift+Alt+P` to switch techniques.

Monitor the tray icon color: Blue for Windows API, Green for `Win+Space` simulation.

### Technical details

#### Windows API technique

Advantages: Instant switching, no visible key presses.

Limitations: Doesn't work when system elements are focused (Start menu, taskbar). May cause certain applications, such as x360ce, to hang.

#### Win+Space simulation

Advantages: Cannot cause app hangs or freezes. Works reliably in system areas and problematic programs.

Limitations: Requires timing delay between key presses. If the delay is too big, visibly triggers the Windows language switcher briefly.

Pro tip: Use Windows API switching for general use, and add problematic applications to `fallback_layout_switching_exes` to automatically fall back to `Win+Space` simulation when needed.

### Automatic behavior

Keymeleon intelligently handles edge cases:

- System areas (Start menu, desktop): Always uses `Win+Space` simulation.

- Apps in `fallback_layout_switching_exes`: Always uses `Win+Space` simulation.

- All other situations: Uses your currently selected technique.

### Timing configuration

The `layout_switching_delay` setting ensures reliable `Win+Space` simulation:

- Too low: The `Win` and `Space` key presses happen almost simultaneously. Windows may not register this as a key combination, causing the layout switch to fail.

- Too high: Creates noticeable lag in layout switching. The extended `Win` key press may accidentally trigger Windows keyboard shortcuts if you continue typing during the delay.

Recommended: 30-50 milliseconds for most systems.

**Example configuration:**

```json
{
    "features": {
        "enable_windows_api_layout_switching": 1
    },
    "hotkeys": {
        "toggle_windows_api_layout_switching": "^!+sc019"
    },
    "layouts": {
        "fallback_layout_switching_exes": ["x360ce"],
        "layout_switching_delay": 30
    }
}
```
<h2 id="audio_feedback">Audio feedback</h2>

Keymeleon provides rich audio feedback to give you immediate auditory confirmation of your current layout and settings changes.

### Overview

The audio system uses sound files stored in your user directory to provide contextual feedback:

**Layout switching audio:** Play unique sounds when switching between different keyboard layouts.

**Typing audio:** Provide distinct typing sounds for each layout.

**Feature toggle audio:** Play different confirmation sounds when enabling/disabling features via hotkeys.

### File structure

Place audio files in the following directories within your user folder:

```text
Keymeleon/
├── audio/
│   ├── layout_switching/ # Layout switching sounds.
│   ├── typing/           # Unique typing sounds per layout.
│   └── feature_state/    # Sounds for enabling/disabling features.
```

### Basic Setup

#### Layout & typing sounds

Enable the features in your `features` object:

```json
{
    "features": {
        "enable_layout_switching_audio": 1,
        "enable_typing_audio": 1
    }
}
```

Add audio files named after your layouts from `all_layouts_ordered`:

`audio/layout_switching/en-DVORAK.wav`<br>
`audio/layout_switching/en-US.wav`<br>
`audio/typing/en-DVORAK.wav`<br>
`audio/typing/en-US.wav`

#### Feature toggle sounds

Enable toggle feature audio:

```json
{
    "features": {
        "enable_feature_state_audio": 1
    }
}
```

Add audio files named `1` and `0`:

`audio/feature_state/1.wav` - Plays when a feature is enabled.<br>
`audio/feature_state/0.wav` - Plays when a feature is disabled.

### Advanced customization

For custom file names or different audio formats, specify them in your audio configuration:

```json
{
    "audio": {
        "default_file_extension": "wav",
        "layout_switching": {
            "en-DVORAK": "dvorak_switching.mp3",
            "en-US": "qwerty_switching.ogg"
        },
        "feature_state": {
            "0": "feature_off.mp3",
            "1": "feature_on.mp3"
        },
        "typing": {
            "en-DVORAK": "dvorak_keys.mp3",
            "en-US": "qwerty_keys.wav"
        }
    }
}
```

#### Configuration reference

| Setting                  | Type   | Description                                 | Default |
| :----------------------- | :----- | :------------------------------------------ | :------ |
| `default_file_extension` | `String` | Default audio format for unspecified files. | `wav`   |
| `layout_switching`       | `Object` | Layout switching sounds with custom filenames       | `{}`    |
| `feature_state`          | `Object` | Feature toggle sounds with custom filenames.       | `{}`    |
| `typing`                 | `Object` | Typing sounds with custom filenames.                | `{}`    |

<h2 id="features_reference">Features</h2>

### Feature Configuration

The `features` object controls which Keymeleon functions are active. Use `1` to enable a feature and `0` to disable it. Each feature can be toggled using the corresponding hotkey defined in the `hotkeys` object.

**Example:** The `enable_dedicated_layout_switching` feature is controlled by the hotkey specified in `toggle_dedicated_layout_switching`.

### Available Features

| Feature                               | Description                                                                                                                |
| :------------------------------------ | :------------------------------------------------------------------------------------------------------------------------- |
| `enable_dedicated_layout_switching`   | Enable dedicated hotkeys for direct layout switching (e.g., `Ctrl+Shift+F8` for `en-DVORAK`, `Ctrl+Shift+F9` for `en-US`). |
| `enable_sequential_layout_switching`  | Enable cycling between primary and secondary layouts using sequential switching.                                           |
| `enable_windows_api_layout_switching` | Use instant Windows API layout switching instead of `Win+Space` simulation.                                                |
| `enable_feature_state_audio`          | Play sounds when enabling or disabling features via hotkeys.                                                               |
| `enable_layout_switching_audio`       | Play unique sounds when switching between layouts.                                                                         |
| `enable_typing_audio`                 | Play unique typing sounds for different keyboard layouts.                                                                  |
| `enable_all_bindings`                 | Enable all custom key bindings.                                                                  |

### Default Hotkey Reference

| Function                              | Hotkey             |
| :------------------------------------ | :----------------- |
| `display_current_layout_id`           | `Ctrl+Shift+Alt+I` |
| `toggle_dedicated_layout_switching`   | `Ctrl+Shift+Alt+[` |
| `toggle_sequential_layout_switching`  | `Ctrl+Shift+Alt+]` |
| `toggle_windows_api_layout_switching` | `Ctrl+Shift+Alt+P` |
| `toggle_feature_state_audio`          | `Ctrl+Shift+Alt+M` |
| `toggle_layout_switching_audio`       | `Ctrl+Shift+Alt+.` |
| `toggle_typing_audio`                 | `Ctrl+Shift+Alt+,` |
| `toggle_all_bindings`                 | `Ctrl+Shift+Alt+/` |

Note: All hotkeys are customizable in the `hotkeys` object of your configuration.

<h2 id="conditional_layouts">Conditional layouts</h2>

Keymeleon can automatically switch layouts and remap keys based on the app you're using. It detects the currently focused window by checking the executable (`.exe`) filename and applies your predefined settings for that specific context.

### Basic Example: Game vs. Desktop Layouts

Automatically switch layouts when specific apps are focused:

```json
{
    "hotkeys": {
        "context_remap": {
            "exe": {
                "Fallout4": {
                    "enable_layout_switching_audio": 1,
                    "enable_layout_switching_audio_for_automatic_layout_change": 1,
                    "enable_typing_audio": 0,
                    "layout": "en-US"
                },
                "default": {
                    "enable_layout_switching_audio": 1,
                    "enable_typing_audio": 1,
                    "layout": "en-DVORAK"
                }
            }
        }
    }
}
```
Fallout 4 is just one example - you can create conditional layouts for any game or app.

### App detection

Keymeleon identifies apps by their executable filename (without the `.exe` extension):

`Fallout4` - Example: Targets `Fallout4.exe` (any game or app).

`default` - Applies to all other unspecified apps when they're focused.

You can add any app - just use its executable filename without the `.exe` extension. The `default` context serves as a catch-all for any app not explicitly listed.

### Configuration properties

| Property                                                    | Type   | Description                                                                                                                                     | Default   |
| :---------------------------------------------------------- | :----- | :---------------------------------------------------------------------------------------------------------------------------------------------- | :-------- |
| `layout`                                                    | `String` | Layout to use in this context (from `all_layouts_ordered`).                                                                                     | -         |
| `enable_layout_switching_audio`                             | `Number` | Play layout switching sounds for manual changes when you're in this context.                                                                       | `default` |
| `enable_typing_audio`                                       | `Number` | Enable typing sounds in this context.                                                                                                           | `default` |
| `enable_layout_switching_audio_for_automatic_layout_change` | `Number` | Play sounds for automatic layout changes when entering or leaving this context. Not available for `default` context.                                          | `1`       |
| `automatic_exe_windows_api_layout_switching_delay`          | `Number` | Milliseconds to wait after app focus before automatic layout switching. Required for applications where layout switching fails without a delay. | `0`       |

<h2 id="context_key_remapping">Context key remapping</h2>
Keymeleon enables context-sensitive key remapping, allowing you to bind keys to perform different actions depending on which app has focus.

### Basic example: App-specific key binding

Let's configure the `F2` key to execute the "Use" command (`E` key) in Fallout 4, while making it type the letter `A` in all other apps:

```json
{
    "hotkeys": {
        "context_remap": {
            "exe": {
                "Fallout4": {
                    "enable_layout_switching_audio": 1,
                    "enable_layout_switching_audio_for_automatic_layout_change": 1,
                    "enable_typing_audio": 0,
                    "key_bindings": {
                        "f2": {
                            "delay_between": 30,
                            "key": "e"
                        }
                    },
                    "layout": "en-US"
                },
                "default": {
                    "enable_layout_switching_audio": 1,
                    "enable_typing_audio": 1,
                    "key_bindings": {
                        "f2": "a"
                    },
                    "layout": "en-DVORAK"
                }
            },
            "input_bindings": {
                "f2": "F2 Up"
            }
        }
    }
}
```

### How it works

#### Input bindings

The `input_bindings` object defines the physical keys you want to remap:

`f2` - A custom name for this binding (can be anything).

`"F2 Up"` - The actual key to listen for, with `"Up"` indicating the action triggers on key release.

#### Key bindings

The `key_bindings` objects define what happens when the remapped key is pressed in each context:

**Fallout 4 context:**

```json
{
    "f2": {
        "delay_between": 30,
        "key": "e"
    }
}
```

Behavior: When `F2` is pressed and released in Fallout 4, wait 30 milliseconds, then simulate pressing the `E` key.

Use case: The delay_between ensures reliable execution in apps that may not register instant key presses.

**Default context:**

```json
"f2": "a"
```

Behavior: When `F2` is pressed and released in any other app, immediately simulate pressing the `A` key.

Note: As you can see here, the `f2` property is now a simple string instead of an object. If you don't need additional parameters like `delay_between`, you can use this shorter syntax.

#### How it works

Key detection: Keymeleon monitors for the `F2` key being released (`"F2 Up"`).

Context check: Determines if `Fallout4.exe` or another app is focused.

#### Action execution

In Fallout 4: Waits 30ms, then sends `E` key press ("Use" command).

In other apps: Immediately sends `A` key press.

Basically, this means: When Fallout 4 is focused and you press and release the `F2` key, wait 30 milliseconds, then execute the "Use" command (the `E` key). When any other app is focused, pressing and releasing `F2` will simply type the `A` key.

### Hotkeys with modifiers

Keymeleon can execute hotkeys that include modifier keys. Let's modify the default context to open the Task Manager when you press `F2`:

```json
{
    "exe": {
        "default": {
            "enable_layout_switching_audio": 1,
            "enable_typing_audio": 1,
            "key_bindings": {
                "f2": {
                    "key": "Esc",
                    "modifiers": ["Ctrl", "Shift"]
                }
            }
        }
    },
    "input_bindings": {
        "f2": "F2 Up"
    }
}
```

The modifiers property tells Keymeleon to hold the `Ctrl` and `Shift` keys before pressing `Esc`. This creates the `Ctrl+Shift+Esc` shortcut that opens Task Manager.

#### Usage notes

For a single modifier, you can use a string instead of an array: `"modifiers": "Ctrl"`.

If you add a `delay_between` property (e.g., 30 milliseconds), the delay will be applied between each key press in the sequence.

Adding a delay can help if the hotkey doesn't work consistently in some apps.

### Block native key function

To prevent a key from performing its original function, set the `allow_native_function` property to `0`.

In this example, we make the `Left Win` key open browser help (`F1`) instead of the Start Menu:

```json
{
    "context_remap": {
        "exe": {
            "default": {
                "key_bindings": {
                    "lwin": {
                        "allow_native_function": 0,
                        "key": "F1"
                    }
                }
            }
        },
        "input_bindings": {
            "lwin": "LWin Up"
        }
    }
}
```

### Ignore held modifiers

If a remapped key still doesn't work, try setting `ignore_modifiers` to `1`. This tells Keymeleon to ignore any modifier keys (`Ctrl`, `Shift`, `Alt`) you might be holding when the remapped key is pressed.

Use this setting alongside or instead of `allow_native_function` when troubleshooting unresponsive hotkeys.

### Wait until key release

The `wait` property enables key hold functionality by making Keymeleon wait for you to release the physical key before sending the key `Up` event to the target application. This is essential for actions that require holding a key, such as "hold to reload" mechanics or context-sensitive actions that differ between short taps and long presses.

#### Example: Reload with hold-to-holster functionality

In Fallout 4, the `R` key has dual functionality:

Short tap: Reload weapon

Long press: Holster weapon

To properly bind this to `F2`, we need the script to wait for key release:

```json
{
    "hotkeys": {
        "context_remap": {
            "exe": {
                "Fallout4": {
                    "enable_layout_switching_audio": 1,
                    "enable_layout_switching_audio_for_automatic_layout_change": 1,
                    "enable_typing_audio": 0,
                    "key_bindings": {
                        "f2": {
                            "allow_native_function": 0,
                            "key": "r",
                            "wait": 1
                        },
                        "f3_sc": {
                            "allow_native_function": 0,
                            "key": "r",
                            "key_wait": "f3"
                        }
                    },
                    "layout": "en-US"
                },
                "default": {
                    "enable_layout_switching_audio": 1,
                    "enable_typing_audio": 1,
                    "key_bindings": {
                        "f2": "a"
                    },
                    "layout": "en-DVORAK"
                }
            },
            "input_bindings": {
                "f2": "F2",
                "f3_sc": "SC03D"
            }
        }
    }
} 
```

#### How it works

Standard key names (like `F2`): When you set `"wait": 1`, Keymeleon automatically tracks when you release `F2` and only sends the `"r Up"` event after your physical key release.

Scan codes (like `SC03D` for `F3`): Keymeleon cannot automatically detect which physical key corresponds to a scan code. You must explicitly specify `"key_wait": "f3"` to tell the script which physical key to monitor for release.

### Key binding properties

| Property                | Type         | Description                                                                                                                                                                                                                                                                          | Default |
| :---------------------- | :----------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| `key`                   | `String`     | The key or keystroke to execute when the binding is triggered.                                                                                                                                                                                                               | -       |
| `delay_before`                 | `Number`       | The delay in milliseconds that controls the pause between when you press the bound key and when the target action executes. | `0`     |
| `delay_between`                 | `Number`       | The delay in milliseconds between individual key presses within the executed action. While some apps respond instantly, others like Fallout 4 require a brief delay (typically 30-50ms) to register the simulated key press. | `0`     |
| `wait`                 | `Number`       | Wait for physical key release before sending the `"Up"` event. | `0`     |
| `key_wait`                 | `String`       | Physical key name to monitor for release. | -     |
| `modifiers`             | `Array/String` | Modifier keys to hold.                                                                                                                                                                                                                                                               | -       |
| `allow_native_function` | `Number`       | Allow (`1`) or block (`0`) the key's original function. For example, set to `0` to prevent the Start Menu from opening when remapping the `Win` key.                                                                                                                                   | `1`     |
| `ignore_modifiers`      | `Number`       | Ignore (`1`) or respect (`0`) modifier keys already being held when the binding triggers.                                                                                                                                                                                            | `0`     |
| `repeat_count`      | `Number`       | Number of times to repeat the entire macro sequence.                                                                                                                                                                                            | `1`     |

<h2 id="macros">Macros</h2>
Keymeleon supports complex macros—sequences of keys and delays executed with a single hotkey.

### Example 1: Typing with progressive delays

This macro types "test" with increasing delays between each letter:

```json
{
    "exe": {
        "default": {
            "key_bindings": {
                "f2": [
                    {
                        "key": "t"
                    },
                    {
                        "delay": 100
                    },
                    {
                        "key": "e"
                    },
                    {
                        "delay": 200
                    },
                    {
                        "key": "s"
                    },
                    {
                        "delay": 400
                    },
                    {
                        "key": "t"
                    }
                ]
            }
        }
    },
    "input_bindings": {
        "f2": "F2 Up"
    }
}
```

### Example 2: Select all and paste

This macro selects all text and pastes from clipboard:

```json
{
    "exe": {
        "default": {
            "key_bindings": {
                "f2": [
                    {
                        "key": "Ctrl Down"
                    },
                    {
                        "delay": 300
                    },
                    {
                        "key": "a"
                    },
                    {
                        "delay": 300
                    },
                    {
                        "key": "Ctrl Up"
                    },
                    {
                        "delay": 300
                    },
                    {
                        "key": "Ctrl Down"
                    },
                    {
                        "delay": 300
                    },
                    {
                        "key": "v"
                    },
                    {
                        "delay": 300
                    },
                    {
                        "key": "Ctrl Up"
                    }
                ]
            }
        }
    },
    "input_bindings": {
        "f2": "F2 Up"
    }
}
```

### Macros with advanced properties

To use advanced properties like `allow_native_function`, `ignore_modifiers`, `wait` and `key_wait` with macros, you need to wrap your macro array inside a macro object. This object structure also allows you to specify a `repeat_count` property to execute the macro multiple times in succession:

```json
{
    "exe": {
        "default": {
            "key_bindings": {
                "ctrl_shift_esc": {
                    "allow_native_function": 0,
                    "macro": [
                        {
                            "key": "t"
                        },
                        {
                            "delay": 100
                        },
                        {
                            "key": "e"
                        },
                        {
                            "delay": 200
                        },
                        {
                            "key": "s"
                        },
                        {
                            "delay": 400
                        },
                        {
                            "key": "t"
                        }
                    ],
                    "repeat_count": 3
                }
            }
        }
    },
    "input_bindings": {
        "ctrl_shift_esc": "^+Esc"
    }
}
```

This configuration types "test" three times when you press `Ctrl+Shift+Esc` while preventing the Task Manager from opening.

You can repeat specific portions of a macro independently using nested macro objects:

```json
{
    "exe": {
        "default": {
            "key_bindings": {
                "ctrl_shift_esc": {
                    "allow_native_function": 0,
                    "macro": [
                        {
                            "macro": [
                                {
                                    "key": "t"
                                },
                                {
                                    "delay": 100
                                },
                                {
                                    "key": "e"
                                },
                                {
                                    "delay": 200
                                },
                                {
                                    "key": "s"
                                },
                                {
                                    "delay": 400
                                },
                                {
                                    "key": "t"
                                },
                                {
                                    "delay": 600
                                },
                                {
                                    "key": "2"
                                }
                            ],
                            "repeat_count": 2
                        },
                        {
                            "macro": [
                                {
                                    "key": "Space"
                                }
                            ]
                        },
                        {
                            "macro": [
                                {
                                    "key": "t"
                                },
                                {
                                    "delay": 100
                                },
                                {
                                    "key": "e"
                                },
                                {
                                    "delay": 200
                                },
                                {
                                    "key": "s"
                                },
                                {
                                    "delay": 400
                                },
                                {
                                    "key": "t"
                                },
                                {
                                    "delay": 600
                                },
                                {
                                    "key": "4"
                                }
                            ],
                            "repeat_count": 4
                        }
                    ]
                }
            }
        }
    },
    "input_bindings": {
        "ctrl_shift_esc": "^+Esc"
    }
}
```

This configuration types "test2" twice, adds a space, then types "test4" four times.

<h2 id="mouse_button_support">Mouse button support</h2>
Keymeleon allows you to bind extra mouse buttons by mapping them through your mouse software first, then configuring them in Keymeleon.

### Setup process

Configure your mouse software to bind extra buttons to unused function keys (`F13`-`F24`). To record these keys in your mouse software, use the provided `f24.ahk` helper script: run the script, then press the physical function key you want to map (for example, `F12` maps to `F24`, `F11` maps to `F23`, and so on).

Map these keys in Keymeleon as you would any other hotkey.

### Example: MMO mouse configuration

This example binds 10 MMO mouse buttons to numeric favorites keys (1-0) in Fallout 4, while using the first two buttons for Copy/Paste on the desktop:

```json
{
    "context_remap": {
        "exe": {
            "Fallout4": {
                "enable_layout_switching_audio": 1,
                "enable_layout_switching_audio_for_automatic_layout_change": 1,
                "enable_typing_audio": 0,
                "key_bindings": {
                    "button_1": {
                        "delay_between": 30,
                        "key": 1
                    },
                    "button_10": {
                        "delay_between": 30,
                        "key": 0
                    },
                    "button_2": {
                        "delay_between": 30,
                        "key": 2
                    },
                    "button_3": {
                        "delay_between": 30,
                        "key": 3
                    },
                    "button_4": {
                        "delay_between": 30,
                        "key": 4
                    },
                    "button_5": {
                        "delay_between": 30,
                        "key": 5
                    },
                    "button_6": {
                        "delay_between": 30,
                        "key": 6
                    },
                    "button_7": {
                        "delay_between": 30,
                        "key": 7
                    },
                    "button_8": {
                        "delay_between": 30,
                        "key": 8
                    },
                    "button_9": {
                        "delay_between": 30,
                        "key": 9
                    }
                },
                "layout": "en-US"
            },
            "default": {
                "enable_layout_switching_audio": 1,
                "enable_typing_audio": 1,
                "key_bindings": {
                    "button_1": {
                        "key": "c",
                        "modifiers": "Ctrl"
                    },
                    "button_2": {
                        "key": "v",
                        "modifiers": "Ctrl"
                    }
                },
                "layout": "en-DVORAK"
            }
        },
        "input_bindings": {
            "button_1": "F13",
            "button_10": "F22",
            "button_2": "F14",
            "button_3": "F15",
            "button_4": "F16",
            "button_5": "F17",
            "button_6": "F18",
            "button_7": "F19",
            "button_8": "F20",
            "button_9": "F21"
        }
    }
}
```

### How it works

In Fallout 4: Mouse buttons 1-10 trigger numeric keys 1-0 with a 30ms delay.

On Desktop: Mouse buttons 1-2 trigger `Ctrl+C` and `Ctrl+V` respectively.

Mouse buttons 3-10 have no special function on desktop in this configuration.

This approach gives you complete control over your mouse buttons for different apps while maintaining standard functionality elsewhere.

<h2 id="remapping_keyboard_keys_and_hotkeys">Remapping keyboard keys and hotkeys</h2>

Similar to mouse buttons, you can remap any key or keyboard shortcut to simulate another key or hotkey.

### Basic example

In this example, we bind `Alt+T` to open the Task Manager (`Ctrl+Shift+Esc`):

```json
{
    "context_remap": {
        "exe": {
            "default": {
                "enable_layout_switching_audio": "default",
                "enable_typing_audio": "default",
                "key_bindings": {
                    "alt_t": {
                        "allow_native_function": 0,
                        "key": "Esc",
                        "modifiers": [
                            "Ctrl",
                            "Shift"
                        ]
                    }
                },
                "layout": "en-DVORAK"
            }
        },
        "input_bindings": {
            "alt_t": "!t"
        }
    }
}
```

### Layout-universal keyboard shortcuts

In the next example, we create layout-universal bindings for common Windows functions (Select all, Copy, Paste, etc.). This configuration ensures that keyboard shortcuts work based on physical key positions rather than layout-specific characters. For example, you'll be able to paste text by pressing the physical `Ctrl+V` key combination regardless of whether you're using QWERTY, Dvorak, or any other layout.

The configuration maps physical key positions (using scan codes) to their corresponding Windows functions, maintaining consistent muscle memory across different keyboard layouts.

```json
{
    "context_remap": {
        "exe": {
            "default": {
                "enable_layout_switching_audio": "default",
                "enable_typing_audio": "default",
                "key_bindings": {
                    "ctrl_;": {
                        "allow_native_function": 0,
                        "key": "z",
                        "modifiers": [
                            "Ctrl"
                        ]
                    },
                    "ctrl_a": {
                        "allow_native_function": 0,
                        "key": "a",
                        "modifiers": [
                            "Ctrl"
                        ]
                    },
                    "ctrl_b": {
                        "allow_native_function": 0,
                        "key": "n",
                        "modifiers": [
                            "Ctrl"
                        ]
                    },
                    "ctrl_d": {
                        "allow_native_function": 0,
                        "key": "h",
                        "modifiers": [
                            "Ctrl"
                        ]
                    },
                    "ctrl_f": {
                        "allow_native_function": 0,
                        "key": "y",
                        "modifiers": [
                            "Ctrl"
                        ]
                    },
                    "ctrl_j": {
                        "allow_native_function": 0,
                        "key": "c",
                        "modifiers": [
                            "Ctrl"
                        ]
                    },
                    "ctrl_k": {
                        "allow_native_function": 0,
                        "key": "v",
                        "modifiers": [
                            "Ctrl"
                        ]
                    },
                    "ctrl_o": {
                        "allow_native_function": 0,
                        "key": "s",
                        "modifiers": [
                            "Ctrl"
                        ]
                    },
                    "ctrl_shift_k": {
                        "allow_native_function": 0,
                        "key": "v",
                        "modifiers": [
                            "Ctrl",
                            "Shift"
                        ]
                    },
                    "ctrl_shift_o": {
                        "allow_native_function": 0,
                        "key": "s",
                        "modifiers": [
                            "Ctrl",
                            "Shift"
                        ]
                    },
                    "ctrl_shift_q": {
                        "allow_native_function": 0,
                        "key": "x",
                        "modifiers": [
                            "Ctrl"
                        ]
                    },
                    "ctrl_u": {
                        "allow_native_function": 0,
                        "key": "f",
                        "modifiers": [
                            "Ctrl"
                        ]
                    },
                },
                "layout": "en-DVORAK"
            }
        },
        "input_bindings": {
            "ctrl_;": "^SC02C",
            "ctrl_a": "^SC01E",
            "ctrl_b": "^SC031",
            "ctrl_d": "^SC023",
            "ctrl_f": "^SC015",
            "ctrl_j": "^SC02E",
            "ctrl_k": "^SC02F",
            "ctrl_o": "^SC01F",
            "ctrl_shift_k": "^+SC02F",
            "ctrl_shift_o": "^+SC01F",
            "ctrl_shift_q": "^+SC02D",
            "ctrl_u": "^SC021",
        }
    }
}
```

#### Setup guide
1. In `input_bindings`, specify the physical key position using scan codes. For example, use `SC02F` for the key that would type `K` in Dvorak layout (and `V` in QWERTY), regardless of what character it currently types in your active layout.

2. In `key_bindings`, define the actual Windows function to execute. For paste functionality, this would be `V` with `Ctrl` modifier to simulate `Ctrl+V`.

3. Always include `"allow_native_function": 0` to disable the original layout-dependent behavior and ensure consistent shortcut execution across all layouts.

<h2 id="reference">Reference</h2>

### `layouts` object

| Setting                     | Type     | Description                                                                                     | Example                                              | Default |
| :-------------------------- | :------- | :---------------------------------------------------------------------------------------------- | :--------------------------------------------------- | :------ |
| `all_layouts_ordered`       | `Array`  | Names of all layouts in exact Windows language bar order. Names must be unique.                 | `["en-DVORAK", "en-US", "es-ES", "de-DE"]`           | -       |
| `layout_ids`                | `Array`  | Layout IDs corresponding to `all_layouts_ordered`. Get IDs with `Ctrl+Shift+Alt+I`.             | `["-268303351", "67699721", "67767306", "67568647"]` | -       |
| `primary_layout`            | `String` | Your default layout name from `all_layouts_ordered`.                                            | `"en-DVORAK"`                                        | -       |
| `secondary_layouts`         | `Array`  | Other layouts for cycling, in desired order.                                                    | `["en-US", "es-ES", "de-DE"]`                        | -       |
| `fallback_layout_switching_exes` | `Array` | Apps that should always use `Win+Space` simulation. | `["x360ce"]` | -    |
| `layout_switching_delay`    | `Number` | Delay in milliseconds for `Win+Space` technique. | `30` | `0`     |

### `hotkeys` object

| Setting                     | Type     | Description                                                                                     | Example                                              | Default |
| :-------------------------- | :------- | :---------------------------------------------------------------------------------------------- | :--------------------------------------------------- | :------ |
| `dedicated_layout_hotkeys`  | `Array`  | Hotkeys for direct layout switching. First hotkey = `primary_layout`, rest = `secondary_layouts` in order. | `["^+F8", "^+F9", "^+F10", "^+F11"]` (Ctrl+Shift+F8–F11) | -       |
| `set_primary_layout`        | `String` | Hotkey to switch to primary layout.                                                             | `"ScrollLock"`                                       | -       |
| `set_secondary_layout`      | `String` | Hotkey to cycle through secondary layouts.                                                      | `"Pause"`                                            | -       |
| `display_current_layout_id` | `String` | Hotkey to show current layout ID.                                                               | `"^!+sc017"` (`Ctrl+Shift+Alt+I`)                    | -       |
| `toggle_dedicated_layout_switching` | `String` | Hotkey to toggle dedicated layout switching feature. | `"^!+sc01A"` (`Ctrl+Shift+Alt+[`) | - |
| `toggle_sequential_layout_switching` | `String` | Hotkey to toggle sequential layout switching. | `"^!+sc01B"` (`Ctrl+Shift+Alt+]`) | - |
| `toggle_windows_api_layout_switching` | `String` | Hotkey to toggle Windows API layout switching. | `"^!+sc019"` (`Ctrl+Shift+Alt+P`) | - |
| `toggle_feature_state_audio` | `String` | Hotkey to toggle feature state audio. | `"^!+sc032"` (`Ctrl+Shift+Alt+M`) | - |
| `toggle_layout_switching_audio` | `String` | Hotkey to toggle layout switching audio. | `"^!+sc034"` (`Ctrl+Shift+Alt+.`) | - |
| `toggle_typing_audio` | `String` | Hotkey to toggle typing audio. | `"^!+sc033"` (`Ctrl+Shift+Alt+,`) | - |
| `enable_all_bindings` | `String` | Hotkey to toggle all custom key bindings. | `"^!+sc035"` (`Ctrl+Shift+Alt+/`) | - |

### `features` object

Each property accepts only two values: `1` (enabled) or `0` (disabled).

| Setting                               | Type     | Description                                                                 | Default |
| :------------------------------------ | :------- | :-------------------------------------------------------------------------- | :------ |
| `enable_dedicated_layout_switching`   | `Number` | Enable dedicated hotkeys for direct layout switching. (e.g., `Ctrl+Shift+F8` for `en-DVORAK`, `Ctrl+Shift+F9` for `en-US`). | `1`     |
| `enable_sequential_layout_switching`  | `Number` | Enable cycling between primary and secondary layouts using sequential switching. | `1`     |
| `enable_windows_api_layout_switching` | `Number` | Use instant Windows API layout switching instead of `Win+Space` simulation. | `1`     |
| `enable_feature_state_audio`          | `Number` | Play sounds when enabling or disabling features via hotkeys.                | `1`     |
| `enable_layout_switching_audio`       | `Number` | Play unique sounds when switching between layouts.                          | `1`     |
| `enable_typing_audio`                 | `Number` | Play unique typing sounds for different keyboard layouts.                   | `1`     |
| `enable_all_bindings`                 | `Number` | Enable all custom key bindings.                   | `1`     |

### `context_remap` object (within `hotkeys`)

| Setting           | Type     | Description                                                                 | Example | Default |
| :---------------- | :------- | :-------------------------------------------------------------------------- | :------ | :------ |
| `exe`             | `Object` | Application-specific configurations. Contains executable names as keys.     | -       | -       |
| `input_bindings`  | `Object` | Physical keys to remap, with custom names as keys and hotkeys as values. | -       | -       |

### `exe` object (within `context_remap`)

| Setting           | Type     | Description                                                                 | Example | Default |
| :---------------- | :------- | :-------------------------------------------------------------------------- | :------ | :------ |
| `[App exe name]` | `Object` | Configuration for specific application (use .exe filename without extension). | `"Fallout4"` | -       |
| `default`         | `Object` | Configuration applied to all unspecified applications.                      | -       | -       |

### `[app exe name]` (within `exe` objects)

| Setting                                                    | Type   | Description                                                                 | Default   |
| :--------------------------------------------------------- | :----- | :-------------------------------------------------------------------------- | :-------- |
| `layout`                                                   | `String` | Layout to use in this context (from `all_layouts_ordered`).                 | -         |
| `enable_layout_switching_audio`                            | `Number` | Play layout switching sounds for manual changes when you're in this context.            | `default` |
| `enable_typing_audio`                                      | `Number` | Enable typing sounds in this context.                                       | `default` |
| `enable_layout_switching_audio_for_automatic_layout_change`| `Number` | Play sounds for automatic layout changes when entering or leaving this context. Not available for `default` context. | `1`       |
| `automatic_exe_windows_api_layout_switching_delay`         | `Number` | Milliseconds to wait after app focus before automatic layout switching. Required for applications where layout switching fails without a delay.                    | `0`       |
| `key_bindings`                                             | `Object` | Key remappings specific to this application context.                        | -         |

### `input_bindings` object (within `context_remap`)

| Setting           | Type     | Description                                                                 | Example | Default |
| :---------------- | :------- | :-------------------------------------------------------------------------- | :------ | :------ |
| `[custom binding name]`   | `String` | Custom binding name (can be anything) mapped to hotkey.     | `"f2": "F2 Up"` | -       |

### `key_bindings` object (within `[app exe name]`)

| Setting                | Type         | Description                                                                 | Example |
| :--------------------- | :----------- | :-------------------------------------------------------------------------- | :------ |
| `[custom binding name]`        | `String/Object` | Action to execute, either as simple string or configuration object.       | `"a"` or `{"key": "e", "delay_between": 30}` |

### `[custom binding name]` object (within `key_bindings`)

| Property                | Type         | Description                                                                                                                                                                                                                  | Example | Default |
| :--------------------- | :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ | :------ |
| `key`                  | `String`     | The key or keystroke to execute when the binding is triggered.                                                                                                                                                               | `"a"` | -       |
| `delay_before`         | `Number`     | The delay in milliseconds that controls the pause between when you press the bound key and when the target action executes.                                                                                                  | `30` | `0`     |
| `delay_between`        | `Number`     | The delay in milliseconds between individual key presses within the executed action. While some apps respond instantly, others like Fallout 4 require a brief delay (typically 30-50ms) to register the simulated key press. | `30` | `0`     |
| `wait`                 | `Number`     | Wait for physical key release before sending the `"Up"`.                                                                                                                                                                     | `1` | `0`     |
| `key_wait`             | `String`     | Physical key name to monitor for release.                                                                                                                                                                                    | `"f3"` | -       |
| `modifiers`            | `Array/String` | Modifier keys to hold.                                                                                                                                                                                                       | `["Ctrl", "Shift"]` | -       |
| `allow_native_function`| `Number`     | Allow (`1`) or block (`0`) the key's original function. For example, set to `0` to prevent the Start Menu from opening when remapping the `Win` key.                                                                         | `0` | `1`     |
| `ignore_modifiers`     | `Number`     | Ignore (`1`) or respect (`0`) modifier keys already being held when the binding triggers.                                                                                                                                    | `1` | `0`     |
| `macro`                | `Array`      | Sequence of keys and delays for complex macros.                                                                                                                                                                              | `[{"key": "a"}, {"delay": 50}, {"key": "b"}]` | -       |
| `repeat_count`         | `Number`     | Number of times to repeat the entire macro sequence.                                                                                                                                                                         | `3` | `1`     |

### Macro item

| Property       | Type     | Description                                                                                           | Example | Default |
| :------------- | :------- | :---------------------------------------------------------------------------------------------------- | :------ | :------ |
| `key`          | `String` | The key to press in this step of the macro sequence.                                                  | `"t"` | -       |
| `delay`        | `Number` | Delay in milliseconds before executing the next item in the macro sequence.                           | `100` | `0`     |
| `wait`         | `Number` | Wait for physical key release before sending the `"Up"`.                                              | `1` | `0`     |
| `key_wait`     | `String` | Physical key name to monitor for release.                                                             | `"f2"` | -       |
| `macro`        | `Array`  | Creates a nested macro that can be executed as a single unit, optionally with its own `repeat_count`. | `[{"key": "a"}, {"delay": 50}, {"key": "b"}]` | -       |
| `repeat_count` | `Number` | Number of times to repeat the macro sequence.       | `3` | `1`     |