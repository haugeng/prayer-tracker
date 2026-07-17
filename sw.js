const cacheName = 'prayer-tracker-v4.3.1';
const assets = [
  './',
  'index.html',
  'sw.js'
];

self.addEventListener('install', e => {
    self.skipWaiting();
    e.waitUntil(caches.open(cacheName).then(cache => cache.addAll(assets)));
});

self.addEventListener('activate', e => {
    self.clients.claim();
    e.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(k => k !== cacheName ? caches.delete(k) : null)
        )).then(() => {
            self.clients.matchAll().then(clients => {
                clients.forEach(c => c.postMessage({ type: 'SW_UPDATED' }));
            });
        })
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
