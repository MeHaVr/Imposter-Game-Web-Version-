const CACHE_NAME = "imposter-game-v1";

self.addEventListener("install", (event) => {
  console.log("Service Worker: Installiert");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker: Aktiviert");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Service Worker: Lösche alten Cache");
            return caches.delete(cache);
          }
        }),
      );
    }),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }),
  );
});
