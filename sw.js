const APP_VERSION = "2.0.0";
const CACHE_NAME = `ipap-base-study-program-${APP_VERSION}`;
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./version.json",
  "./icons/apple-touch-icon.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", event => {
  // Build the complete new cache first. We intentionally do NOT call
  // skipWaiting here on an update; the running app gets an Update button
  // and decides when to activate the new version after saving progress.
  const requests = APP_SHELL.map(url => new Request(url, {cache:"reload"}));
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(requests)));
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener("message", event => {
  if(event.data && event.data.type === "SKIP_WAITING"){
    self.skipWaiting();
  }
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if(request.method !== "GET") return;

  const url = new URL(request.url);
  if(url.origin !== self.location.origin) return;

  // Keep a controlled client on one coherent app version. A newly deployed
  // version is pre-cached by the waiting service worker and becomes active
  // only after the user chooses Update app now (or no old client remains).
  if(request.mode === "navigate"){
    event.respondWith(
      caches.open(CACHE_NAME).then(cache =>
        cache.match("./index.html").then(cached =>
          cached || fetch(request).then(response => {
            if(response && response.ok) cache.put("./index.html", response.clone());
            return response;
          })
        )
      )
    );
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(cache =>
      cache.match(request).then(cached =>
        cached || fetch(request).then(response => {
          if(response && response.ok) cache.put(request, response.clone());
          return response;
        })
      )
    )
  );
});
