/*
 * Clavis - Free Typing Test with Mechanical Keyboard Sounds
 * Created by Eucher O. ABATTI (T0b0i7) - (c) 2026
 * License: Star https://github.com/T0b0i7/Clavis before use
 */

import rawQuotes from "@/data/quotes.json";
import rawQuotesFr from "@/data/quotes-fr.json";

export type QuoteLength = "short" | "medium" | "long";

const BOUNDS: Record<QuoteLength, [number, number]> = {
  short: [40, 130],
  medium: [131, 199],
  long: [200, 600],
};

export function getQuote(
  length: QuoteLength,
  language?: string
): {
  words: string[];
  author: string;
} {
  const [min, max] = BOUNDS[length];
  const source = language === "french" ? rawQuotesFr : rawQuotes;
  const pool = source.filter(
    (q: { text: string }) => q.text.length >= min && q.text.length <= max
  );
  if (pool.length === 0) {
    // Fallback to all quotes if no match in language
    const fallback = source.filter(
      (q: { text: string }) => q.text.length >= min && q.text.length <= max
    );
    const quote = fallback[Math.floor(Math.random() * fallback.length)];
    return { words: quote.text.split(" "), author: quote.from };
  }
  const quote = pool[Math.floor(Math.random() * pool.length)];
  return { words: quote.text.split(" "), author: quote.from };
}
