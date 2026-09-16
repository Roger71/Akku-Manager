const CACHE_NAME = 'akku-manager-v1';
const ASSETS = ['./', './index.html'];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
    );
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then(keys => 
            Promise.all(keys.map(key => key !== CACHE_NAME ? caches.delete(key) : null))
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request) || caches.match('./index.html'))
    );
});
