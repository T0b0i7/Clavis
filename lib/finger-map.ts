/*
 * Clavis - Finger mapping for pedagogical keyboard
 * Left/Right hand + finger color for Dactylo-style learning
 */

export type Finger =
  | "lp" // left pinky
  | "lr" // left ring
  | "lm" // left middle
  | "li" // left index
  | "ri" // right index
  | "rm" // right middle
  | "rr" // right ring
  | "rp"; // right pinky

export const FINGER_COLORS: Record<Finger, string> = {
  lp: "#ff6b6b",
  lr: "#f59e0b",
  lm: "#eab308",
  li: "#22c55e",
  ri: "#06b6d4",
  rm: "#3b82f6",
  rr: "#8b5cf6",
  rp: "#ec4899",
};

export const FINGER_LABEL: Record<Finger, string> = {
  lp: "Auriculaire G",
  lr: "Annulaire G",
  lm: "Majeur G",
  li: "Index G",
  ri: "Index D",
  rm: "Majeur D",
  rr: "Annulaire D",
  rp: "Auriculaire D",
};

// Standard QWERTY finger assignment; AZERTY/QWERTZ/BÉPO reuse same physical key positions
export const KEY_FINGER_QWERTY: Record<string, Finger> = {
  Backquote: "lp",
  Digit1: "lp",
  Digit2: "lp",
  Digit3: "lr",
  Digit4: "lm",
  Digit5: "li",
  Digit6: "li",
  Digit7: "ri",
  Digit8: "ri",
  Digit9: "rm",
  Digit0: "rr",
  Minus: "rr",
  Equal: "rp",
  Backspace: "rp",
  Tab: "lp",
  KeyQ: "lp",
  KeyW: "lr",
  KeyE: "lm",
  KeyR: "li",
  KeyT: "li",
  KeyY: "ri",
  KeyU: "ri",
  KeyI: "rm",
  KeyO: "rr",
  KeyP: "rp",
  BracketLeft: "rp",
  BracketRight: "rp",
  Backslash: "rp",
  CapsLock: "lp",
  KeyA: "lp",
  KeyS: "lr",
  KeyD: "lm",
  KeyF: "li",
  KeyG: "li",
  KeyH: "ri",
  KeyJ: "ri",
  KeyK: "rm",
  KeyL: "rr",
  Semicolon: "rp",
  Quote: "rp",
  Enter: "rp",
  ShiftLeft: "lp",
  KeyZ: "lp",
  KeyX: "lr",
  KeyC: "lm",
  KeyV: "li",
  KeyB: "li",
  KeyN: "ri",
  KeyM: "ri",
  Comma: "rm",
  Period: "rr",
  Slash: "rp",
  ShiftRight: "rp",
  Space: "li",
};

export function fingerForKey(code: string): Finger | undefined {
  return KEY_FINGER_QWERTY[code];
}
