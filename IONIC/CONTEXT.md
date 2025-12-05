# TL;DRx Ionic Context

_Last updated: 2025-12-04 · Branch: `ionic`_

## Goal

Migrate TL;DRx to an Ionic-first shell and main screen (web + future Capacitor shells) while reusing existing React business logic and preserving current performance.

## Current State

- **Branch**
  - Working on `ionic` branch, tracking `origin/ionic`.
- **Entry & Shell**
  - `src/main.jsx` calls `setupIonicReact()` and renders `<IonicRoot />`.
  - `src/ionic/IonicRoot.jsx` uses `IonApp`, `IonReactRouter`, and `IonRouterOutlet`.
- **Routes**
  - `/` and `/ionic` → `TldrHomePage` (Ionic wrapper).
  - `/legacy` → legacy `App` component.
- **Ionic Page Layer**
  - `src/ionic/TldrHomePage.jsx` is `IonPage` + `IonContent` wrapping `<App showHeader={false} />`.
  - The visible main screen is still the legacy React/Tailwind UI rendered by `App.jsx`.
- **Business Logic**
  - `src/App.jsx` imports shared logic:
    - `src/logic/search.js` – fuzzy search + `searchCommand` scoring.
    - `src/logic/commands.js` – command loading + filtering helpers.
- **Tests**
  - Vitest currently reports **"No test files found"**: there are no `*.test.*` files under `src/` on this branch.
  - Playwright E2E scripts exist under `IONIC/playwright/`, but are not wired into `npm test`.
- **SEO files**
  - `sitemap.xml` and `robots.txt` live in the project root and point at `https://tldrx.vladbortnik.dev`.

## Constraints

- Do **not** upgrade React, Vite, or Tailwind versions during this migration.
- App must stay buildable with `npm run build` at every step.
- `/legacy` must remain functional until the Ionic main screen is proven and adopted.

## Next Big Milestones

1. Re-establish a minimal automated test (unit or E2E) that validates core search behavior on `/`.
2. Introduce a real Ionic main screen (`IonicHomePage`) that starts replacing the legacy UI while reusing existing logic.
3. Make `/` use the new Ionic page and keep `/legacy` as a fallback route until stability is verified.
4. Only after the Ionic main screen is stable, add Capacitor iOS/Android shells if still desired.
