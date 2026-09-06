// Service worker de "Reparto de Nómina".
// Sube este número cada vez que publiques cambios importantes: al cambiar,
// el service worker viejo se sustituye y limpia su caché en la siguiente visita.
const CACHE = 'reparto-v1';
const ARCHIVOS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon-180.png',
];

self.addEventListener('install', ev => {
  self.skipWaiting();
  ev.waitUntil(caches.open(CACHE).then(c => c.addAll(ARCHIVOS)).catch(() => {}));
});

self.addEventListener('activate', ev => {
  ev.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// La página principal: red primero (para que los cambios lleguen en cuanto
// hay conexión), y la copia en caché sólo como respaldo sin conexión.
// Todo lo demás (iconos, manifest): caché primero, red como respaldo.
self.addEventListener('fetch', ev => {
  if (ev.request.method !== 'GET') return;
  const esNavegacion = ev.request.mode === 'navigate';

  if (esNavegacion) {
    ev.respondWith(
      fetch(ev.request).then(res => {
        const copia = res.clone();
        caches.open(CACHE).then(c => c.put('./index.html', copia)).catch(() => {});
        return res;
      }).catch(() => caches.match('./index.html'))
    );
    return;
  }

  ev.respondWith(
    caches.match(ev.request).then(cacheado => cacheado || fetch(ev.request).then(res => {
      const copia = res.clone();
      caches.open(CACHE).then(c => c.put(ev.request, copia)).catch(() => {});
      return res;
    }).catch(() => cacheado))
  );
});
