# Mobile Responsiveness Fixes

## Problem

Most users of this app are on mobile. Code audit (no live browser available in this environment) surfaced two concrete issues:

1. **MapsView**: Google Maps iframes are a fixed `h-48`/`h-44` (192px/176px) on every breakpoint. On a full-width mobile card this reads as a cramped, hard-to-read map.
2. **AttractionsView**: the 3 main category tabs each carry `min-w-[120px]`, forcing ≥360px+gaps of content width — wider than the usable width on common 360–375px phones after the page's side padding. They currently scroll horizontally instead of shrinking to fit, which is unnecessary for exactly 3 items.

No other view showed a structural mobile issue on audit (all use `grid-cols-1` mobile-first grids or `flex-wrap`/`overflow-x-auto` already).

## Fix

- **MapsView** (`src/views/MapsView.vue`): increase iframe height on mobile (base `h-56`, keep current height from `sm:`/`md:` up where cards are already narrower in multi-column layout); slightly tighten card body padding at the base breakpoint.
- **AttractionsView** (`src/views/AttractionsView.vue`): remove the `min-w-[120px]` constraint on the 3 main category tab buttons so `flex-1` shrinks them to fit the viewport instead of forcing a scroll.
- **Global safety net** (`src/style.css`): add `overflow-x: hidden` to `html, body` as defensive insurance against any other page-level horizontal scroll not caught by this audit.

## Verification

No browser tool is available in this environment, so this cannot be visually confirmed here. `npm run build` will be run to confirm no build breakage. The user will sanity-check on their own phone after deploy and report back any remaining spots.

## Out of scope

- A full pixel-level audit of every view (Budget, Itinerary, Notes, Overview, Tickets, Gallery) — these already follow mobile-first patterns on code review and showed no structural issue.
