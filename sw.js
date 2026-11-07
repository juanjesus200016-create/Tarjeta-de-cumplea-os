// ==========================================
// SERVICE WORKER - Invitación Especial
// ==========================================
const CACHE_NAME = 'invitacion-cache-v7';

const ARCHIVOS_CACHE = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './invitacion.jpg',   // ⬅️ Tu imagen en jpg
  './cumpleaños.m4a',   // ⬅️ Tu audio (cámbialo a .mp3 si es necesario)
  './icon-192.png',
  './icon-512.png'
];

/* ---------- INSTALACIÓN ---------- */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Cacheando archivos');
        return cache.addAll(ARCHIVOS_CACHE);
      })
      .then(() => self.skipWaiting())
      .catch((err) => console.error('Error al cachear:', err))
  );
});

/* ---------- ACTIVACIÓN ---------- */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((nombres) =>
      Promise.all(
        nombres.map((nombre) => {
          if (nombre !== CACHE_NAME) {
            console.log('🗑️ Eliminando caché antiguo:', nombre);
            return caches.delete(nombre);
          }
        })
      )
    ).then(() => self.clients.claim())
  );
});

/* ---------- FETCH ---------- */
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((respuestaCache) => {
      if (respuestaCache) return respuestaCache;

      return fetch(event.request)
        .then((respuestaRed) => {
          if (!respuestaRed || respuestaRed.status !== 200 || respuestaRed.type !== 'basic') {
            return respuestaRed;
          }
          const copia = respuestaRed.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copia));
          return respuestaRed;
        })
        .catch(() => {
          if (event.request.destination === 'document') {
            return caches.match('./index.html');
          }
        });
    })
  );
});