// DoseKon — offline app-shell cache.
// Bump this version any time index.html (or any shipped file) changes,
// so returning users pick up the update instead of a stale cache.
const VERSION = 'v5';
const SHELL_CACHE = `dosekon-shell-${VERSION}`;
const FONT_CACHE = 'dosekon-fonts';

// Canonical key for the app shell page. No matter what exact URL a
// navigation request carries (trailing slash, ?query added by the OS
// when launched from the home screen, etc), offline navigations
// always fall back to this one cached copy.
const SHELL_URL = './index.html';

const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-512-maskable.png',
  './icons/apple-touch-icon.png',
  './icons/favicon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) =>
      Promise.all(
        APP_SHELL.map((url) =>
          // cache: 'reload' bypasses the HTTP disk cache so we always
          // grab a genuinely fresh copy while installing.
          fetch(url, { cache: 'reload' })
            .then((response) => {
              if (response && response.ok) return cache.put(url, response);
            })
            // A single missing/failed asset (e.g. one icon) must never
            // abort caching of the rest of the app shell.
            .catch(() => {})
        )
      )
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== SHELL_CACHE && key !== FONT_CACHE)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Google Fonts: cache-first, fetch once and reuse forever offline.
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.open(FONT_CACHE).then((cache) =>
        cache.match(request).then((cached) => {
          if (cached) return cached;
          return fetch(request)
            .then((response) => {
              if (response && response.status === 200) cache.put(request, response.clone());
              return response;
            })
            .catch(() => cached);
        })
      )
    );
    return;
  }

  // Remote kill-switch status: never serve or store a cached copy.
  if (url.pathname.endsWith('/status.json')) {
    event.respondWith(
      fetch(request, { cache: 'no-store' }).catch(() =>
        new Response('', { status: 503, statusText: 'Offline' })
      )
    );
    return;
  }

  // Page navigations (address bar, refresh, reopening from the home
  // screen icon): network-first for freshness, but ALWAYS resolve to
  // the cached app shell when offline — regardless of the exact URL
  // requested. This is the actual fix for "refresh asks for internet".
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.ok) {
            caches.open(SHELL_CACHE).then((cache) => cache.put(SHELL_URL, response.clone()));
          }
          return response;
        })
        .catch(() =>
          caches.match(SHELL_URL).then((cached) => cached || caches.match(request))
        )
    );
    return;
  }

  // Everything else in the app shell (same-origin CSS/JS/images):
  // cache-first for instant, offline-safe loads; refresh the cache in
  // the background whenever the network is available.
  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            caches.open(SHELL_CACHE).then((cache) => cache.put(request, response.clone()));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
