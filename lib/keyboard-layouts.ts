/*
 * Clavis - Free Typing Test with Mechanical Keyboard Sounds
 * Created by Eucher O. ABATTI (T0b0i7) - (c) 2026
 * License: Star https://github.com/T0b0i7/Clavis before use
 */

export type KeyLabel = [normal: string, shift?: string];
export type KeyboardLayout = Partial<Record<string, KeyLabel>>;
export type KeyboardLayoutName = "qwerty" | "azerty" | "qwertz" | "bepo";

export const QWERTY_LAYOUT: KeyboardLayout = {
  Backquote: ["`", "~"],
  Digit1: ["1", "!"],
  Digit2: ["2", "@"],
  Digit3: ["3", "#"],
  Digit4: ["4", "$"],
  Digit5: ["5", "%"],
  Digit6: ["6", "^"],
  Digit7: ["7", "&"],
  Digit8: ["8", "*"],
  Digit9: ["9", "("],
  Digit0: ["0", ")"],
  Minus: ["-", "_"],
  Equal: ["=", "+"],
  KeyQ: ["Q"],
  KeyW: ["W"],
  KeyE: ["E"],
  KeyR: ["R"],
  KeyT: ["T"],
  KeyY: ["Y"],
  KeyU: ["U"],
  KeyI: ["I"],
  KeyO: ["O"],
  KeyP: ["P"],
  BracketLeft: ["[", "{"],
  BracketRight: ["]", "}"],
  Backslash: ["\\", "|"],
  KeyA: ["A"],
  KeyS: ["S"],
  KeyD: ["D"],
  KeyF: ["F"],
  KeyG: ["G"],
  KeyH: ["H"],
  KeyJ: ["J"],
  KeyK: ["K"],
  KeyL: ["L"],
  Semicolon: [";", ":"],
  Quote: ["'", '"'],
  KeyZ: ["Z"],
  KeyX: ["X"],
  KeyC: ["C"],
  KeyV: ["V"],
  KeyB: ["B"],
  KeyN: ["N"],
  KeyM: ["M"],
  Comma: [",", "<"],
  Period: [".", ">"],
  Slash: ["/", "?"],
};

export const AZERTY_LAYOUT: KeyboardLayout = {
  Backquote: ["²", "~"],
  Digit1: ["&", "1"],
  Digit2: ["é", "2", "~"],
  Digit3: ['"', "3", "#"],
  Digit4: ["'", "4", "{"],
  Digit5: ["(", "5", "["],
  Digit6: ["-", "6", "|"],
  Digit7: ["è", "7", "`"],
  Digit8: ["_", "8", "\\"],
  Digit9: ["ç", "9", "^"],
  Digit0: ["à", "0", "@"],
  Minus: [")", "°", "]"],
  Equal: ["=", "+"],
  KeyQ: ["A"],
  KeyW: ["Z"],
  KeyE: ["E"],
  KeyR: ["R"],
  KeyT: ["T"],
  KeyY: ["Y"],
  KeyU: ["U"],
  KeyI: ["I"],
  KeyO: ["O"],
  KeyP: ["P"],
  BracketLeft: ["^", "¨"],
  BracketRight: ["$", "£"],
  Backslash: ["*", "µ"],
  KeyA: ["Q"],
  KeyS: ["S"],
  KeyD: ["D"],
  KeyF: ["F"],
  KeyG: ["G"],
  KeyH: ["H"],
  KeyJ: ["J"],
  KeyK: ["K"],
  KeyL: ["L"],
  Semicolon: ["M"],
  Quote: ["ù", "%"],
  KeyZ: ["W"],
  KeyX: ["X"],
  KeyC: ["C"],
  KeyV: ["V"],
  KeyB: ["B"],
  KeyN: ["N"],
  KeyM: [",", "?"],
  Comma: [";", "."],
  Period: [":", "/"],
  Slash: ["!", "§"],
};

export const QWERTZ_LAYOUT: KeyboardLayout = {
  ...QWERTY_LAYOUT,
  KeyY: ["Z"],
  KeyZ: ["Y"],
};

export const BEPO_LAYOUT: KeyboardLayout = {
  Backquote: ["$", "#"],
  Digit1: ['"', "1", "—"],
  Digit2: ["«", "2", "‹"],
  Digit3: ["»", "3", "›"],
  Digit4: ["(", "4", "["],
  Digit5: [")", "5", "]"],
  Digit6: ["@", "6", "^"],
  Digit7: ["+", "7", "†"],
  Digit8: ["-", "8", "‡"],
  Digit9: ["/", "9", "—"],
  Digit0: ["*", "0", "∞"],
  Minus: ["=", "="],
  Equal: ["%", "%"],
  KeyQ: ["B"],
  KeyW: ["É"],
  KeyE: ["P"],
  KeyR: ["O"],
  KeyT: ["È"],
  KeyY: ["^", "!"],
  KeyU: ["V"],
  KeyI: ["D"],
  KeyO: ["L"],
  KeyP: ["J"],
  BracketLeft: ["Z"],
  BracketRight: ["W"],
  KeyA: ["A"],
  KeyS: ["U"],
  KeyD: ["I"],
  KeyF: ["E"],
  KeyG: [","],
  KeyH: ["C"],
  KeyJ: ["T"],
  KeyK: ["S"],
  KeyL: ["R"],
  Semicolon: ["N"],
  Quote: ["M"],
  Backslash: ["Ç"],
  KeyZ: ["À"],
  KeyX: ["Y"],
  KeyC: ["X"],
  KeyV: ["."],
  KeyB: ["K"],
  KeyN: ["'"],
  KeyM: ["Q"],
  Comma: ["G"],
  Period: ["H"],
  Slash: ["F"],
};

export const KEYBOARD_LAYOUTS: Record<KeyboardLayoutName, KeyboardLayout> = {
  qwerty: QWERTY_LAYOUT,
  azerty: AZERTY_LAYOUT,
  qwertz: QWERTZ_LAYOUT,
  bepo: BEPO_LAYOUT,
};

export const KEYBOARD_LAYOUT_OPTIONS: {
  id: KeyboardLayoutName;
  label: string;
}[] = [
  { id: "qwerty", label: "QWERTY" },
  { id: "azerty", label: "AZERTY" },
  { id: "qwertz", label: "QWERTZ" },
  { id: "bepo", label: "BÉPO" },
];

export function layoutForLanguage(lang: string): KeyboardLayoutName {
  if (lang === "french") {
    return "azerty";
  }
  return "qwerty";
}
