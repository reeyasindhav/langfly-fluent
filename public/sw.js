const CACHE_NAME = "langfly-v1";
const STATIC_ASSETS = [
  "/",
  "/dashboard",
  "/roadmap",
  "/flashcards",
  "/challenges",
  "/practice",
  "/progress",
  "/profile",
];

const FLASHCARD_CACHE = "langfly-flashcards-v1";
const API_CACHE = "langfly-api-v1";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== FLASHCARD_CACHE && name !== API_CACHE)
          .map((name) => caches.delete(name)),
      );
    }),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== "GET") {
    return;
  }

  if (url.pathname.startsWith("/api/flashcards") || url.pathname.startsWith("/api/review")) {
    event.respondWith(networkFirstStrategy(request, FLASHCARD_CACHE));
    return;
  }

  if (url.pathname.startsWith("/api/")) {
    event.respondWith(networkFirstStrategy(request, API_CACHE));
    return;
  }

  if (STATIC_ASSETS.includes(url.pathname) || url.pathname.startsWith("/_assets/")) {
    event.respondWith(cacheFirstStrategy(request, CACHE_NAME));
    return;
  }

  event.respondWith(staleWhileRevalidate(request, CACHE_NAME));
});

async function cacheFirstStrategy(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response("Offline", { status: 503 });
  }
}

async function networkFirstStrategy(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await cache.match(request);
    if (cached) return cached;
    return new Response(JSON.stringify({ error: "Offline" }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request)
    .then((response) => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => cached);

  return cached || fetchPromise;
}

self.addEventListener("message", (event) => {
  if (event.data === "skipWaiting") {
    self.skipWaiting();
  }
  if (event.data === "clearCache") {
    caches.keys().then((names) => {
      names.forEach((name) => caches.delete(name));
    });
  }
});
