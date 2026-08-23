const CACHE_NAME = "dr-ahogni-v4";
const OFFLINE_URL_FR = "/offline";
const OFFLINE_URL_EN = "/en/offline";

const PRECACHE_ASSETS = [
  "/",
  "/publications",
  "/cv",
  "/contact",
  "/speaking",
  "/blog",
  "/offline",
  "/en",
  "/en/publications",
  "/en/cv",
  "/en/contact",
  "/en/speaking",
  "/en/blog",
  "/en/offline",
  "/favicon.svg",
  "/Dr-Idelphone-AHOGNI.jpeg",
  "/manifest.webmanifest"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn("Pre-caching partial error:", err);
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // Pour les pages HTML (navigation) : Réseau en priorité, puis Cache, puis page Offline
  if (req.mode === "navigate" || req.headers.get("accept")?.includes("text/html")) {
    const isEnRoute = url.pathname === "/en" || url.pathname.startsWith("/en/");
    const targetOfflineUrl = isEnRoute ? OFFLINE_URL_EN : OFFLINE_URL_FR;

    event.respondWith(
      fetch(req)
        .then((res) => {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
          return res;
        })
        .catch(async () => {
          const cached = await caches.match(req);
          if (cached) return cached;
          const offlinePage = await caches.match(targetOfflineUrl) || await caches.match(OFFLINE_URL_FR);
          return offlinePage || new Response("Mode hors-ligne actif.", { headers: { "Content-Type": "text/plain" } });
        })
    );
    return;
  }

  // Pour les assets statiques (fonts, styles, scripts, images) : Cache d'abord, revalidation en arrière-plan
  event.respondWith(
    caches.match(req).then((cachedRes) => {
      if (cachedRes) {
        fetch(req).then((networkRes) => {
          if (networkRes.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(req, networkRes));
          }
        }).catch(() => {});
        return cachedRes;
      }

      return fetch(req).then((networkRes) => {
        if (networkRes.status === 200) {
          const clone = networkRes.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
        }
        return networkRes;
      });
    })
  );
});
