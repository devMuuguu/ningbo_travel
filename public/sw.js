const CACHE_NAME = "ub-ningbo-v4";
const NAV_CACHE = "ub-ningbo-nav-v1";
const OFFLINE_PAGE = "/offline.html";
const ASSETS_TO_CACHE = [
  "/manifest.json",
  "/icon.svg",
  "/offline.html",
  "/beijing-shaghai_train.png",
  "/beijing_to_shanghai_train.png",
  "/shanghai-ningbo_train.png",
  "/shanghai_to_ningbo_train.png",
  "/ub_shanghai_flight.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.map((key) => {
            if (key !== CACHE_NAME && key !== NAV_CACHE) {
              return caches.delete(key);
            }
          }),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

function extractBundles(html) {
  const m = html.match(/assets\/index-[^"'\s]+/g);
  return m ? m.sort().join("|") : "";
}

async function checkForUpdate(request) {
  try {
    const freshResponse = await fetch(request);
    if (!freshResponse || freshResponse.status !== 200) return;
    const freshHtml = await freshResponse.text();
    const navCache = await caches.open(NAV_CACHE);
    const cachedResponse = await navCache.match(request);
    if (!cachedResponse) return;
    const cachedHtml = await cachedResponse.text();
    if (extractBundles(freshHtml) !== extractBundles(cachedHtml)) {
      const clients = await self.clients.matchAll();
      clients.forEach((c) => c.postMessage({ type: "UPDATE_AVAILABLE" }));
    }
  } catch {
    // Offline or fetch error — skip silently
  }
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (url.protocol !== "http:" && url.protocol !== "https:") return;

  // Stale-while-revalidate for navigations
  if (request.mode === "navigate") {
    event.respondWith(
      caches.open(NAV_CACHE).then(async (navCache) => {
        const cached = await navCache.match(request);

        // Always fetch fresh in background
        fetch(request)
          .then((res) => {
            if (res && res.status === 200) {
              navCache.put(request, res.clone());
            }
          })
          .catch(() => {});

        if (cached) {
          // Check if bundles changed → notify clients
          checkForUpdate(request);
          return cached;
        }

        // First visit — must wait for network
        try {
          const fresh = await fetch(request);
          if (fresh && fresh.status === 200) {
            navCache.put(request, fresh.clone());
          }
          return fresh;
        } catch {
          return caches.match(OFFLINE_PAGE);
        }
      }),
    );
    return;
  }

  // Cache-first for same-origin static assets
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response;
          }
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() => new Response("", { status: 408, statusText: "Offline" }));
    }),
  );
});
