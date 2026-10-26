const CACHE_NAME = 'localpad-cache-v1';
const ASSETS_TO_CACHE = [
    './index.html',
    './manifest.json'
];

// Install Event: Cache essential files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Fetch Event: Serve from cache if offline
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Return cached version if found, otherwise fetch from network
            return response || fetch(event.request);
        })
    );
});