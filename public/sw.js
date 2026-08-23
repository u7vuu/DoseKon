const CACHE_NAME = 'dosekon-v1.4.0';
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './favicon.ico'
];

const SHUTDOWN_HTML = `<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>DoseKon</title>
<style>
body{font-family:system-ui,sans-serif;background:#14221C;color:#F2F4EE;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;padding:24px;text-align:center;}
div{max-width:420px}
h1{font-size:1.25rem;margin-bottom:.5rem}
p{color:#B7C4BC;font-size:.95rem;line-height:1.6}
</style>
</head>
<body>
<div>
<h1>DoseKon توقف مؤقتاً</h1>
<p>تم إيقاف هذا التطبيق من قبل المطورين. للاستفسار: t.me/u7vuu</p>
</div>
</body>
</html>`;

async function isKilled() {
  try {
    const res = await fetch('./kill-switch.json', { cache: 'no-store' });
    if (!res.ok) return false;
    const data = await res.json();
    return data && data.disabled === true;
  } catch (e) {
    return false;
  }
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) => Promise.all(names.map((n) => n !== CACHE_NAME ? caches.delete(n) : null)))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET' || !request.url.startsWith('http')) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      isKilled().then((killed) => {
        if (killed) {
          caches.keys().then((names) => Promise.all(names.map((n) => caches.delete(n))));
          self.registration.unregister();
          return new Response(SHUTDOWN_HTML, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
        }
        return fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const clone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put('./index.html', clone));
            }
            return networkResponse;
          })
          .catch(() => caches.match('./index.html').then((r) => r || caches.match('./')));
      })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        if (request.url.startsWith(self.location.origin)) {
          fetch(request).then((res) => {
            if (res && res.status === 200) caches.open(CACHE_NAME).then((c) => c.put(request, res.clone()));
          }).catch(() => {});
        }
        return cachedResponse;
      }
      return fetch(request)
        .then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200 || (networkResponse.type !== 'basic' && networkResponse.type !== 'cors')) {
            return networkResponse;
          }
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return networkResponse;
        })
        .catch(() => null);
    })
  );
});
