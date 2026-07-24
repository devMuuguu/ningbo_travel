const CACHE_NAME = "ub-ningbo-v6";
const NAV_CACHE = "ub-ningbo-nav-v1";
const ASSETS_TO_CACHE = [
  "/manifest.json",
  "/icon.svg",
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
  const m = html.match(/assets\/index-[^"'\s)]+/g);
  return m ? [...new Set(m)].sort().join("|") : "";
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (url.protocol !== "http:" && url.protocol !== "https:") return;
  if (url.origin !== self.location.origin) return;

  // Navigation: stale-while-revalidate
  if (request.mode === "navigate") {
    event.respondWith(
      caches.open(NAV_CACHE).then(async (navCache) => {
        const cached = await navCache.match(request);

        // Background: fetch fresh, cache it, check if bundles changed
        fetch(request)
          .then((res) => {
            if (!res || res.status !== 200) return;
            const freshHtml = res.clone().text();
            navCache.put(request, res.clone());

            return freshHtml;
          })
          .then((freshHtml) => {
            if (!freshHtml || !cached) return;
            return Promise.all([freshHtml, cached.text()]);
          })
          .then((pair) => {
            if (!pair) return;
            const [freshHtml, cachedHtml] = pair;
            if (extractBundles(freshHtml) !== extractBundles(cachedHtml)) {
              self.clients.matchAll().then((clients) => {
                clients.forEach((c) => c.postMessage({ type: "UPDATE_AVAILABLE" }));
              });
            }
          })
          .catch(() => {});

        if (cached) return cached;

        // First visit: must wait for network
        try {
          const fresh = await fetch(request);
          if (fresh && fresh.status === 200) {
            navCache.put(request, fresh.clone());
          }
          return fresh;
        } catch {
          return new Response("Offline", { status: 503, headers: { "Content-Type": "text/html" } });
        }
      }),
    );
    return;
  }

  // Static assets: cache-first
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        return response;
      });
    }),
  );
});
