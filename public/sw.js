const CACHE_NAME = "ub-ningbo-v7";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
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
            if (key !== CACHE_NAME) {
              return caches.delete(key);
            }
          }),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Matches all referenced scripts and CSS files in assets directory
function extractBundles(html) {
  const m = html.match(/assets\/[a-zA-Z0-9_.-]+/g);
  return m ? [...new Set(m)].sort().join("|") : "";
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (url.protocol !== "http:" && url.protocol !== "https:") return;
  if (url.origin !== self.location.origin) return;

  // Navigation Requests (HTML / Page Loads)
  // Navigation Requests: Network-First (with Cache Fallback for offline)
  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          // Always try network first so fresh HTML + new asset hashes are served immediately
          const networkResponse = await fetch(request);
          if (networkResponse && networkResponse.status === 200) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, networkResponse.clone());
            cache.put("/index.html", networkResponse.clone());
            return networkResponse;
          }
        } catch (err) {
          // Network failed or device is offline -> Fallback to Cache
        }

        // Return cached HTML if offline
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse =
          (await cache.match(request, { ignoreSearch: true })) ||
          (await cache.match("/index.html"));

        if (cachedResponse) {
          return cachedResponse;
        }

        return new Response("Offline", {
          status: 503,
          headers: { "Content-Type": "text/html" },
        });
      })(),
    );
    return;
  }

  // Static Assets (Cache-First)
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
