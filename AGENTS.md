# AGENTS.md

## What this is

Vue 3 SPA — hardcoded Mongolian travel itinerary for one trip. Not a template. Content edits happen in view files directly.

## Commands

- `npm run dev` — Vite dev server (`0.0.0.0:3000`)
- `npm run build` — production build to `dist/`
- `npm start` — Express static server (fallback for non-Vercel deploys)
- `npm run lint` — no-op, does nothing
- No test suite exists. No typecheck. Verify changes via `npm run build` (catches template/JS errors).

## Key conventions

- **Router = nav source of truth.** `src/router/index.js` defines routes with `meta.title`/`meta.icon`. `App.vue` reads routes and renders tabs. Add a section by adding a route + view, nothing else.
- **No store, no API, no i18n.** Data is inline `ref()` in each view component. Edit content in the view file.
- **Design system in `src/style.css`.** Reuse: `.card-panel`, `.pill.{go,wait,air,rail}`, `.btn-primary`/`.btn-secondary`, `.ticket-paper`, `.eyebrow`, `.page-title`. Custom properties: `--wallet`, `--stub`, `--air`/`--rail`/`--match`/`--go`/`--wait`. Tailwind v4 used for layout only.
- **Images in `public/`, referenced as absolute paths** (e.g. `/ub_shanghai_flight.png`). They are not in `src/assets/`.
- **Service worker sync.** If adding offline assets, update both `public/` and `ASSETS_TO_CACHE` in `public/sw.js` with exact filenames. Bump `CACHE_NAME` version string. Navigation uses stale-while-revalidate (cached HTML served instantly, fresh HTML fetched in background). If bundle hashes change, SW sends `UPDATE_AVAILABLE` → client auto-reloads. `vercel.json` sets `no-cache` on `index.html` and `sw.js` to prevent CDN edge caching.
- **Deployed on Vercel.** `.vercel/project.json` exists. Vercel serves the Vite build directly; `server.js` is not invoked.

## Gotchas

- `README.md` and `metadata.json` reference `GEMINI_API_KEY` — this is vestigial scaffolding, not live code. Ignore it.
- Express dependency is v5 (`^5.2.1`), not v4 — middleware API differs if you touch `server.js`.
- Vite config has `allowedHosts: true` — dev server accepts connections from any host.
