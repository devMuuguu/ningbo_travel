# Mobile Responsiveness Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make MapsView's map cards less cramped on mobile, stop AttractionsView's category tabs from forcing an unnecessary horizontal scroll on narrow phones, and add a defensive global overflow guard.

**Architecture:** Pure Tailwind class edits in existing `.vue` files plus a two-line CSS addition to the global stylesheet. No new components, no new dependencies, no JS logic changes.

**Tech Stack:** Vue 3 + Tailwind v4 (`@tailwindcss/vite`), no test framework in this repo (per `CLAUDE.md`) — verification is `npm run build` (compiles cleanly) plus manual visual check in a mobile-width browser, since no automated visual/regression tests exist to extend.

## Global Constraints

- No test framework exists in this repo — do not invent one for this change. Verification is build success + manual visual check.
- Follow existing Tailwind utility-class conventions already used in each file (no inline `style=`, no new custom CSS classes unless in `src/style.css`).
- Keep diffs minimal — class-attribute edits only, no restructuring of template markup.

---

### Task 1: MapsView — taller map iframes on mobile

**Files:**
- Modify: `src/views/MapsView.vue:66` (Beijing PEK iframe, `h-48`), `src/views/MapsView.vue:89` (Beijing South iframe, `h-48`), `src/views/MapsView.vue:118`, `src/views/MapsView.vue:140`, `src/views/MapsView.vue:163` (Shanghai section, `h-44` ×3), `src/views/MapsView.vue:192`, `src/views/MapsView.vue:215`, `src/views/MapsView.vue:238`, `src/views/MapsView.vue:261` (Ningbo section, `h-44` ×4)

**Interfaces:** None — leaf template edits, no props/state change.

- [ ] **Step 1: Replace fixed iframe heights with a responsive scale**

In every iframe `class` in `src/views/MapsView.vue` that currently reads `w-full h-48 border-0 bg-[#131b29]`, change to `w-full h-56 sm:h-48 border-0 bg-[#131b29]`.

In every iframe `class` that currently reads `w-full h-44 border-0 bg-[#131b29]`, change to `w-full h-56 sm:h-44 border-0 bg-[#131b29]`.

This makes every map taller (`h-56` = 224px) on mobile (< 640px, where cards are always full-width in the `grid-cols-1` layout) and keeps the original, more compact height from the `sm:` breakpoint up, where the multi-column grid gives each card less width and a shorter map keeps card heights aligned.

- [ ] **Step 2: Run the build to confirm no breakage**

Run: `npm run build`
Expected: build completes with no errors (Tailwind class changes never break a build, but confirms no typo in the edit).

- [ ] **Step 3: Manual visual check**

Run `npm run dev`, open the app at a mobile viewport width (e.g. browser dev tools set to 375px or 390px), navigate to `/maps`, and confirm each map card now shows a taller, more legible map than before, with no visual overlap or clipping against the card's text section below it.

- [ ] **Step 4: Commit**

```bash
git add src/views/MapsView.vue
git commit -m "Make MapsView map embeds taller on mobile for legibility"
```

---

### Task 2: AttractionsView — let category tabs shrink instead of forcing scroll

**Files:**
- Modify: `src/views/AttractionsView.vue:16`, `src/views/AttractionsView.vue:26`, `src/views/AttractionsView.vue:36` (the three main category tab buttons: Үзвэр & Аялал / Шопинг & Молл / Кафе & Бэйкери)

**Interfaces:** None — leaf template edits, no props/state change. `activeCategory` ref and click handlers are untouched.

- [ ] **Step 1: Drop the forced minimum width on the 3 main tabs**

In `src/views/AttractionsView.vue`, on all three category tab buttons (lines 16, 26, 36), change:

```
class="flex-1 min-w-[120px] shrink-0 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 text-center whitespace-nowrap"
```

to:

```
class="flex-1 shrink py-2.5 px-2 sm:px-3 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-center whitespace-nowrap"
```

(Removes `min-w-[120px]`, changes `shrink-0` → `shrink` so the 3 tabs compress equally to fit the viewport instead of forcing their parent's `overflow-x-auto` to scroll, tightens horizontal padding/gap slightly at the base breakpoint so the shrunk tabs don't feel crowded.)

- [ ] **Step 2: Run the build to confirm no breakage**

Run: `npm run build`
Expected: build completes with no errors.

- [ ] **Step 3: Manual visual check**

Run `npm run dev`, open `/attractions` at a 360px and a 375px mobile viewport width, and confirm all 3 category tabs are visible without needing to scroll the tab row, with their icon + label + count still readable and not overlapping.

- [ ] **Step 4: Commit**

```bash
git add src/views/AttractionsView.vue
git commit -m "Let AttractionsView category tabs shrink to fit instead of scrolling"
```

---

### Task 3: Global defensive overflow guard

**Files:**
- Modify: `src/style.css:31-45` (the existing `html` and `body` rules)

**Interfaces:** None — global CSS only.

- [ ] **Step 1: Add `overflow-x: hidden` to `html` and `body`**

In `src/style.css`, the current rules are:

```css
html {
  scroll-behavior: smooth;
  background: var(--wallet);
  color: var(--sky);
}

body {
  margin: 0;
  background: var(--wallet);
  color: var(--sky);
  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.62;
  -webkit-font-smoothing: antialiased;
  padding-bottom: 80px; /* Space for mobile sticky tabbar */
}
```

Change to:

```css
html {
  scroll-behavior: smooth;
  background: var(--wallet);
  color: var(--sky);
  overflow-x: hidden;
}

body {
  margin: 0;
  background: var(--wallet);
  color: var(--sky);
  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.62;
  -webkit-font-smoothing: antialiased;
  padding-bottom: 80px; /* Space for mobile sticky tabbar */
  overflow-x: hidden;
}
```

This is a backstop only — it hides any stray horizontal overflow rather than fixing a specific known cause (none was found beyond Tasks 1–2), so it costs nothing if no other overflow exists, and prevents a body-level side-scroll if one turns up later.

- [ ] **Step 2: Run the build to confirm no breakage**

Run: `npm run build`
Expected: build completes with no errors.

- [ ] **Step 3: Manual visual check**

At a mobile viewport width, try to scroll the page horizontally (swipe/drag sideways) on each of the 8 views (`/`, `/tickets`, `/maps`, `/itinerary`, `/attractions`, `/budget`, `/notes`, `/gallery`). Confirm none of them scroll sideways.

- [ ] **Step 4: Commit**

```bash
git add src/style.css
git commit -m "Add overflow-x guard on html/body to prevent mobile horizontal scroll"
```
