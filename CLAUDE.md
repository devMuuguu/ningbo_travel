# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-purpose Vue 3 SPA: a personal travel itinerary/guide for one specific trip (Ulaanbaatar → Beijing → Shanghai → Ningbo, VNL Finals 2026). All UI text is hardcoded Mongolian content. It is not a template or multi-tenant app — content changes mean editing view files directly, not a CMS or config layer.

## Commands

- `npm run dev` — Vite dev server on `0.0.0.0:3000`
- `npm run build` — production build to `dist/`
- `npm start` — `node server.js`, an Express static-file server (fallback host for non-Vercel deploys; serves `dist/` if present, else repo root)
- `npm run lint` — no-op placeholder, does not actually lint anything
- No test suite exists.
- Deployed on Vercel (`.vercel/project.json`); Vercel serves the Vite build directly, it does not invoke `server.js`.

## Architecture

**Routing drives navigation, not the other way around.** `src/router/index.js` is the single source of truth for the app's sections: each route has `meta.title` (Mongolian label) and `meta.icon` (a string key). `App.vue` calls `router.getRoutes()` once and renders *both* the desktop top tab bar and the mobile bottom tab bar from that same list, mapping `meta.icon` to an actual icon component via a local name→component lookup (`getIcon()` in `App.vue`). To add a nav section: add a route with `meta.title`/`meta.icon`, create the view, no other wiring needed.

**Views are self-contained content + presentation.** Each `src/views/*View.vue` holds its own data inline as `ref([...])` arrays/objects in `<script setup>` (see `GalleryView.vue`, `TicketsView.vue`). There is no store (Pinia/Vuex), no API layer, no i18n system — content is edited directly in the component that renders it.

**Design system lives in `src/style.css`, not just Tailwind.** Tailwind v4 (`@tailwindcss/vite`) is used for layout/spacing, but the visual identity (a "boarding pass / travel wallet" theme) is hand-rolled CSS using custom properties (`--wallet`, `--stub`, status colors `--air`/`--rail`/`--match`/`--go`/`--wait`) plus reusable classes: `.card-panel`, `.pill.{go,wait,air,rail}`, `.btn-primary`/`.btn-secondary`, `.ticket-paper`, `.eyebrow`, `.page-title`. Reuse these classes for new UI instead of inventing new styling patterns.

**PWA/offline behavior requires two files to stay in sync.** `public/sw.js` is a hand-written service worker (cache-first for static assets, network-first-with-fallback for navigations), registered only in production builds (`import.meta.env.PROD` check in `src/main.js`). Any asset that must work offline needs to exist in `public/` *and* be listed in `ASSETS_TO_CACHE` in `public/sw.js` with the exact same filename — a mismatch here fails silently (assets just don't load offline/in prod) since fetch errors in the SW are swallowed. Bump `CACHE_NAME` when changing what's cached, since old caches otherwise persist per-client until the version string changes.

**Images live in `public/`, not `src/assets/`.** They're referenced with absolute paths (e.g. `/ub_shanghai_flight.png`) so Vite copies them to the dist root unprocessed rather than fingerprinting/bundling them.

**Gemini/AI Studio scaffolding is vestigial.** `README.md` and `metadata.json` reference a `GEMINI_API_KEY` and AI Studio origin, but no source file actually calls the Gemini API — it's leftover from the project's bootstrap template, not live functionality.
