/*
 * Clavis - Free Typing Test with Mechanical Keyboard Sounds
 * Created by Eucher O. ABATTI (T0b0i7) - (c) 2026
 * License: Star https://github.com/T0b0i7/Clavis before use
 */

export type Language = "english" | "french";

export const LANGUAGE_OPTIONS = [
  { id: "english" as Language, label: "English" },
  { id: "french" as Language, label: "Français" },
] as const;

type Translations = Record<string, Record<Language, string>>;

const translations: Translations = {
  // Test modes
  "mode.time": { english: "time", french: "chrono" },
  "mode.words": { english: "words", french: "mots" },
  "mode.quote": { english: "quote", french: "citation" },
  "mode.zen": { english: "zen", french: "zen" },
  "mode.learn": { english: "learn", french: "apprendre" },
  "mode.title": { english: "Mode", french: "Mode" },

  // Time options
  "time.15": { english: "15s", french: "15s" },
  "time.30": { english: "30s", french: "30s" },
  "time.60": { english: "60s", french: "60s" },
  "time.120": { english: "120s", french: "120s" },

  // Word options
  "words.10": { english: "10", french: "10" },
  "words.25": { english: "25", french: "25" },
  "words.50": { english: "50", french: "50" },
  "words.100": { english: "100", french: "100" },

  // Quote lengths
  "quote.short": { english: "short", french: "court" },
  "quote.medium": { english: "medium", french: "moyen" },
  "quote.long": { english: "long", french: "long" },
  "quote.thicc": { english: "thicc", french: "long" },

  // Difficulty
  "difficulty.easy": { english: "easy", french: "facile" },
  "difficulty.hard": { english: "hard", french: "difficile" },

  // Settings
  "settings.title": { english: "Settings", french: "Paramètres" },
  "settings.appearance": { english: "Appearance", french: "Apparence" },
  "settings.appearance.mode": { english: "Mode", french: "Mode" },
  "settings.appearance.themes": { english: "Themes", french: "Thèmes" },
  "settings.appearance.font": { english: "Font", french: "Police" },
  "settings.keyboardSection": { english: "Keyboard", french: "Clavier" },
  "settings.keyboard.layout": { english: "Layout", french: "Disposition" },
  "settings.keyboard.layoutHint": {
    english: "Auto: French → AZERTY, English → QWERTY. Change anytime.",
    french: "Auto : Français → AZERTY, English → QWERTY. Modifiable à tout moment.",
  },
  "settings.keyboard.show": { english: "Show keyboard", french: "Clavier visuel" },
  "settings.keyboard.showDesc": {
    english: "Virtual keyboard below the test",
    french: "Clavier virtuel sous le test",
  },
  "settings.keyboard.sound": { english: "Sound", french: "Son" },
  "settings.keyboard.soundDesc": {
    english: "Mechanical key sounds",
    french: "Sons de touches mécaniques",
  },
  "settings.gameplay": { english: "Gameplay", french: "Jeu" },
  "settings.gameplay.liveStats": { english: "Live stats", french: "Stats en direct" },
  "settings.gameplay.liveStatsDesc": {
    english: "Show WPM and accuracy while typing",
    french: "Afficher WPM et précision pendant la frappe",
  },
  "settings.gameplay.ghost": { english: "Ghost mode", french: "Mode fantôme" },
  "settings.gameplay.ghostDesc": {
    english: "Dim upcoming words for focus",
    french: "Estomper les mots à venir",
  },
  "settings.gameplay.faah": { english: "Faah mode", french: "Mode Faah" },
  "settings.gameplay.faahDesc": {
    english: "Sound on wrong keystrokes",
    french: "Son sur les erreurs",
  },
  "settings.gameplay.finger": { english: "Finger colors", french: "Couleurs par doigt" },
  "settings.gameplay.fingerDesc": {
    english: "Color keys by finger (Dactylo pedagogy)",
    french: "Colorer les touches par doigt (pédagogie Dactylo)",
  },
  "settings.gameplay.heatmap": { english: "Heatmap", french: "Carte de chaleur" },
  "settings.gameplay.heatmapDesc": {
    english: "Highlight keys with frequent errors",
    french: "Surligner les touches à erreurs fréquentes",
  },
  "settings.languageSection": { english: "Language", french: "Langue" },
  "settings.language.label": { english: "Language", french: "Langue" },
  "settings.theme": { english: "Theme", french: "Thème" },
  "settings.accent": { english: "Accent", french: "Accent" },
  "settings.font": { english: "Font", french: "Police" },
  "settings.keyboard": { english: "Show keyboard", french: "Clavier visuel" },
  "settings.sound": { english: "Sound", french: "Son" },
  "settings.volume": { english: "Volume", french: "Volume" },
  "settings.liveStats": { english: "Live WPM", french: "WPM en direct" },
  "settings.faahMode": { english: "Error sound", french: "Son d'erreur" },
  "settings.ghostMode": { english: "Ghost mode", french: "Mode fantôme" },
  "settings.language": { english: "Language", french: "Langue" },

  // Results
  "results.wpm": { english: "wpm", french: "mots/min" },
  "results.accuracy": { english: "accuracy", french: "précision" },
  "results.raw": { english: "raw", french: "brut" },
  "results.characters": { english: "characters", french: "caractères" },
  "results.consistency": { english: "consistency", french: "régularité" },
  "results.time": { english: "time", french: "temps" },
  "results.correct": { english: "correct", french: "corrects" },
  "results.incorrect": { english: "incorrect", french: "incorrects" },
  "results.extra": { english: "extra", french: "supplémentaires" },
  "results.missed": { english: "missed", french: "manqués" },
  "results.corrected": { english: "corrected", french: "corrigés" },
  "results.personalBest": { english: "PB!", french: "Record !" },
  "results.new": { english: "New", french: "Nouveau" },
  "results.restart": { english: "Restart", french: "Recommencer" },
  "results.next": { english: "Next", french: "Suivant" },

  // Hints
  "hint.restart": { english: "restart", french: "recommencer" },
  "hint.unfocus": { english: "unfocus", french: "défocus" },
  "hint.clickToFocus": {
    english: "Click or press any key to focus",
    french: "Cliquez ou appuyez sur une touche",
  },
  "hint.endTest": {
    english: "end test",
    french: "fin du test",
  },
  "hint.pressToToggle": { english: "to toggle settings", french: "pour ouvrir les paramètres" },

  // Controls
  "controls.punctuation": { english: "punctuation", french: "ponctuation" },
  "controls.numbers": { english: "numbers", french: "nombres" },

  // Learn
  "learn.lesson": { english: "Lesson", french: "Leçon" },
  "learn.keys": { english: "Keys", french: "Touches" },

  // Footer
  "footer.sourceCode": {
    english: "The source code is available on",
    french: "Le code source est disponible sur",
  },

  // Stats labels
  "stats.characters": {
    english: "characters",
    french: "caractères",
  },
  "stats.sec": { english: "s", french: "s" },

  // Visit counter
  "visits.count": { english: "visits", french: "visites" },
};

export function t(key: string, lang: Language): string {
  return translations[key]?.[lang] ?? key;
}
