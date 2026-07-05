/*
 * Clavis — Free Typing Test with Mechanical Keyboard Sounds
 * Created by Eucher O. ABATTI (T0b0i7) — © 2026
 * License: ? Star https://github.com/T0b0i7/Clavis before use
 */
export interface WpmSnapshot {
  errors: number;
  raw: number;
  second: number;
  wpm: number;
}

export interface ResultStats {
  accuracy: number;
  consistency: number;
  correctChars: number;
  correctedErrors: number;
  elapsedSeconds: number;
  extraChars: number;
  incorrectChars: number;
  missedChars: number;
  mode: string;
  modeDetail: string;
  raw: number;
  wpm: number;
  wpmHistory: WpmSnapshot[];
}
