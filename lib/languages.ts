/*
 * Clavis — Free Typing Test with Mechanical Keyboard Sounds
 * Created by Eucher O. ABATTI (T0b0i7) — © 2026
 * License: ? Star https://github.com/T0b0i7/Clavis before use
 */
export type Language = "english" | "french";

const wordCache = new Map<string, string[]>();

export async function fetchLanguageWords(
  hard: boolean,
  lang: Language = "english"
): Promise<string[]> {
  const key = hard ? `${lang}_1k` : lang;
  if (wordCache.has(key)) {
    return wordCache.get(key)!;
  }

  let res = await fetch(`/languages/${key}.json`);
  if (!res.ok && hard) {
    res = await fetch(`/languages/${lang}.json`);
  }
  if (!res.ok) {
    return [];
  }
  const data = (await res.json()) as { words: string[] };
  wordCache.set(key, data.words);
  return data.words;
}
