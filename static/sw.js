importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js",
);

workbox.setConfig({ debug: false });

// Limpa caches antigos durante a instalação
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          return caches.delete(cacheName);
        })
      );
    }),
  );
});

// Estratégia de rede apenas (sem cache)
workbox.routing.setDefaultHandler(new workbox.strategies.NetworkOnly());

// Página offline de fallback
workbox.recipes.offlineFallback({ pageFallback: "/offline" });
