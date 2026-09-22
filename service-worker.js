const CACHE_NAME = "ledger-cache-v2";
const SHELL = ["./", "./index.html", "./style.css", "./app.js"]; // changes often — network-first
const STATIC = ["./manifest.json", "./icon.svg", "./vendor/xlsx.full.min.js"]; // rarely changes — cache-first

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll([...SHELL, ...STATIC])).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  const isShell = SHELL.some((p) => url.pathname.endsWith(p.replace("./", "/")) || url.pathname === "/" || event.request.mode === "navigate");

  if (isShell) {
    // network-first: always try fresh copy so updates show up immediately; cache is just an offline fallback
    event.respondWith(
      fetch(event.request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return res;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // cache-first for static assets that rarely change
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((res) => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return res;
      });
    })
  );
});
