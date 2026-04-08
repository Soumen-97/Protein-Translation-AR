const CACHE_NAME = 'ar-lab-v4';

const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Install
self.addEventListener('install', event => {
  self.skipWaiting(); // force activate
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Activate
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch (network first, fallback to cache)
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(res => res)
      .catch(() => caches.match(event.request))
  );
});
