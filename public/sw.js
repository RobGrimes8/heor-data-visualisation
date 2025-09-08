const CACHE_NAME = "heor-cache-v1";
const URLS_TO_CACHE = [
    "/",
    "/month",
    "/range",
    "/manifest.json",
    "/productivity_metrics.csv",
];

// Install SW & cache assets
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(URLS_TO_CACHE);
        })
    );
});

// Fetch: serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request).catch(() =>
                // If offline and request is for navigation, show fallback
                event.request.mode === "navigate"
                    ? caches.match("/") // return cached homepage
                    : Promise.reject("no-match")
            );
        })
    );
});

// Cleanup old caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) return caches.delete(key);
                })
            )
        )
    );
});
