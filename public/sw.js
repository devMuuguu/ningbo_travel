const CACHE_NAME = "ub-ningbo-v6";
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

function extractBundles(html) {
  const m = html.match(/assets\/[a-zA-Z0-9_.-]+/g);
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
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(request);

        // Fetch fresh copy in background
        fetch(request)
          .then(async (res) => {
            const contentType = res.headers.get("content-type");
            if (
              !res ||
              res.status !== 200 ||
              !contentType ||
              !contentType.includes("text/html")
            ) {
              return;
            }

            const freshHtml = await res.clone().text();

            if (cached) {
              const cachedHtml = await cached.text();
              if (extractBundles(freshHtml) !== extractBundles(cachedHtml)) {
                await cache.put(request, res.clone());
                const clients = await self.clients.matchAll();
                clients.forEach((c) =>
                  c.postMessage({ type: "UPDATE_AVAILABLE" }),
                );
                return;
              }
            }

            await cache.put(request, res.clone());
          })
          .catch(() => {});

        if (cached) return cached;

        try {
          const fresh = await fetch(request);
          if (fresh && fresh.status === 200) {
            cache.put(request, fresh.clone());
          }
          return fresh;
        } catch {
          return new Response("Offline", {
            status: 503,
            headers: { "Content-Type": "text/html" },
          });
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
