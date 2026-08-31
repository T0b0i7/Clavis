/*
 * Clavis - Mode Apprentissage progressif (inspiré Dactylo)
 * 18 leçons: repos -> rangées -> chiffres/ponctuation
 */

export interface Lesson {
  description: string;
  id: number;
  keys: string[];
  targetAcc?: number;
  targetWpm?: number;
  title: string;
  words: string[];
}

export const LEARN_LESSONS: Lesson[] = [
  {
    id: 1,
    title: "Repos - F et J",
    description: "Index gauche (F) et droit (J) - position de repos",
    keys: ["KeyF", "KeyJ"],
    words: ["fj", "jf", "ff", "jj", "fjfj", "jffj"],
  },
  {
    id: 2,
    title: "Repos - D et K",
    description: "Majeur gauche/droit",
    keys: ["KeyD", "KeyK"],
    words: ["dk", "kd", "fdjk", "jkfd", "dkdk", "fdkj"],
  },
  {
    id: 3,
    title: "Repos - S et L",
    description: "Annulaire",
    keys: ["KeyS", "KeyL"],
    words: ["sl", "ls", "sdkl", "lsdk", "fjsl", "skld"],
  },
  {
    id: 4,
    title: "Repos - A et M",
    description: "Auriculaire + M (AZERTY: Q/M)",
    keys: ["KeyA", "Semicolon"],
    words: ["am", "ma", "aslm", "flam", "salam", "mama"],
  },
  {
    id: 5,
    title: "Rangée milieu complète",
    description: "Toute la rangée de repos",
    keys: ["KeyA", "KeyS", "KeyD", "KeyF", "KeyJ", "KeyK", "KeyL", "Semicolon"],
    words: ["flask", "salad", "as", "all", "fall", "lad", "ask", "sad"],
  },
  {
    id: 6,
    title: "E et I",
    description: "Majeur rangée haute",
    keys: ["KeyE", "KeyI"],
    words: ["lie", "fee", "file", "life", "diesel", "seif"],
  },
  {
    id: 7,
    title: "R et U",
    description: "Index rangée haute",
    keys: ["KeyR", "KeyU"],
    words: ["rural", "fur", "run", "rule", "lure", "ur"],
  },
  {
    id: 8,
    title: "T et Y + W/Q O/P",
    description: "Haut complet",
    keys: ["KeyQ", "KeyW", "KeyT", "KeyY", "KeyO", "KeyP"],
    words: ["type", "quit", "top", "toy", "two", "queue", "power"],
  },
  {
    id: 9,
    title: "G et H",
    description: "Index rangée milieu étendue",
    keys: ["KeyG", "KeyH"],
    words: ["high", "half", "flag", "gh", "ghoul", "gash"],
  },
  {
    id: 10,
    title: "Z X C V B N",
    description: "Rangée basse",
    keys: ["KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM"],
    words: ["zinc", "vex", "cab", "van", "box", "can", "max"],
  },
  {
    id: 11,
    title: "Mots fréquents EN",
    description: "the, and, you...",
    keys: [],
    words: ["the", "and", "you", "that", "have", "with", "this", "will"],
  },
  {
    id: 12,
    title: "Mots fréquents FR",
    description: "les, des, une...",
    keys: [],
    words: ["les", "des", "une", "dans", "pour", "avec", "plus", "tout"],
  },
  {
    id: 13,
    title: "Ponctuation simple",
    description: ", . ; :",
    keys: ["Comma", "Period", "Semicolon"],
    words: ["hello,", "world.", "test;", "note:", "yes,", "no."],
  },
  {
    id: 14,
    title: "Majuscules",
    description: "Shift + lettre",
    keys: ["ShiftLeft", "ShiftRight"],
    words: ["Hello", "Paris", "London", "Apple", "Clavis", "Test"],
  },
  {
    id: 15,
    title: "Chiffres",
    description: "Rangée numérique",
    keys: ["Digit1", "Digit2", "Digit3", "Digit4", "Digit5"],
    words: ["123", "2024", "42", "100", " test1", "a2b3"],
  },
  {
    id: 16,
    title: "Accents FR",
    description: "é è à ç ù",
    keys: ["Digit2", "Digit7", "Digit0", "Digit9", "Quote"],
    words: ["été", "à", "où", "ça", "très", "élève", "français"],
  },
  {
    id: 17,
    title: "Mixte FR complet",
    description: "Texte français courant",
    keys: [],
    words: ["bonjour", "merci", "maison", "travail", "famille", "école"],
  },
  {
    id: 18,
    title: "Examen final",
    description: "Toutes touches - 30 mots aléatoires",
    keys: [],
    words: [],
  },
];

export function lessonWords(lesson: Lesson, count = 20): string[] {
  if (lesson.id === 18) {
    return [];
  }
  const pool = lesson.words;
  const out: string[] = [];
  for (let i = 0; i < count; i++) {
    out.push(pool[Math.floor(Math.random() * pool.length)]!);
  }
  return out;
}

const LS_LEARN_PROGRESS = "tc-learn-progress";

export function getLearnProgress(): Record<
  number,
  { wpm: number; acc: number }
> {
  if (typeof window === "undefined") {
    return {};
  }
  try {
    return JSON.parse(localStorage.getItem(LS_LEARN_PROGRESS) || "{}");
  } catch {
    return {};
  }
}

export function saveLearnProgress(id: number, wpm: number, acc: number) {
  const p = getLearnProgress();
  const prev = p[id];
  if (!prev || wpm > prev.wpm) {
    p[id] = { wpm, acc };
    localStorage.setItem(LS_LEARN_PROGRESS, JSON.stringify(p));
  }
}
