const version = "0.0.11";
const cacheName = `Weather-${version}`;
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        `/`,
        `/pwa/images/chomes.png`,
        `/pwa/images/icons/icon-72x72.png`,
        `/pwa/images/icons/icon-96x96.png`,
        `/pwa/images/icons/icon-128x128.png`,
        `/pwa/images/icons/icon-144x144.png`,
        `/pwa/images/icons/icon-152x152.png`,
        `/pwa/images/icons/icon-192x192.png`,
        `/pwa/images/icons/icon-384x384.png`,
        `/pwa/images/icons/icon-512x512.png`,
        `/pwa/images/icons/favicon.png`,
        `/index.html`,
        `/js/index.js`,
        `/css/style.css`,
        `/weather-img/cloudy.jpg`,
        `/weather-img/rainy.jpg`,
        `/weather-img/snowy.jpg`,
        `/weather-img/stormy.jpg`,
        `/weather-img/sunny.jpg`,
      ])
          .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});