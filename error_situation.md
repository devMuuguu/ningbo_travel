# PWA Stale Cache Issue — Post-Deploy MIME Type Error

## Symptom

After deploying to Vercel, the app shows a blank page with this console error:

```
Failed to load module script: Expected a JavaScript-or-Wasm module script
but the server responded with a MIME type of "text/html". Strict MIME type
checking is enforced for module scripts per HTML spec.
```

Hard refresh (`Cmd+Shift+R`) temporarily fixes it. Normal refresh breaks it again.

## Root Cause

Two-layer caching conflict:

1. **Service Worker** caches `index.html` responses. After deploy, the cached HTML still references old Vite bundle hashes (e.g. `index-OLDHASH.js`). The old bundles no longer exist on the server.

2. **Vercel's SPA fallback** returns `index.html` for any unknown path. When the browser requests the old bundle hash, Vercel returns HTML instead of a 404. The browser expects JavaScript but gets HTML → MIME type error.

```
Cached index.html  →  references index-OLDHASH.js
                         ↓
Browser requests index-OLDHASH.js
                         ↓
Vercel has no such file  →  returns index.html (SPA fallback)
                         ↓
Browser receives HTML for a <script type="module">  →  MIME error
```

## Why Hard Refresh Fixes It

`Cmd+Shift+R` bypasses the service worker and fetches fresh `index.html` from the network. The new HTML references current bundle hashes → everything loads correctly.

## Why It Recurs on Normal Refresh

The old service worker is still active and intercepts the navigation request, serving the stale cached `index.html` again.

## Why Different Chrome Accounts Behave Differently

Each Chrome profile has its own service worker registration and cache storage. A profile that never had the old SW installs the clean version on first visit. Profiles with the old SW keep serving stale content until manually cleared.

## The Fix (Applied)

### 1. Service Worker: Stale-While-Revalidate

`public/sw.js` now uses stale-while-revalidate for navigation requests:

- Serve cached `index.html` instantly (fast load, works offline)
- Fetch fresh `index.html` in background
- Compare bundle hashes (`assets/index-*.js` filenames)
- If hashes differ → send `UPDATE_AVAILABLE` message → client auto-reloads

### 2. Vercel: No-Cache Headers

`vercel.json` sets `Cache-Control: no-cache` on `index.html` and `sw.js` to prevent CDN edge caching.

### 3. Client: Auto-Reload on Update

`src/main.js` listens for `UPDATE_AVAILABLE` from the service worker and calls `window.location.reload()`.

## One-Time Fix for Existing Users

Users with the old SW cached must clear site data once:

1. DevTools → Application → **Clear site data** (or Clear Storage → check all → Clear)
2. Hard refresh: `Cmd+Shift+R`

After that, all future deploys auto-update without manual intervention.

## Files Changed

| File | Change |
|---|---|
| `public/sw.js` | Stale-while-revalidate navigation, cache-first assets, bundle hash detection |
| `src/main.js` | SW registration + `UPDATE_AVAILABLE` listener |
| `vercel.json` | `no-cache` headers on `index.html` and `sw.js` |
| `public/offline.html` | Deleted (not needed — app data is in cached page) |
