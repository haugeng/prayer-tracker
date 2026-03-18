const cacheName = 'prayer-tracker-v4.0.3';
// GitHub Pages paths are relative to the repository root
const assets = [
  './',
  'index.html'
];

self.addEventListener('install', e => {
    self.skipWaiting();
    e.waitUntil(
        caches.open(cacheName).then(cache => cache.addAll(assets))
    );
});

self.addEventListener('activate', e => {
    self.clients.claim();
    e.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(k => k !== cacheName ? caches.delete(k) : null)
        ))
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(res => res || fetch(e.request))
    );
});
