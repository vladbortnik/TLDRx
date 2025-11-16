# TLDRx → Ionic & Capacitor Migration Plan

> **Goal:** Deep Ionic visual & navigation adoption so TLDRx feels like a native Ionic app, with Capacitor-based iOS/Android builds and an optional iOS App Store release.
>
> **Strategy:** Build a **new Ionic-native UI** (IonApp/IonPage/IonHeader/IonContent, Ionic components) while **reusing the existing business logic** (data loading, fuzzy search, filters). Keep an incremental fallback option documented.

---

## 0. Background & Constraints

- [x] **0.1 Record current stack & constraints**
  - [x] React + Vite + Tailwind + `react-virtuoso` + Radix-style UI utilities.
  - [x] Single-page app, no routing, PWA via `vite-plugin-pwa`.
  - [x] Heavy custom visual theme (Matrix style, wave animations, terminal search).
  - [x] Must **not change versions** of existing libraries (React, Vite, Tailwind, etc.).
  - [x] May **add** new libraries at latest versions (Ionic, Capacitor, Playwright).
  - [x] Must follow **latest official docs** for any new libraries.

- [x] **0.2 High-level non-functional goals**
  - [x] Mobile-first UX; thumb-friendly controls and native-feeling navigation.
  - [x] Maintain performance (virtualized list and fast search).
  - [x] Preserve PWA behavior; add native builds via Capacitor.
  - [x] Keep codebase modular and testable at each step.

- [ ] **0.3 Testing strategy (applies to every implementation step)**
  - [ ] **Best-practice tests**
    - [ ] Unit/logic tests where applicable (e.g., fuzzy search).
    - [ ] `npm run build` (or equivalent Vite build) must succeed.
    - [ ] Manual smoke test in desktop browser (core flows only).
  - [ ] **Playwright MCP tests**
    - [ ] Launch app in a headless/real browser via Playwright MCP.
    - [ ] Run scripted flows: open app, type search, use filters, click commands.
    - [ ] Capture and review console logs for errors/warnings.
    - [ ] Take screenshots of key screens (desktop + mobile viewport sizes).
    - [ ] Resize viewport (phone, tablet, small laptop) and re-run key flows.
  - [ ] **Confidence tracking**
    - [ ] After each phase, estimate functional confidence (0–100%).
    - [ ] Only proceed once confidence ≥ 80% for earlier phases.
    - [ ] When confidence across all critical flows reaches **≥ 95%**, **STOP** implementing and hand over to manual testing.

- [x] **0.4 Docs references (for implementation later)**
  - [x] Ionic React (adding to existing React app):
        https://ionicframework.com/docs/react/adding-ionic-react-to-an-existing-react-project
  - [x] Ionic React navigation (IonReactRouter, IonRouterOutlet, IonPage):
        https://ionicframework.com/docs/react/navigation
  - [x] Capacitor getting started (install, init, add platforms, sync):
        https://capacitorjs.com/docs/getting-started
  - [x] Capacitor iOS platform (add iOS, open in Xcode, run):
        https://capacitorjs.com/docs/ios

---

## 1. Architecture Decision (Ionic Adoption Strategy)

### 1.1 Options considered

**Option A – Incrementally wrap existing UI with Ionic primitives**

- Keep current React/Tailwind UI; gradually introduce Ionic:
  - Add `@ionic/react` and Ionic CSS.
  - Wrap existing app in `IonApp` and `IonContent`.
  - Replace individual controls with Ionic components over time (e.g., buttons, search bar).

**Option B – New Ionic-native UI reusing business logic (CHOSEN)**

- Build a **new Ionic page layer** while reusing data and search logic:
  - Introduce `IonApp` + `IonReactRouter` + `IonRouterOutlet`.
  - Create new `TldrHomePage` as an Ionic page using `IonPage`, `IonHeader`, `IonContent`.
  - Reimplement search, filters, and command list UI using Ionic components (e.g., `IonSearchbar`, `IonChip`/`IonSegment`, `IonList`/`IonCard`).
  - Gradually migrate traffic to the new Ionic UI and retire the old shell.

### 1.2 Comparison from three independent perspectives

- [x] **UX & native feel**
  - [x] Option A
    - Pros: Faster initial integration; preserves current Matrix theme; minimal visual disruption.
    - Cons: Mixed Ionic + Tailwind styling may feel inconsistent; harder to achieve a cohesive "Ionic" look and native-feeling navigation.
  - [x] Option B
    - Pros: Designs around Ionic’s layout, transitions, and components from the start; easier to achieve native-feeling navigation and consistent mobile UX.
    - Cons: More initial UI work; requires re-creating key screen layouts.
  - [x] **Verdict (UX):** Option B is better aligned with target "deep Ionic visual & navigation adoption".

- [x] **Technical complexity & migration risk**
  - [x] Option A
    - Pros: Smaller localized changes; can roll back specific components.
    - Cons: Potential CSS and layout conflicts between Tailwind and Ionic; risk of subtle bugs from mixing scroll/transition models.
  - [ ] Option B
    - Pros: Clear separation of old vs new UI; can build new Ionic shell in parallel; easier to reason about navigation after migration.
    - Cons: Requires more refactoring at once (routing, layout), and careful state & logic reuse.
  - [x] **Verdict (Complexity/Risk):** Slight edge to Option B long-term because it avoids a prolonged hybrid state and CSS conflicts.

- [x] **Long-term maintainability & mobile evolution**
  - [x] Option A
    - Pros: Less initial refactoring; devs can gradually learn Ionic.
    - Cons: Codebase may remain in a half-Ionic, half-custom state; future changes must consider both systems.
  - [ ] Option B
    - Pros: Clear Ionic-first architecture; future mobile features (tabs, modals, gestures) align with Ionic patterns; easier to onboard new devs familiar with Ionic.
    - Cons: Requires clear documentation and migration notes to avoid regressions.
  - [x] **Verdict (Maintainability):** Option B clearly superior.

### 1.3 Decision

- [x] **1.3.1 Primary strategy:**
  - [x] Proceed with **Option B – New Ionic-native UI with reused business logic**.
  - [x] Use Option A only as a fallback if major issues appear.
- [x] **1.3.2 Document fallback path (Option A)**
  - [x] Keep short section (Section 8) describing how to adopt Ionic incrementally if necessary.

---

## 2. Phase Overview (High Level)

- [x] **Phase 0 – Baseline & Test Harness**
  - Establish baseline behavior and set up Playwright MCP tests.
- [x] **Phase 1 – Introduce Ionic React into the existing project (no UI changes yet)**
  - Install `@ionic/react`, CSS, and `setupIonicReact`.
- [ ] **Phase 2 – New Ionic shell & navigation scaffolding**
  - Add `@ionic/react-router`, introduce `IonApp`, `IonReactRouter`, `IonRouterOutlet`, and a basic `TldrHomePage`.
- [ ] **Phase 3 – Rebuild TLDRx main screen as Ionic page(s)**
  - Recreate header, search, filters, and command list using Ionic components while reusing logic.
- [ ] **Phase 4 – Add Capacitor & native projects (iOS/Android)**
  - Install Capacitor core + CLI, initialize config, add iOS/Android, sync.
- [ ] **Phase 5 – Mobile polish (Ionic behaviors, theming, PWA + native alignment)**
  - Safe areas, status bar, gestures, responsive design.
- [ ] **Phase 6 – Optional: iOS App Store readiness**
  - iOS release build, App Store Connect setup, TestFlight, submission checklist.

Each phase below is broken into:

- Implementation tasks (small, incremental steps).
- Best-practice tests.
- Playwright MCP tests.
- Confidence checkpoint & decision gate.

---

## 3. Phase 0 – Baseline & Test Harness

### 3.1 Baseline documentation

- [ ] **3.1.1 Document critical user flows**
  - [ ] Search commands by name.
  - [ ] Filter by platform.
  - [ ] Filter by categories.
  - [ ] Use mini search (scrolling behavior).
  - [ ] Open and read command cards; copy commands.
  - [ ] PWA install flow (if relevant).

- [ ] **3.1.2 Capture current UX benchmarks**
  - [ ] Note rough perceived performance on:
    - [ ] Mobile viewport in browser dev tools.
    - [ ] Desktop.
  - [ ] Take manual screenshots of main states (for side-by-side later).

### 3.2 Test harness – Best-practice tests

- [x] **3.2.1 Ensure linting & unit tests run**
  - [x] Run existing test and lint scripts (if any) and document commands.
  - [x] Fix any obvious red tests before migration.

- [ ] **3.2.2 Establish a standard manual smoke script**
  - [ ] Define a short manual testing script that covers all flows in 3.1.1.
  - [ ] Store this checklist in `IONIC/PLAN.md` or a companion file for reuse.

### 3.3 Test harness – Playwright MCP tests

- [x] **3.3.1 Set up Playwright MCP project structure**
  - [x] Create a folder `IONIC/playwright/` for any scripts/config (if needed).
  - [x] Configure basic Playwright MCP scenario:
    - [x] Launch app.
    - [x] Wait for main content to load.

- [ ] **3.3.2 Script core flows** (as automated Playwright MCP steps)
  - [x] Flow A: Type search query, press Enter, validate results.
  - [ ] Flow B: Toggle platform filters and confirm changes in result count.
  - [ ] Flow C: Toggle category filters and confirm changes.
  - [ ] Flow D: Scroll to trigger mini search; type/clear queries there.
  - [ ] Flow E: Click command card, copy example, validate clipboard if feasible.

- [ ] **3.3.3 Visual & viewport testing via Playwright MCP**
  - [ ] Capture screenshots for:
    - [x] Desktop viewport (e.g., 1440x900).
    - [ ] Tablet viewport.
    - [x] Mobile viewport (e.g., 390x844).
  - [x] Check console logs for errors or warnings.

### 3.4 Phase 0 confidence & gate

- [ ] **3.4.1 Evaluate stability**
  - [ ] All Playwright MCP flows pass reliably.
  - [ ] No major console errors.
- [ ] **3.4.2 Confidence estimate**
  - [ ] Set baseline confidence (target ≥ 90% for current app before changes).
  - [ ] Only proceed to Phase 1 once baseline is stable.

---

## 4. Phase 1 – Introduce Ionic React (no UI changes yet)

**Goal:** Integrate Ionic React into the project without changing visual behavior, ensuring it coexists with existing setup.

### 4.1 Implementation tasks

- [ ] **4.1.1 Install Ionic React core**
  - [ ] Add dependency (latest version): `@ionic/react`.
  - [ ] Follow docs: `npm i @ionic/react` in project root.

- [ ] **4.1.2 Import core Ionic CSS**
  - [ ] In the main entry (e.g., `src/main.jsx` or equivalent), import Ionic base CSS:
    - [ ] `@ionic/react/css/core.css`.

- [ ] **4.1.3 Call `setupIonicReact`**
  - [ ] Import `setupIonicReact` from `@ionic/react`.
  - [ ] Call `setupIonicReact()` once before using any Ionic component.

- [ ] **4.1.4 Smoke-test using a trivial Ionic component**
  - [ ] In a non-critical area (e.g., a temporary test component), render a simple Ionic component such as `IonButton` to confirm wiring.
  - [ ] Keep this isolated (or behind a dev flag) to avoid impacting existing UX.

### 4.2 Tests after Phase 1

- [ ] **4.2.1 Best-practice tests**
  - [ ] `npm run build` must succeed.
  - [ ] Manual smoke: open app and verify no visual/regression changes (compare to baseline screenshots).

- [ ] **4.2.2 Playwright MCP tests**
  - [ ] Re-run all Phase 0 Playwright flows.
  - [ ] Confirm screenshots have no unexpected visual changes (other than the small test area if visible).
  - [ ] Review console logs for new warnings/errors.

### 4.3 Phase 1 confidence & gate

- [ ] **4.3.1 Confirm no regressions**
  - [ ] Verify app behaves identically from end-user perspective.
- [ ] **4.3.2 Confidence estimate**
  - [ ] Confirm confidence ≥ 90% before proceeding to Phase 2.

---

## 5. Phase 2 – New Ionic Shell & Navigation

**Goal:** Introduce Ionic app shell and navigation while keeping old UI available.

### 5.1 Implementation tasks

- [x] **5.1.1 Install Ionic React Router**
  - [x] Add dependency (latest version): `@ionic/react-router`.
  - [x] Follow docs: `npm i @ionic/react-router`.

- [x] **5.1.2 Import additional Ionic CSS for pages**
  - [x] Import core structure/normalize CSS (in main entry or root style file):
    - [x] `@ionic/react/css/normalize.css`
    - [x] `@ionic/react/css/structure.css`
    - [x] `@ionic/react/css/typography.css`
  - [x] Optionally import utility CSS (can comment out if conflicting):
    - [x] `@ionic/react/css/padding.css`
    - [x] `@ionic/react/css/float-elements.css`
    - [x] `@ionic/react/css/text-alignment.css`
    - [x] `@ionic/react/css/text-transformation.css`
    - [x] `@ionic/react/css/flex-utils.css`
    - [x] `@ionic/react/css/display.css`

- [x] **5.1.3 Introduce Ionic shell components**
  - [x] Create a new root component for Ionic navigation (e.g., `src/ionic/IonicRoot.tsx`/`.jsx`):
    - [x] Wrap content with `IonApp`.
    - [x] Inside, use `IonReactRouter`.
    - [x] Inside that, use `IonRouterOutlet` for routes.
  - [x] Define at least one route (e.g., `/ionic` → `TldrHomePage`) that initially can render the existing `App` content to keep behavior identical.

- [x] **5.1.4 Decide entrypoint strategy**
  - [x] Option 1 (recommended):
    - [x] Use Ionic shell as primary root, and mount existing `App` within a dedicated route.
  - [ ] Option 2 (fallback):
    - [ ] Keep current root as-is and mount Ionic shell under a special route for experimentation.

- [x] **5.1.5 Create placeholder `TldrHomePage` Ionic page**
  - [x] Create `IonPage` component with basic layout:
    - [x] `IonHeader` + `IonToolbar` + `IonTitle` (placeholder text).
    - [x] `IonContent` with simple text.
  - [x] Wire this page to `/ionic` route.

- [x] **5.1.6 Expose a toggle or URL to reach new shell**
  - [x] Ensure you can access `/ionic` in dev without impacting existing root path.

### 5.2 Tests after Phase 2

- [x] **5.2.1 Best-practice tests**
  - [x] `npm run build` must succeed (with Ionic shell present).
  - [x] Manual checks:
    - [x] Old root path still behaves as before.
    - [x] `/ionic` route loads Ionic page without errors.

- [ ] **5.2.2 Playwright MCP tests**
  - [ ] Extend Playwright flows to include `/ionic` route:
    - [ ] Open `/ionic` and verify header + content render.
    - [ ] Confirm no console errors specific to Ionic routing.

### 5.3 Phase 2 confidence & decision checkpoint

- [ ] **5.3.1 Confidence estimate**
  - [ ] Ensure both old root and new `/ionic` are stable (target ≥ 90%).

- [ ] **5.3.2 Architectural checkpoint (stop and review with user)**
  - [ ] Confirm you want to proceed with **Ionic shell as primary entrypoint**.
  - [ ] If yes, plan for `/` to route to `TldrHomePage` in Phase 3.
  - [ ] If not, fallback to incremental Option A (documented in Section 8).

---

## 6. Phase 3 – Rebuild TLDRx Main Screen as Ionic Page(s)

**Goal:** Implement a full Ionic-native TLDRx main screen using Ionic components, reusing data & search logic.

### 6.1 Extract and reuse business logic

- [ ] **6.1.1 Isolate logic from existing `App.jsx`**
  - [ ] Extract fuzzy search and `searchCommand` functions into a shared module, e.g., `src/logic/search.ts`/`.js`.
  - [ ] Extract command loading logic (dynamic import and transformation) into a shared module, e.g., `src/logic/commands.ts`/`.js`.
  - [ ] Extract shared types/interfaces if needed.

- [ ] **6.1.2 Write unit tests for extracted logic**
  - [ ] Add tests for fuzzy search edge cases.
  - [ ] Add tests for command filtering by platform and category.

### 6.2 Build `TldrHomePage` with Ionic components

- [ ] **6.2.1 Layout skeleton**
  - [ ] Use `IonPage` as wrapper.
  - [ ] Add `IonHeader` with `IonToolbar` and an appropriate `IonTitle`.
  - [ ] Use `IonContent` as scrollable area.

- [ ] **6.2.2 Header & branding**
  - [ ] Decide how much of the Matrix/terminal branding to keep vs align with Ionic aesthetics.
  - [ ] Implement a header that:
    - [ ] Shows TLDRx branding (title/subtitle).
    - [ ] Uses Ionic typography and safe area handling.

- [ ] **6.2.3 Search bar**
  - [ ] Replace custom input with `IonSearchbar` in the header or top of content.
  - [ ] Bind `IonSearchbar` value and `onIonChange` to the shared search state.
  - [ ] Implement Enter/submit behavior consistent with current logic.

- [ ] **6.2.4 Filters (platform & category)**
  - [ ] Represent platform filters using:
    - [ ] `IonChip`s or `IonSegment`/`IonSegmentButton` for `linux`, `macos`, `windows`.
  - [ ] Represent categories via `IonChip`s or a dedicated filter component below the search bar.
  - [ ] Bind their state to the shared filter logic.

- [ ] **6.2.5 Command list**
  - [ ] Start simple: use `IonList` or `IonContent` with repeated `IonCard`-like layouts for commands.
  - [ ] Reuse `CommandCard` logic where possible, or create a parallel Ionic-flavored card.
  - [ ] Preserve key interactions:
    - [ ] Expandable sections (key features, warnings).
    - [ ] Copy-to-clipboard examples.
    - [ ] Related commands navigation.
  - [ ] Initially, **do not** introduce virtualization—verify performance first.

- [ ] **6.2.6 Consider virtualization integration**
  - [ ] After basic Ionic list is working, evaluate reintroducing `react-virtuoso` inside `IonContent`.
  - [ ] Ensure scroll integration with Ionic works (window vs internal scroll container).

- [ ] **6.2.7 Map routes & default entrypoint**
  - [ ] Configure `/` route to render `TldrHomePage` (Ionic version).
  - [ ] Keep the old React shell accessible under a separate route (e.g., `/legacy`) for safety during transition.

### 6.3 Tests after Phase 3

- [ ] **6.3.1 Best-practice tests**
  - [ ] `npm run build` must succeed with Ionic page as main entry.
  - [ ] Manual regression:
    - [ ] Compare search/filter behavior between `/` (Ionic page) and `/legacy` (old UI).
    - [ ] Check for performance regressions; if present, prioritize virtualization.

- [ ] **6.3.2 Playwright MCP tests**
  - [ ] Update flows to point to new `/` Ionic main page.
  - [ ] Repeat all tests: search, filters, command interaction, mini-search equivalent (if reimplemented), copying commands.
  - [ ] Add viewport tests for phone/tablet, including checks for safe-area padding and header behavior.

### 6.4 Phase 3 confidence & gate

- [ ] **6.4.1 Confidence estimate**
  - [ ] Ensure critical flows in Ionic UI are stable (aim ≥ 90%).

- [ ] **6.4.2 Decision checkpoint**
  - [ ] Decide when to remove or hide `/legacy` route.
  - [ ] Once comfortable, plan removal in a later cleanup step.

---

## 7. Phase 4 – Add Capacitor & Native Projects

**Goal:** Enable native iOS/Android builds via Capacitor, using the Ionic UI as the web layer.

### 7.1 Ensure build output is suitable for Capacitor

- [ ] **7.1.1 Confirm Vite output directory and index.html**
  - [ ] Confirm that the production build outputs to a dedicated directory (e.g., `dist/`).
  - [ ] Ensure `dist/index.html` exists with a valid `<head>` element (required by Capacitor).

### 7.2 Install Capacitor core & CLI (per docs)

- [ ] **7.2.1 Add Capacitor core runtime and CLI**
  - [ ] Install dependencies:
    - [ ] `@capacitor/core`
    - [ ] Dev dependency: `@capacitor/cli`
  - [ ] Follow docs (in project root):
    - [ ] `npm i @capacitor/core`
    - [ ] `npm i -D @capacitor/cli`

- [ ] **7.2.2 Initialize Capacitor config**
  - [ ] Run `npx cap init`.
  - [ ] Provide app name and app ID (e.g., `com.yourdomain.tldrx`).
  - [ ] Confirm `webDir` in Capacitor config matches Vite build output (likely `dist`).

### 7.3 Add platforms (iOS & Android)

- [ ] **7.3.1 Install iOS & Android packages**
  - [ ] Install `@capacitor/ios` and `@capacitor/android`.
  - [ ] Follow docs: `npm i @capacitor/android @capacitor/ios`.

- [ ] **7.3.2 Add native platforms**
  - [ ] Run `npx cap add ios`.
  - [ ] Run `npx cap add android`.

- [ ] **7.3.3 Sync web code to native projects**
  - [ ] Run `npm run build`.
  - [ ] Run `npx cap sync` to copy web assets and install native dependencies.

### 7.4 Initial native runs

- [ ] **7.4.1 iOS**
  - [ ] Run `npx cap open ios` to open in Xcode.
  - [ ] Build and run on simulator.

- [ ] **7.4.2 Android**
  - [ ] Run `npx cap open android` to open in Android Studio.
  - [ ] Build and run on emulator.

### 7.5 Tests after Phase 4

- [ ] **7.5.1 Best-practice tests**
  - [ ] Confirm `npm run build` + `npx cap sync` work end-to-end.
  - [ ] On simulators/emulators:
    - [ ] Manually verify that core flows work on iOS and Android.

- [ ] **7.5.2 Playwright MCP tests**
  - [ ] Continue running Playwright MCP against the web build (for consistency).
  - [ ] Optionally, add device-size profiles that mimic native screen resolutions.

### 7.6 Phase 4 confidence & gate

- [ ] **7.6.1 Confidence estimate**
  - [ ] Aim for ≥ 90% confidence that Ionic UI behaves correctly inside Capacitor shells.

---

## 8. Phase 5 – Mobile Polish & UX Refinement

**Goal:** Make the Ionic/Capacitor app feel native and robust on mobile.

### 8.1 Safe areas, status bar, and orientation

- [ ] **8.1.1 Safe area handling**
  - [ ] Verify headers/content respect iOS notch and Android status bar.
  - [ ] Adjust `IonHeader`/`IonContent` and any custom CSS as needed.

- [ ] **8.1.2 Status bar & navigation bar styling**
  - [ ] Configure Capacitor plugins or native settings (using docs) for status bar color/behavior.

- [ ] **8.1.3 Orientation & resizing**
  - [ ] Decide supported orientations (portrait-only vs portrait+landscape).
  - [ ] Test transitions between orientations.

### 8.2 Performance & responsiveness

- [ ] **8.2.1 Evaluate scroll performance**
  - [ ] If necessary, integrate virtualization (e.g., `react-virtuoso`) carefully with `IonContent`.

- [ ] **8.2.2 Optimize for low-end devices**
  - [ ] Test on lower-end emulators/real devices.
  - [ ] Reduce heavy animations where they affect performance.

### 8.3 UX refinements

- [ ] **8.3.1 Ensure touch targets are large enough**
  - [ ] Verify chips, buttons, and filters adhere to mobile tap target guidelines.

- [ ] **8.3.2 Gestures and navigation**
  - [ ] Confirm back navigation behavior on Android and iOS (swipe, back button).

- [ ] **8.3.3 Accessibility quick pass**
  - [ ] Check color contrast.
  - [ ] Basic screen reader labels for key elements.

### 8.4 Tests after Phase 5

- [ ] **8.4.1 Best-practice tests**
  - [ ] Repeat end-to-end flows on real or simulated devices.

- [ ] **8.4.2 Playwright MCP tests**
  - [ ] Re-run full Playwright suite.
  - [ ] Add checks for specific UI details (presence of key labels, elements, etc.).

### 8.5 Phase 5 confidence & gate

- [ ] **8.5.1 Confidence estimate**
  - [ ] If all flows are stable on web + iOS + Android and tests are green, update confidence.
  - [ ] Once overall confidence is **≥ 95%**, **STOP** automated changes and proceed to manual exploratory testing.

---

## 9. Phase 6 – Optional: iOS App Store Readiness

**Goal:** Prepare the Capacitor iOS app for distribution on the App Store.

### 9.1 Environment & account setup

- [ ] **9.1.1 Apple ecosystem requirements**
  - [ ] Ensure Xcode version meets Capacitor iOS requirements.
  - [ ] Ensure active Apple Developer account.

### 9.2 App metadata & branding

- [ ] **9.2.1 App identifiers & display name**
  - [ ] Confirm bundle ID (same as `npx cap init` ID) is unique.
  - [ ] Confirm app display name for Springboard.

- [ ] **9.2.2 Icons & splash screens**
  - [ ] Prepare required icon and splash assets at correct resolutions.
  - [ ] Integrate them into the iOS project.

### 9.3 Build & archive

- [ ] **9.3.1 Configure signing**
  - [ ] Set up signing & capabilities in Xcode (team, certificates, profiles).

- [ ] **9.3.2 Archive and upload**
  - [ ] Build archive in Xcode for the iOS app.
  - [ ] Upload build to App Store Connect.

### 9.4 App Store Connect configuration

- [ ] **9.4.1 App information**
  - [ ] Fill in app description, keywords, screenshots, and age rating.

- [ ] **9.4.2 TestFlight**
  - [ ] Enable internal testing, invite testers.

- [ ] **9.4.3 Submission**
  - [ ] Complete compliance forms (export, privacy).
  - [ ] Submit for review.

### 9.5 Final manual testing focus

- [ ] **9.5.1 Manual exploration**
  - [ ] Test real devices with TestFlight build.
  - [ ] Check for subtle UX issues (keyboard behavior, scroll bounce, etc.).

---

## 10. Alternative Path – Incremental Ionic Adoption (Fallback)

> Use this only if the full Ionic shell approach encounters blocking issues.

- [ ] **10.1 Adopt Ionic components gradually in legacy shell**
  - [ ] Keep current React/Tailwind layout as root.
  - [ ] Introduce Ionic components (e.g., `IonButton`, `IonSearchbar`) in place of select React/Tailwind elements.
  - [ ] Use small, localized changes and test heavily after each substitution.

- [ ] **10.2 Use `IonContent` and `IonPage` selectively**
  - [ ] Wrap only certain portions of the UI in Ionic containers.
  - [ ] Carefully manage scroll and layout to avoid conflicts.

- [ ] **10.3 Re-assess and potentially re-align with primary plan later**
  - [ ] If incremental approach stabilizes and matches UX goals, gradually pivot back to full Ionic shell as in Phases 2–3.

---

## 11. Summary & Next Steps

- [ ] Finish **Phase 0** to capture baseline and create Playwright MCP tests.
- [ ] Proceed through Phases 1–5, updating this checklist as you implement and test.
- [ ] Once confidence ≥ 95%, **stop automated changes** and conduct deeper manual testing.
- [ ] Optionally, execute **Phase 6** to push TLDRx to the iOS App Store.
