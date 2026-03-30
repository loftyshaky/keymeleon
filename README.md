# Keymeleon
<a href="https://github.com/loftyshaky/keymeleon/tags"><img src="https://img.shields.io/github/v/tag/loftyshaky/keymeleon?label=Version&color=blue" alt="Version"></a> <img src="https://img.shields.io/badge/AutoHotkey-2.0+-purple.svg" alt="AutoHotkey"> <a href="LICENSE.md"><img src="https://img.shields.io/badge/License-MIT-orange.svg" alt="License: MIT"></a> <img src="https://img.shields.io/github/downloads/loftyshaky/keymeleon/total?label=Downloads%20&color=green" alt="GitHub all releases"> <img src="https://img.shields.io/github/downloads/loftyshaky/keymeleon/latest/total?sort=date&label=Downloads@Latest&color=green" alt="GitHub Release">

Keymeleon is a powerful AutoHotkey script that revolutionizes Windows keyboard layout management. It eliminates the frustration of manual layout switching by providing intelligent automation, customizable hotkeys, and rich audio feedback.

## Links

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

**Process minimize and suspend** - Minimize unminimizable windows and pause unpausable games with dedicated hotkeys. Suspend any running process, or combine both actions to minimize and suspend with a single keystroke.

## Table of Contents

- [System requirements](#system-requirements)
- [Quick Start](#quick-start)
- [User directory and configuration files](#user-directory-and-configuration-files)
  - [User directory structure](#user-directory-structure)
  - [User directory location config](#user-directory-location-config)
  - [Main config](#main-config)
  - [Customizing user directory location](#customizing-user-directory-location)
    - [Important notes](#important-notes)
- [Configuration example](#configuration-example)
  - [Real-world example](#real-world-example)
- [Layout switching methods](#layout-switching-methods)
  - [Switching methods](#switching-methods)
  - [Setup guide](#setup-guide)
    - [Step 1: Define your layouts](#step-1-define-your-layouts)
    - [Step 2: Configure hotkeys](#step-2-configure-hotkeys)
  - [How it works](#how-it-works)
  - [Getting layout IDs](#getting-layout-ids)
- [Layout switching techniques](#layout-switching-techniques)
  - [Switching techniques](#switching-techniques)
  - [Usage](#usage)
  - [Technical details](#technical-details)
    - [Windows API technique](#windows-api-technique)
    - [Win+Space simulation](#winspace-simulation)
  - [Automatic behavior](#automatic-behavior)
  - [Timing configuration](#timing-configuration)
- [Audio feedback](#audio-feedback)
  - [Overview](#overview)
  - [File structure](#file-structure)
  - [Basic Setup](#basic-setup)
    - [Layout & typing sounds](#layout--typing-sounds)
    - [Feature toggle sounds](#feature-toggle-sounds)
  - [Advanced customization](#advanced-customization)
- [Features](#features-1)
  - [Feature Configuration](#feature-configuration)
- [Conditional layouts](#conditional-layouts)
  - [Basic Example: Game vs. Desktop Layouts](#basic-example-game-vs-desktop-layouts)
  - [App detection](#app-detection)
- [Context key remapping](#context-key-remapping)
  - [Basic example: App-specific key binding](#basic-example-app-specific-key-binding)
  - [How it works](#how-it-works-1)
    - [Input bindings](#input-bindings)
    - [Key bindings](#key-bindings)
    - [How it works](#how-it-works-2)
    - [Action execution](#action-execution)
  - [Hotkeys with modifiers](#hotkeys-with-modifiers)
    - [Usage notes](#usage-notes)
  - [Allow native key function](#allow-native-key-function)
  - [Ignore extra modifiers](#ignore-extra-modifiers)
  - [Wait until key release](#wait-until-key-release)
    - [Example: Reload with hold-to-holster functionality](#example-reload-with-hold-to-holster-functionality)
    - [How it works](#how-it-works-3)
  - [Modifiers release timeout](#modifiers-release-timeout)
    - [Problem Scenario](#problem-scenario)
    - [Example](#example)
    - [Solution: modifiers_release_timeout](#solution-modifiers_release_timeout)
    - [How it works](#how-it-works-4)
    - [Configuration Example](#configuration-example-1)
- [Macros](#macros)
  - [Example 1: Typing with progressive delays](#example-1-typing-with-progressive-delays)
  - [Example 2: Select all and paste](#example-2-select-all-and-paste)
  - [Macros with advanced properties](#macros-with-advanced-properties)
- [Mouse button support](#mouse-button-support)
  - [Setup process](#setup-process)
  - [Example: MMO mouse configuration](#example-mmo-mouse-configuration)
  - [How it works](#how-it-works-5)
- [Remapping keyboard keys and hotkeys](#remapping-keyboard-keys-and-hotkeys)
  - [Basic example](#basic-example)
  - [Layout-universal keyboard shortcuts](#layout-universal-keyboard-shortcuts)
    - [Setup guide](#setup-guide-1)
- [Process minimize and suspend](#process-minimize-and-suspend)
  - [Configuration](#configuration)
- [Reference](#reference)
  - [`layouts` object](#layouts-object)
  - [`hotkeys` object](#hotkeys-object)
  - [`features` object](#features-object)
  - [`audio` object](#audio-object)
  - [`process_control` object](#process_control-object)
  - [`context_remap` object (within `hotkeys`)](#context_remap-object-within-hotkeys)
  - [`exe` object (within `context_remap`)](#exe-object-within-context_remap)
  - [`[app exe name]` (within `exe` objects)](#app-exe-name-within-exe-objects)
  - [`input_bindings` object (within `context_remap`)](#input_bindings-object-within-context_remap)
  - [`key_bindings` object (within `[app exe name]`)](#key_bindings-object-within-app-exe-name)
  - [`[custom binding name]` object (within `key_bindings`)](#custom-binding-name-object-within-key_bindings)
  - [Macro item](#macro-item)

## System requirements

- Windows 10/11
- [AutoHotkey v2.0+](https://www.autohotkey.com)

## Quick Start

1. Install [AutoHotkey v2.0](https://www.autohotkey.com) if you haven't already.

2. Download the [latest release](https://github.com/loftyshaky/keymeleon/releases/latest) and extract it to your preferred location.

3. Run `keymeleon.ahk` as an administrator to start the script.

## User directory and configuration files

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

## Configuration example

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
        "resume_all_suspended_processes": "!+sc006",
        "resume_current_process_suspended": "!+sc005",
        "display_current_layout_id": "^!+sc017",
        "set_primary_layout": "ScrollLock",
        "set_secondary_layout": "Pause",
        "toggle_all_bindings": "^!+sc035",
        "toggle_current_process_minimize_and_suspend_state": "!+sc004",
        "toggle_current_process_minimized_state": "!+sc002",
        "toggle_current_process_suspend_state": "!+sc003",
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
    },
    "process_control": {
        "target_processes": ["Fallout4", "KingdomCome"],
        "suspend_post_minimize_delay": 10,
        "resume_pre_unminimize_delay": 10,
        "pre_screenshot_delay": 50,
        "post_screenshot_delay": 50,
        "pre_minimize_screenshot": 1,
        "pre_suspend_screenshot": 1
    }
}
```

### Real-world example

For advanced configurations including application-specific layouts, key bindings, and mouse button mappings, explore the complete example in the [example-config](example-config/) folder.

## Layout switching methods

Keymeleon provides two powerful methods for switching between keyboard layouts, giving you both quick cycling and instant access to any layout.

### Switching methods

| Method                     | Description                                                                                        | Use Case                                                                          |
| :------------------------- | :------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| Sequential switching       | Quickly switch to your primary layout or cycle through secondary layouts using two dedicated keys. | Ideal for users who frequently toggle between a main layout and 1-2 alternatives. |
| Dedicated hotkey switching | Assign specific keyboard shortcuts to switch directly to individual layouts.                       | Perfect for users who need instant access to multiple specific layouts.           |

Sequential switching lets you press one key (e.g., `ScrollLock`) to jump to your primary layout (like Dvorak) from any layout, and another key (e.g., `Pause`) to cycle through your secondary layouts (like QWERTY, Spanish, German).

Dedicated hotkey switching gives each layout its own keyboard shortcut (e.g., `Ctrl+Shift+F8` for Dvorak, `Ctrl+Shift+F9` for QWERTY) for one-press access.

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

[`hotkeys` object reference](#hotkeys-object)<br>
[`layouts` object reference](#layouts-object)

## Layout switching techniques

### Switching techniques

| Technique              | Tray icon color | Description                                                    | Best for                        |
| :--------------------- | :-------------- | :------------------------------------------------------------- | :------------------------------ |
| Windows API            | Blue            | Uses internal Windows functions for instant layout switching.  | Most apps, general use.         |
| `Win+Space` simulation | Green           | Simulates physical keyboard presses for maximum compatibility. | Problematic apps, system areas. |

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

[`features` object reference](#features-object)<br>
[`hotkeys` object reference](#hotkeys-object)<br>
[`layouts` object reference](#layouts-object)

## Audio feedback

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

[`audio` object reference](#audio-object)

## Features

### Feature Configuration

The `features` object controls which Keymeleon functions are active. Use `1` to enable a feature and `0` to disable it. Each feature can be toggled using the corresponding hotkey defined in the `hotkeys` object.

**Example:** The `enable_dedicated_layout_switching` feature is controlled by the hotkey specified in `toggle_dedicated_layout_switching`.

[`features` object reference](#features-object)<br>
[`hotkeys` object reference](#hotkeys-object)

## Conditional layouts

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

[`[app exe name] (within exe objects)` object reference](#app-exe-name-within-exe-objects)

## Context key remapping
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

`"F2 Up"` - The actual key to listen for, with `Up` indicating the action triggers on key release.

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

The `delay_between` property introduces a pause (in milliseconds) between the simulated `key` `Down` and `Up` states. This delay helps ensure keystrokes are reliably registered by applications that may not process instant or near-simultaneous key events.

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

### Allow native key function

The `allow_native_function` property controls whether the original function of a key is preserved when it's remapped.

`allow_native_function`: `1` - The key performs both its original function AND the custom action.

`allow_native_function`: `0` - The key performs ONLY the custom action (original function is blocked).

Example: Let the `Left Win` key open the Start menu while also typing the letter `f` into the search bar:

```json
{
    "context_remap": {
        "exe": {
            "default": {
                "key_bindings": {
                    "l_win": {
                        "allow_native_function": 1,
                        "key": "f"
                    }
                }
            }
        },
        "input_bindings": {
            "l_win": "LWin Up"
        }
    }
}
```

### Ignore extra modifiers

If a remapped key still doesn't work reliably, try setting `ignore_extra_modifiers` to `1`. This tells Keymeleon to ignore any extra modifier keys (`Ctrl`, `Shift`, `Alt`) you might be holding when the remapped key is pressed. In other words, the hotkey will trigger even if you're holding modifiers that aren't part of the hotkey's definition.

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
                            "key": "r",
                            "wait": 1
                        },
                        "f3_sc": {
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

### Modifiers release timeout

#### Problem Scenario

When activating a hotkey that uses modifier keys (`Ctrl`, `Shift`, `Alt`), you might inadvertently trigger the wrong command if those modifiers are still physically held down.

#### Example

You configure a hotkey `Ctrl+Shift+F2` to trigger `Ctrl+V` (paste formatted text).

While holding `Ctrl` and `Shift` to press `F2`, Windows might register `Ctrl+Shift+V` (paste unformatted) instead of your intended `Ctrl+V`.

#### Solution: modifiers_release_timeout

This property instructs Keymeleon to wait for the specified milliseconds for you to release held modifier keys before executing the target command.

#### How it works

1. You press the hotkey (e.g., `Ctrl+Shift+F2`).
2. Keymeleon detects the `Ctrl` and `Shift` modifiers are still held.
3. It waits up to the specified timeout (e.g., 1000ms) for you to release them.
4. Once all modifiers are released OR the timeout expires, it executes `Ctrl+V`.

#### Configuration Example

```json
{
    "context_remap": {
        "exe": {
            "default": {
                "key_bindings": {
                    "ctrl_shift_f2": {
                        "key": "v",
                        "modifiers": ["Ctrl"],
                        "modifiers_release_timeout": 1000
                    }
                }
            }
        },
        "input_bindings": {
            "ctrl_shift_f2": "^+F2"
        }
    }
}
```

[`[custom binding name] object (within key_bindings)` object reference](#custom-binding-name-object-within-key_bindings)

## Macros
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

To use `allow_native_function` and `ignore_extra_modifiers` with macros, you need to wrap your macro array inside a `macro` object. This object structure also allows you to specify a `repeat_count` property to execute the macro multiple times in succession:

```json
{
    "exe": {
        "default": {
            "key_bindings": {
                "ctrl_shift_up": {
                    "allow_native_function": 1,
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
        "ctrl_shift_up": "^+Up"
    }
}
```

When you press `Ctrl+Shift+Up`, this configuration performs two simultaneous actions: the native `Ctrl+Shift+Up` function (which typically extends text selection upward) and a custom macro that types "test" three times at the cursor position.

You can repeat specific portions of a macro independently using nested macro objects:

```json
{
    "exe": {
        "default": {
            "key_bindings": {
                "ctrl_shift_up": {
                    "allow_native_function": 1,
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
        "ctrl_shift_up": "^+Up"
    }
}
```

This configuration types "test2" twice, adds a space, then types "test4" four times.

[Macro item reference](#macro-item)

## Mouse button support

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
                        "key": 1,
                        "wait": 1
                    },
                    "button_10": {
                        "key": 0,
                        "wait": 1
                    },
                    "button_1_alt": {
                        "key": "k",
                        "wait": 1
                    },
                    "button_2": {
                        "key": 2,
                        "wait": 1
                    },
                    "button_2_alt": {
                        "key": "i",
                        "wait": 1
                    },
                    "button_3": {
                        "key": 3,
                        "wait": 1
                    },
                    "button_3_alt": {
                        "key": "j",
                        "wait": 1
                    },
                    "button_4": {
                        "key": 4,
                        "wait": 1
                    },
                    "button_4_alt": {
                        "key": "m",
                        "wait": 1
                    },
                    "button_5": {
                        "key": 5,
                        "wait": 1
                    },
                    "button_5_alt": {
                        "key": "o",
                        "wait": 1
                    },
                    "button_6": {
                        "key": 6,
                        "wait": 1
                    },
                    "button_7": {
                        "key": 7,
                        "wait": 1
                    },
                    "button_8": {
                        "key": 8,
                        "wait": 1
                    },
                    "button_9": {
                        "key": 9,
                        "wait": 1
                    },
                    "dpi+": {
                        "key": "F9",
                        "wait": 1
                    },
                    "dpi-": {
                        "key": "F5",
                        "wait": 1
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
            "button_11": "F23",
            "button_12": "F24",
            "button_1_alt": "!F13",
            "button_2": "F14",
            "button_2_alt": "!F14",
            "button_3": "F15",
            "button_3_alt": "!F15",
            "button_4": "F16",
            "button_4_alt": "!F16",
            "button_5": "F17",
            "button_5_alt": "!F17",
            "button_6": "F18",
            "button_7": "F19",
            "button_8": "F20",
            "button_9": "F21",
            "dpi+": "^F13",
            "dpi-": "^F14"
        }
    }
}
```

### How it works

In Fallout 4: Mouse buttons 1-10 trigger the numeric favorites menu (`1`-`0`). The `Alt` key combined with buttons 1-5 opens various in-game menus (Pip-Boy). DPI buttons are used for Quick load (`F9`) and Quick save (`F5`).

On Desktop: Mouse buttons 1-2 trigger `Ctrl+C` and `Ctrl+V` respectively.

Mouse buttons 3-10 have no special function on desktop in this configuration.

This approach gives you complete control over your mouse buttons for different apps while maintaining standard functionality elsewhere.

## Remapping keyboard keys and hotkeys

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
                        "key": "z",
                        "modifiers": [
                            "Ctrl"
                        ]
                    },
                    "ctrl_a": {
                        "key": "a",
                        "modifiers": [
                            "Ctrl"
                        ]
                    },
                    "ctrl_b": {
                        "key": "n",
                        "modifiers": [
                            "Ctrl"
                        ]
                    },
                    "ctrl_d": {
                        "key": "h",
                        "modifiers": [
                            "Ctrl"
                        ]
                    },
                    "ctrl_f": {
                        "key": "y",
                        "modifiers": [
                            "Ctrl"
                        ]
                    },
                    "ctrl_j": {
                        "key": "c",
                        "modifiers": [
                            "Ctrl"
                        ]
                    },
                    "ctrl_k": {
                        "key": "v",
                        "modifiers": [
                            "Ctrl"
                        ]
                    },
                    "ctrl_o": {
                        "key": "s",
                        "modifiers": [
                            "Ctrl"
                        ]
                    },
                    "ctrl_shift_k": {
                        "key": "v",
                        "modifiers": [
                            "Ctrl",
                            "Shift"
                        ]
                    },
                    "ctrl_shift_o": {
                        "key": "s",
                        "modifiers": [
                            "Ctrl",
                            "Shift"
                        ]
                    },
                    "ctrl_shift_q": {
                        "key": "x",
                        "modifiers": [
                            "Ctrl"
                        ]
                    },
                    "ctrl_u": {
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

## Process minimize and suspend
Ever wanted to minimize an unminimizable window. Or pause an unpausable game? The `toggle_current_process_minimized_state`, `toggle_current_process_suspend_state`, `toggle_current_process_minimize_and_suspend_state`, `resume_current_process_suspended` and `resume_all_suspended_processes` hotkeys can do this!

### Configuration
Add a `process_control` object to the root of your existing config:

```
{
    // ... your existing configuration ...

    "process_control": {
        "target_processes": ["Fallout4", "KingdomCome"],
        "suspend_post_minimize_delay": 10,
        "resume_pre_unminimize_delay": 10,
        "pre_screenshot_delay": 50,
        "post_screenshot_delay": 50,
        "pre_minimize_screenshot": 1,
        "pre_suspend_screenshot": 1
    }
}
```

Then, use one of the hotkeys specified above. You can also add these hotkey properties to an `[app exe name]` object (within the `exe` objects) to override the global hotkeys for a specific app.

[`process_control` object reference](#process_control-object)<br>
[`hotkeys` object reference](#hotkeys-object)<br>
[`[app exe name] (within exe objects)` object reference](#app-exe-name-within-exe-objects)

## Reference

### `layouts` object

| Property                     | Type     | Description                                                                                     | Example                                              | Default |
| :-------------------------- | :------- | :---------------------------------------------------------------------------------------------- | :--------------------------------------------------- | :------ |
| `all_layouts_ordered`       | `Array`  | Names of all layouts in exact Windows language bar order. Names must be unique.                 | `["en-DVORAK", "en-US", "es-ES", "de-DE"]`           | -       |
| `layout_ids`                | `Array`  | Layout IDs corresponding to `all_layouts_ordered`. Get IDs with `Ctrl+Shift+Alt+I`.             | `["-268303351", "67699721", "67767306", "67568647"]` | -       |
| `primary_layout`            | `String` | Your default layout name from `all_layouts_ordered`.                                            | `"en-DVORAK"`                                        | -       |
| `secondary_layouts`         | `Array`  | Other layouts for cycling, in desired order.                                                    | `["en-US", "es-ES", "de-DE"]`                        | -       |
| `fallback_layout_switching_exes` | `Array` | Apps that should always use `Win+Space` simulation. | `["x360ce"]` | -    |
| `layout_switching_delay`    | `Number` | Delay in milliseconds for `Win+Space` technique. | `30` | `0`     |

### `hotkeys` object

| Property                     | Type     | Description                                                                                     | Example                                              | Default |
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
| `toggle_current_process_minimized_state`  | `String`  | Toggle the current window between minimized and unminimized states. If window is normal → minimizes it. If window is minimized → restores it. | `"!+sc002"` (`Shift+Alt+1`)       |
| `toggle_current_process_suspend_state`        | `String` | Toggle the current process between suspended and resumed states. If process is running → suspends it. If process is suspended → resumes it.                                                           | `"!+sc003"` `(Shift+Alt+2)`                                      | -       |
| `toggle_current_process_minimize_and_suspend_state`      | `String` | Toggle between minimized+suspended and unminimized+resumed states. If window is normal → minimizes then suspends. If window is minimized → resumes then unminimizes.                                                   | `"!+sc004"` (`Shift+Alt+3`)                                            | -       |
| `resume_current_process_suspended` | `String` | Resume and unminimize the current suspended process, then suspend it again.  If the window is already active, this behaves the same as `toggle_current_process_minimize_and_suspend_state`                                                            | `"!+sc005"` (`Shift+Alt+4`)                  | -       |
| `resume_all_suspended_processes` | `String` | Resume all processes listed in `target_processes`. Works regardless of the active window. | `"!+sc006"` (`Shift+Alt+5`) | - |

### `features` object

Each property accepts only two values: `1` (enabled) or `0` (disabled).

| Property                               | Type     | Description                                                                 | Default |
| :------------------------------------ | :------- | :-------------------------------------------------------------------------- | :------ |
| `enable_dedicated_layout_switching`   | `Number` | Enable dedicated hotkeys for direct layout switching. (e.g., `Ctrl+Shift+F8` for `en-DVORAK`, `Ctrl+Shift+F9` for `en-US`). | `1`     |
| `enable_sequential_layout_switching`  | `Number` | Enable cycling between primary and secondary layouts using sequential switching. | `1`     |
| `enable_windows_api_layout_switching` | `Number` | Use instant Windows API layout switching instead of `Win+Space` simulation. | `1`     |
| `enable_feature_state_audio`          | `Number` | Play sounds when enabling or disabling features via hotkeys.                | `1`     |
| `enable_layout_switching_audio`       | `Number` | Play unique sounds when switching between layouts.                          | `1`     |
| `enable_typing_audio`                 | `Number` | Play unique typing sounds for different keyboard layouts.                   | `1`     |
| `enable_all_bindings`                 | `Number` | Enable all custom key bindings.                   | `1`     |

### `audio` object

| Property | Type | Description | Example | Default |
| :------- | :--- | :---------- | :------ | :------ |
| `default_file_extension` | `String` | Default audio format for unspecified files. | `mp3` | `wav` |
| `layout_switching` | `Object` | Layout switching sounds with custom filenames. | - | `{}` |
| `feature_state` | `Object` | Feature toggle sounds with custom filenames. | - | `{}` |
| `typing` | `Object` | Typing sounds with custom filenames. | - | `{}` |

### `process_control` object

| Property                     | Type     | Description                                                                                     | Example                                              | Default |
| :-------------------------- | :------- | :---------------------------------------------------------------------------------------------- | :--------------------------------------------------- | :------ |
| `target_processes`  | `Array`  | Process names without `.exe` that can be controlled via hotkeys. When suspending/minimizing, the active window's process must match one of these names. When using resume_all_suspended_processes, all processes in this list will be resumed. | `["Fallout4", "KingdomCome"]` | `[]` |
| `suspend_post_minimize_delay`        | `Number` | Delay in milliseconds between minimizing a window and suspending its process.                                                           | `10`                                      | `100`       |
| `resume_pre_unminimize_delay`      | `Number` | Delay in milliseconds between resuming a process and unminimizing its window.                                                | `10`                                            | `100`       |
| `pre_screenshot_delay` | `Number` | Delay in milliseconds before pressing` PrintScreen`.                                                              | `50`                  | `100`       |
| `post_screenshot_delay` | `Number` | Delay in milliseconds after pressing `PrintScreen`. | `50` | `100` |
| `pre_minimize_screenshot` | `Number` | Enable (`1`) or disable (`0`) pressing `PrintScreen` before minimizing the window. | `1` | `0`|
| `pre_suspend_screenshot` | `Number` | Enable (`1`) or disable (`0`) pressing `PrintScreen` before suspending the process. | `1` | `0` |

### `context_remap` object (within `hotkeys`)

| Property           | Type     | Description                                                                 | Default |
| :---------------- | :------- | :-------------------------------------------------------------------------- | :------ |
| `exe`             | `Object` | Application-specific configurations. Contains executable names as keys.     | -       |
| `input_bindings`  | `Object` | Physical keys to remap, with custom names as keys and hotkeys as values. | -       |

### `exe` object (within `context_remap`)

| Setting           | Type     | Description                                                                 | Example | Default |
| :---------------- | :------- | :-------------------------------------------------------------------------- | :------ | :------ |
| `[App exe name]` | `Object` | Configuration for specific application (use .exe filename without extension). | `"Fallout4"` | -       |
| `default`         | `Object` | Configuration applied to all unspecified applications.                      | -       | -       |

### `[app exe name]` (within `exe` objects)

| Property                                                    | Type   | Description                                                                                                                                     | Example | Default   |
| :--------------------------------------------------------- | :----- | :---------------------------------------------------------------------------------------------------------------------------------------------- | :------ | :-------- |
| `layout`                                                   | `String` | Layout to use in this context (from `all_layouts_ordered`).                                                                                     | `"en-US"` | -         |
| `enable_layout_switching_audio`                            | `Number` | Play layout switching sounds for manual changes when you're in this context.                                                                       | `1` | `default` |
| `enable_typing_audio`                                      | `Number` | Enable typing sounds in this context.                                                                                                           | `1` | `default` |
| `enable_layout_switching_audio_for_automatic_layout_change`| `Number` | Play sounds for automatic layout changes when entering or leaving this context. Not available for `default` context.                                          | `0` | `1`       |
| `automatic_exe_windows_api_layout_switching_delay`         | `Number` | Milliseconds to wait after app focus before automatic layout switching. Required for applications where layout switching fails without a delay. | `1000` | `0`       |
| `key_bindings`                                 | `Object` | Key remappings specific to this application context. | `{"f2": "a"}` | -         |
| `binding_disabled_layouts`                                 | `Array` | An exclusion list for the context-aware key binding system. When a user switches to any layout specified in this array, the system will ignore all entries in `key_bindings` for the current app context, effectively disabling the custom mappings. Layout names must match an entry in `all_layouts_ordered`. | `["en-DVORAK", "es-ES", "de-DE"]` | -         |
| `toggle_current_process_minimized_state`  | `String`  | Toggle the current window between minimized and unminimized states. If window is normal → minimizes it. If window is minimized → restores it. | `"!+sc002"` (`Shift+Alt+1`)       |
| `toggle_current_process_suspend_state`        | `String` | Toggle the current process between suspended and resumed states. If process is running → suspends it. If process is suspended → resumes it.                                                           | `"!+sc003"` `(Shift+Alt+2)`                                      | -       |
| `toggle_current_process_minimize_and_suspend_state`      | `String` | Toggle between minimized+suspended and unminimized+resumed states. If window is normal → minimizes then suspends. If window is minimized → resumes then unminimizes.                                                   | `"!+sc004"` (`Shift+Alt+3`)                                            | -       |
| `resume_current_process_suspended` | `String` | Resume and unminimize the current suspended process, then suspend it again.  If the window is already active, this behaves the same as `toggle_current_process_minimize_and_suspend_state`                                                            | `"!+sc005"` (`Shift+Alt+4`)                  | -       |
| `resume_all_suspended_processes` | `String` | Resume all processes listed in `target_processes`. Works regardless of the active window. | `"!+sc006"` (`Shift+Alt+5`) | - |

### `input_bindings` object (within `context_remap`)

| Property           | Type     | Description                                                                 | Example | Default |
| :---------------- | :------- | :-------------------------------------------------------------------------- | :------ | :------ |
| `[custom binding name]`   | `String` | Custom binding name (can be anything) mapped to hotkey.     | `"f2": "F2 Up"` | -       |

### `key_bindings` object (within `[app exe name]`)

| Property                | Type         | Description                                                                 | Example |
| :--------------------- | :----------- | :-------------------------------------------------------------------------- | :------ |
| `[custom binding name]`        | `String/Object` | Action to execute, either as simple string or configuration object.       | `"a"` or `{"key": "e", "delay_between": 30}` |

### `[custom binding name]` object (within `key_bindings`)

| Property                | Type         | Description                                                                                                                                                                                                                  | Example | Default |
| :--------------------- | :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ | :------ |
| `key`                  | `String`     | The key or keystroke to execute when the binding is triggered.                                                                                                                                                               | `"a"` | -       |
| `delay_before`         | `Number`     | The delay in milliseconds that controls the pause between when you press the bound key and when the target action executes.                                                                                                  | `30` | `0`     |
| `delay_between`        | `Number`     | The delay in milliseconds between the simulated `key` `Down` and `Up` states.  While some apps respond instantly, others like Fallout 4 require a brief delay (typically 30-50ms) to register the simulated key press. | `30` | `0`     |
| `pre_key_delay`        | `Number`     | The Delay in milliseconds between the `modifiers` `Up` and `key` `Down` states. | `30` | `0`     |
| `post_key_delay`        | `Number`     | The Delay in milliseconds between `key` `Up` and  `modifiers` `Down` states. | `30` | `0`     |
| `wait`                 | `Number`     | Wait for physical key release before sending the `Up`.                                                                                                                                                                     | `1` | `0`     |
| `key_wait`             | `String`     | Physical key name to monitor for release.                                                                                                                                                                                    | `"f3"` | -       |
| `modifiers`            | `Array/String` | Modifier keys to hold.                                                                                                                                                                                                       | `["Ctrl", "Shift"]` | -       |
| `allow_native_function`| `Number`     | Allow (`1`) or block (`0`) the key's original function. For example, set to `0` to prevent the Start Menu from opening when remapping the `Win` key.                                                                         | `1` | `0`     |
| `ignore_extra_modifiers`     | `Number`     | Ignore (`1`) or respect (`0`) extra modifier keys already being held when the binding triggers.                                                                                                                                    | `1` | `0`     |
| `blind`     | `Number`     | Send `key` with `{Blind}` (`1`) or without (`0`).                                                                                                                                    | `1` | `0`     |
| `send_mode`         | `String` | Send method for executing the hotkey.  Possible values: `Send`,`SendInput`, `SendText`, `SendPlay`, `SendEvent`.                                      | `SendEvent` | `SendInput`     |
| `modifiers_release_timeout`     | `Number`     | Time in milliseconds that Keymeleon waits for physically held modifier keys to be released before executing the target command. If the timeout expires before modifiers are released, the command executes immediately.                                                                                                                                    | `300` | `0`     |
| `macro`                | `Array`      | Sequence of keys and delays for complex macros.                                                                                                                                                                              | `[{"key": "a"}, {"delay": 50}, {"key": "b"}]` | -       |
| `repeat_count`         | `Number`     | Number of times to repeat the entire macro sequence.                                                                                                                                                                         | `3` | `1`     |

### Macro item

| Property       | Type     | Description                                                                                           | Example | Default |
| :------------- | :------- | :---------------------------------------------------------------------------------------------------- | :------ | :------ |
| `key`          | `String` | The key to press in this step of the macro sequence.                                                  | `"t"` | -       |
| `delay`        | `Number` | Delay in milliseconds before executing the next item in the macro sequence.                           | `100` | `0`     |
| `wait`         | `Number` | Wait for physical key release before sending the `Up`.                                              | `1` | `0`     |
| `key_wait`     | `String` | Physical key name to monitor for release.                                                             | `"f2"` | -       |
| `blind`         | `Number` | Send `key` with `{Blind}` (`1`) or without (`0`).                                              | `1` | `0`     |
| `send_mode`         | `String` | Send method for executing the hotkey.  Possible values: `Send`,`SendInput`, `SendText`, `SendPlay`, `SendEvent`.                                      | `SendEvent` | `SendInput`     |
| `macro`        | `Array`  | Creates a nested macro that can be executed as a single unit, optionally with its own `repeat_count`. | `[{"key": "a"}, {"delay": 50}, {"key": "b"}]` | -       |
| `repeat_count` | `Number` | Number of times to repeat the macro sequence.       | `3` | `1`     |