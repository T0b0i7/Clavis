import { describe, expect, it } from "vitest";
import { accuracyFromCounts, countWpm, wpmNumeratorFromCounts } from "./wpm-count";

describe("countWpm", () => {
  it("counts all words correct", () => {
    const result = countWpm({
      targetWords: ["hello", "world"],
      wordInputs: ["hello", "world"],
      typed: "",
      wordIndex: 2,
      mode: "words",
      final: true,
    });

    expect(result.correctWordChars).toBe(10); // hello(5) + world(5)
    expect(result.correctSpaces).toBe(2); // space after hello + space after world
    expect(result.incorrectChars).toBe(0);
    expect(result.extraChars).toBe(0);
    expect(result.missedChars).toBe(0);
  });

  it("counts incorrect characters", () => {
    const result = countWpm({
      targetWords: ["hello"],
      wordInputs: ["hxllo"],
      typed: "",
      wordIndex: 1,
      mode: "words",
      final: true,
    });

    expect(result.correctWordChars).toBe(0); // word was wrong
    expect(result.allCorrectChars).toBe(4); // h, l, l, o
    expect(result.incorrectChars).toBe(1); // x
  });

  it("counts extra characters when typed more than target", () => {
    const result = countWpm({
      targetWords: ["hi"],
      wordInputs: ["hiasdf"],
      typed: "",
      wordIndex: 1,
      mode: "words",
      final: true,
    });

    expect(result.allCorrectChars).toBe(2); // h + i (both match)
    expect(result.incorrectChars).toBe(0); // no incorrect chars inside target length
    expect(result.extraChars).toBe(4); // a, s, d, f
  });

  it("counts missed characters when typed less than target", () => {
    const result = countWpm({
      targetWords: ["hello"],
      wordInputs: ["he"],
      typed: "",
      wordIndex: 1,
      mode: "words",
      final: true,
    });

    expect(result.allCorrectChars).toBe(2); // h, e
    expect(result.missedChars).toBe(3); // l, l, o
    expect(result.incorrectChars).toBe(0);
  });

  it("handles empty inputs", () => {
    const result = countWpm({
      targetWords: ["hello"],
      wordInputs: [],
      typed: "",
      wordIndex: 0,
      mode: "time",
      final: false,
    });

    expect(result.correctWordChars).toBe(0);
    expect(result.correctSpaces).toBe(0);
  });
});

describe("wpmNumeratorFromCounts", () => {
  it("sums correctWordChars and correctSpaces", () => {
    const result = wpmNumeratorFromCounts({
      correctWordChars: 100,
      correctSpaces: 10,
      allCorrectChars: 0,
      incorrectChars: 0,
      extraChars: 0,
      missedChars: 0,
    });
    expect(result).toBe(110);
  });
});

describe("accuracyFromCounts", () => {
  it("returns 100 when no incorrect chars", () => {
    const result = accuracyFromCounts({
      allCorrectChars: 200,
      incorrectChars: 0,
      correctWordChars: 0,
      correctSpaces: 0,
      extraChars: 0,
      missedChars: 0,
    });
    expect(result).toBe(100);
  });

  it("calculates correct percentage", () => {
    const result = accuracyFromCounts({
      allCorrectChars: 180,
      incorrectChars: 20,
      correctWordChars: 0,
      correctSpaces: 0,
      extraChars: 0,
      missedChars: 0,
    });
    expect(result).toBe(90); // 180/200 = 90%
  });

  it("handles zero denominator", () => {
    const result = accuracyFromCounts({
      allCorrectChars: 0,
      incorrectChars: 0,
      correctWordChars: 0,
      correctSpaces: 0,
      extraChars: 0,
      missedChars: 0,
    });
    expect(result).toBe(100);
  });
});
