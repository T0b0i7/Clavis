# Clavis — Changelog

## Contexte
Projet initial : **Keythm** (typing test avec sons mécaniques)
Fork/renommage vers : **Clavis** (latin : « touche de clavier »)

---

## 🔧 Corrections techniques

### 1. React 19 — frozenStatsRef (sécurité concurrent)
- **Problème** : `frozenStatsRef` était modifié **pendant le render** (side-effect dans le corps du hook)
- **Solution** : Déplacé dans un `useEffect` propre avec dépendance `[finished]`
- **Fichier** : `hooks/use-typing-test.ts` (lignes 678-727)

### 2. Citations mal formées (data)
- **Problème** : 10 citations avec le champ `from` contenant la suite du texte au lieu du nom d'auteur (Einstein, Jobs, Branson, etc.)
- **Solution** : Textes fusionnés, auteurs corrigés
- **Fichier** : `data/quotes.json`

### 3. useEffect sans dépendances
- **Problème** : `useEffect` de montage lisait `mode`, `timeOption` etc. sans les déclarer
- **Solution** : Guard `initialisedRef` + constantes `default*` extraites
- **Fichier** : `hooks/use-typing-test.ts`

### 4. Code mort — handleKeyHighlight
- **Problème** : Callback no-op passé dans 3 composants sans effet
- **Solution** : Supprimé de `page.tsx`, `typing-test.tsx`, `use-typing-test.ts`
- **Fichiers** : `app/page.tsx`, `components/typing/typing-test.tsx`, `hooks/use-typing-test.ts`

### 5. Doublon audio KeyV / KeyC
- **Problème** : Les touches V et C avaient le même offset audio (29_557)
- **Solution** : KeyV décalé à 29_669 — son unique
- **Fichier** : `components/ui/keyboard/sound.ts`

### 6. Target TypeScript
- **Problème** : `ES2017` trop vieux pour Next.js 16 / React 19
- **Solution** : Passage à `ES2022`
- **Fichier** : `tsconfig.json`

### 7. Variables d'environnement — DB optionnelle
- **Problème** : `DATABASE_URL` et `DATABASE_AUTH_TOKEN` obligatoires, bloquaient le dev
- **Solution** : Rendu optionnel + guard `if (!db) return`
- **Fichiers** : `lib/env.ts`, `lib/db/index.ts`, `lib/db/visits.ts`

### 8. react-is manquant — Recharts
- **Problème** : `Module not found: Can't resolve 'react-is'`
- **Solution** : `npm install react-is @types/react-is`
- **Fichiers** : `package.json`, `package-lock.json`

### 9. Favicon 404
- **Problème** : Manifest pointait vers `/favicon.ico` inexistant
- **Solution** : Redirigé vers `/icon.svg`
- **Fichier** : `app/manifest.ts`

### 10. URL invalide — metadataBase
- **Problème** : `siteConfig.url: "#"` → `new URL("#")` crash
- **Solution** : Mis à `"https://clavis.app"`
- **Fichier** : `lib/site.ts`

---

## 🆕 Nouvelles fonctionnalités

### Raccourcis clavier
- **R** → restart
- **Esc** → unfocus
- Affichés dans l'UI
- **Fichier** : `components/typing/typing-test.tsx`

### Tests unitaires (Vitest — 26 tests)
- `lib/validate-result.test.ts` : 17 tests (anti-triche, bursts, AFK, flat WPM, consistency)
- `lib/wpm-count.test.ts` : 9 tests (comptage caractères, précision, edge cases)
- **Scripts** : `npm test`, `npm run test:watch`
- **Fichiers** : `vitest.config.ts`, `lib/*.test.ts`, `package.json`

---

## 🇫🇷 Support Français

### Pool de mots français
- 200+ mots courants français
- **Fichier** : `public/languages/french.json`

### Système de traduction (i18n)
- 60+ clés de traduction
- **Fichier** : `lib/i18n.ts`

### Sélecteur de langue
- Dans les paramètres (English / Français)
- Changement de langue → redémarrage automatique du test
- **Fichiers** : `components/settings/settings-provider.tsx`, `components/settings/settings-panel.tsx`

### Langue par défaut : Français 🇫🇷
- `useState<Language>("french")` au lieu de "english"

### Propagation dans le hook
- `fetchLanguageWords()` accepte un paramètre `language`
- **Fichiers** : `lib/languages.ts`, `hooks/use-typing-test.ts`, `components/typing/typing-test.tsx`

---

## 📬 Newsletter

### API endpoint
- `POST /api/newsletter` — validation email, stockage
- **Fichier** : `app/api/newsletter/route.ts`

### Composant UI
- Formulaire dans le footer avec état (loading/success/error)
- **Fichier** : `components/newsletter.tsx`

### Stockage
- `data/subscribers.json` (gitignoré pour protéger les emails)

---

## 🔗 URLs GitHub

Toutes les URLs mises à jour vers `https://github.com/T0b0i7/Clavis` :
- `README.md` (badges, boutons deploy)
- `app/page.tsx` (footer)
- `components/layout/app-chrome.tsx` (bouton GitHub)

---

## 📁 Structure du projet

```
Clavis/
├── app/                    # Pages, layout, SEO, API
│   ├── api/newsletter/     # API de newsletter
│   ├── page.tsx            # Page principale
│   ├── layout.tsx          # Layout racine
│   ├── manifest.ts         # PWA
│   └── sw.ts               # Service worker
├── components/
│   ├── layout/             # App chrome, logo
│   ├── newsletter.tsx      # Formulaire newsletter
│   ├── settings/           # Settings provider, panel
│   ├── theme/              # Theme provider, favicon
│   ├── typing/             # Typing test, results, controls
│   └── ui/                 # Keyboard, drawer, chart, etc.
├── data/
│   ├── quotes.json         # Citations
│   └── subscribers.json    # Emails newsletter (gitignored)
├── hooks/
│   ├── use-typing-test.ts  # Logique principale du test
│   └── use-media-query.ts
├── lib/
│   ├── i18n.ts             # Traductions (FR/EN)
│   ├── languages.ts        # Pools de mots
│   ├── validate-result.ts  # Anti-cheat
│   ├── wpm-count.ts        # Calcul WPM
│   ├── db/                 # Base de données (optionnelle)
│   └── *.test.ts           # Tests unitaires
├── public/
│   ├── languages/
│   │   ├── english.json    # Pool anglais
│   │   └── french.json     # Pool français
│   └── sounds/             # Sons mécaniques
├── vitest.config.ts        # Config tests
└── package.json            # clavis
```

---

## Commandes

```bash
npm run dev          # Lancer le serveur de dev
npm test             # 26 tests unitaires
npm run typecheck    # Vérification TypeScript
npm run build        # Build production
```

## Déploiement

```bash
git remote add origin https://github.com/T0b0i7/Clavis.git
git push -u origin main

# Puis déploie sur Vercel ou Netlify
# Variables d'env optionnelles : DATABASE_URL, DATABASE_AUTH_TOKEN (Turso)
```
