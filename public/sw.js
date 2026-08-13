const CACHE_NAME = "ahogni-v2";
const PRECACHE = ["/", "/publications", "/blog", "/contact", "/speaking", "/offline"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(PRECACHE)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

function staleWhileRevalidate(req) {
  return caches.open(CACHE_NAME).then((cache) =>
    cache.match(req).then((cached) => {
      const fetched = fetch(req).then((res) => {
        if (res && res.status === 200) cache.put(req, res.clone());
        return res;
      }).catch(() => cached);
      return cached || fetched;
    })
  );
}

function networkFirst(req) {
  return fetch(req).then((res) => {
    if (res && res.status === 200) {
      const clone = res.clone();
      caches.open(CACHE_NAME).then((c) => c.put(req, clone));
    }
    return res;
  }).catch(() => caches.match(req));
}

function cacheFirst(req) {
  return caches.match(req).then((cached) =>
    cached || fetch(req).then((res) => {
      if (res && res.status === 200) {
        const clone = res.clone();
        caches.open(CACHE_NAME).then((c) => c.put(req, clone));
      }
      return res;
    })
  );
}

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);

  // Static assets: cache-first (immutable via Vite hashing)
  if (url.pathname.startsWith("/_astro/")) {
    e.respondWith(cacheFirst(e.request));
    return;
  }

  // Sanity API: network-first
  if (url.hostname.includes("sanity.io") || url.pathname.includes("/data/")) {
    e.respondWith(networkFirst(e.request));
    return;
  }

  // Images: cache-first
  if (/\.(jpg|jpeg|png|gif|webp|avif|svg|ico)$/i.test(url.pathname)) {
    e.respondWith(cacheFirst(e.request));
    return;
  }

  // HTML pages: stale-while-revalidate
  if (e.request.headers.get("accept")?.includes("text/html")) {
    e.respondWith(staleWhileRevalidate(e.request));
    return;
  }

  // Everything else: stale-while-revalidate
  e.respondWith(staleWhileRevalidate(e.request));
});
