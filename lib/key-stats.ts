/*
 * Clavis - Per-key error tracking & heatmap (Dactylo-inspired)
 * Stores counts per physical Code in localStorage
 */

export interface KeyStat {
  code: string;
  hits: number;
  misses: number;
}

const STORAGE_KEY = "tc-key-stats";

function load(): Record<string, KeyStat> {
  if (typeof window === "undefined") {
    return {};
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {};
    }
    return JSON.parse(raw) as Record<string, KeyStat>;
  } catch {
    return {};
  }
}

function save(map: Record<string, KeyStat>) {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

export function recordKeyResult(code: string, correct: boolean) {
  const map = load();
  if (!map[code]) {
    map[code] = { code, hits: 0, misses: 0 };
  }
  if (correct) {
    map[code].hits += 1;
  } else {
    map[code].misses += 1;
  }
  save(map);
}

export function getKeyStats(): KeyStat[] {
  return Object.values(load());
}

export function getHeatmapLevel(code: string): number {
  const m = load()[code];
  if (!m || m.hits + m.misses < 3) {
    return 0;
  }
  const rate = m.misses / (m.hits + m.misses);
  if (rate > 0.3) {
    return 3;
  }
  if (rate > 0.15) {
    return 2;
  }
  if (rate > 0.05) {
    return 1;
  }
  return 0;
}

export function clearKeyStats() {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.removeItem(STORAGE_KEY);
}
