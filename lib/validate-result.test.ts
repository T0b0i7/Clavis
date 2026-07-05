import { describe, expect, it } from "vitest";
import type { ResultStats } from "./types";
import { validateResult } from "./validate-result";

function makeStats(overrides: Partial<ResultStats> = {}): ResultStats {
  return {
    wpm: 50,
    raw: 55,
    accuracy: 95,
    correctChars: 200,
    incorrectChars: 5,
    extraChars: 2,
    missedChars: 3,
    consistency: 90,
    elapsedSeconds: 30,
    correctedErrors: 1,
    mode: "time",
    modeDetail: "30",
    wpmHistory: [],
    ...overrides,
  };
}

describe("validateResult", () => {
  it("accepts a valid result", () => {
    const result = validateResult(makeStats());
    expect(result).toEqual({ valid: true });
  });

  it("rejects no_keystrokes", () => {
    const result = validateResult(
      makeStats({
        correctChars: 0,
        incorrectChars: 0,
        extraChars: 0,
      }),
    );
    expect(result).toEqual({ valid: false, reason: "no_keystrokes" });
  });

  it("rejects invalid_numbers when wpm is NaN", () => {
    const result = validateResult(makeStats({ wpm: NaN }));
    expect(result).toEqual({ valid: false, reason: "invalid_numbers" });
  });

  it("rejects invalid_numbers when wpm is Infinity", () => {
    const result = validateResult(makeStats({ wpm: Infinity }));
    expect(result).toEqual({ valid: false, reason: "invalid_numbers" });
  });

  it("rejects invalid_accuracy when < 0", () => {
    const result = validateResult(makeStats({ accuracy: -1 }));
    expect(result).toEqual({ valid: false, reason: "invalid_accuracy" });
  });

  it("rejects invalid_accuracy when > 100", () => {
    const result = validateResult(makeStats({ accuracy: 101 }));
    expect(result).toEqual({ valid: false, reason: "invalid_accuracy" });
  });

  it("rejects zero_time", () => {
    const result = validateResult(makeStats({ elapsedSeconds: 0 }));
    expect(result).toEqual({ valid: false, reason: "zero_time" });
  });

  it("rejects too_short (< 2s)", () => {
    const result = validateResult(makeStats({ elapsedSeconds: 1 }));
    expect(result).toEqual({ valid: false, reason: "too_short" });
  });

  it("rejects impossible_wpm (> 300)", () => {
    const result = validateResult(makeStats({ wpm: 301 }));
    expect(result).toEqual({ valid: false, reason: "impossible_wpm" });
  });

  it("accepts borderline high WPM (300)", () => {
    const result = validateResult(makeStats({ wpm: 300 }));
    expect(result).toEqual({ valid: true });
  });

  it("rejects impossible_raw (> 350)", () => {
    const result = validateResult(makeStats({ raw: 351 }));
    expect(result).toEqual({ valid: false, reason: "impossible_raw" });
  });

  it("rejects impossible_cps (> 30 chars/sec)", () => {
    const result = validateResult(
      makeStats({
        correctChars: 1000,
        incorrectChars: 0,
        extraChars: 0,
        elapsedSeconds: 10,
      }),
    );
    expect(result).toEqual({ valid: false, reason: "impossible_cps" });
  });

  it("rejects impossible_burst (single second > 600 WPM)", () => {
    const result = validateResult(
      makeStats({
        wpmHistory: [
          { second: 0, wpm: 45, raw: 50, errors: 0 },
          { second: 1, wpm: 700, raw: 710, errors: 0 },
          { second: 2, wpm: 50, raw: 55, errors: 0 },
        ],
      }),
    );
    expect(result).toEqual({ valid: false, reason: "impossible_burst" });
  });

  it("rejects afk_detected (> 3 consecutive 0-raw seconds)", () => {
    const result = validateResult(
      makeStats({
        wpm: 60,
        elapsedSeconds: 15,
        wpmHistory: [
          { second: 0, wpm: 50, raw: 55, errors: 0 },
          { second: 1, wpm: 0, raw: 0, errors: 0 },
          { second: 2, wpm: 0, raw: 0, errors: 0 },
          { second: 3, wpm: 0, raw: 0, errors: 0 },
          { second: 4, wpm: 0, raw: 0, errors: 0 },
          { second: 5, wpm: 0, raw: 0, errors: 0 },
          { second: 6, wpm: 55, raw: 60, errors: 0 },
        ],
      }),
    );
    expect(result).toEqual({ valid: false, reason: "afk_detected" });
  });

  it("rejects flat_wpm_history (all seconds same WPM at speed)", () => {
    const result = validateResult(
      makeStats({
        wpm: 100,
        wpmHistory: [
          { second: 0, wpm: 100, raw: 105, errors: 0 },
          { second: 1, wpm: 100, raw: 105, errors: 0 },
          { second: 2, wpm: 100, raw: 105, errors: 0 },
          { second: 3, wpm: 100, raw: 105, errors: 0 },
          { second: 4, wpm: 100, raw: 105, errors: 0 },
        ],
      }),
    );
    expect(result).toEqual({ valid: false, reason: "flat_wpm_history" });
  });

  it("does not flag flat history for slow typing (under 80 WPM)", () => {
    const result = validateResult(
      makeStats({
        wpm: 60,
        wpmHistory: [
          { second: 0, wpm: 60, raw: 65, errors: 0 },
          { second: 1, wpm: 60, raw: 65, errors: 0 },
          { second: 2, wpm: 60, raw: 65, errors: 0 },
          { second: 3, wpm: 60, raw: 65, errors: 0 },
        ],
      }),
    );
    expect(result).toEqual({ valid: true });
  });

  it("rejects perfect_consistency (>= 99 at speed)", () => {
    const result = validateResult(
      makeStats({
        wpm: 100,
        consistency: 99,
        wpmHistory: [
          { second: 0, wpm: 98, raw: 103, errors: 0 },
          { second: 1, wpm: 101, raw: 106, errors: 0 },
          { second: 2, wpm: 100, raw: 105, errors: 0 },
          { second: 3, wpm: 99, raw: 104, errors: 0 },
          { second: 4, wpm: 100, raw: 105, errors: 0 },
        ],
      }),
    );
    expect(result).toEqual({ valid: false, reason: "perfect_consistency" });
  });
});
