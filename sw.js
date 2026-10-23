/* Guarda la app para abrirla sin conexión. Los mapas y las rutas siguen necesitando internet. */
var V = 'redvial-v19';
var SHELL = ['./', 'index.html', 'model.js', 'manifest.webmanifest',
  'vendor/leaflet/leaflet.js', 'vendor/leaflet/leaflet.css', 'vendor/qrcode.js',
  'icons/icon-192.png', 'icons/icon-512.png'];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(V).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== V; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var r = e.request, u = new URL(r.url);
  if (r.method !== 'GET' || u.origin !== self.location.origin) return;
  /* Primero la red (sin usar la copia temporal del navegador), para que una versión nueva se vea enseguida; sin conexión, la copia guardada. */
  e.respondWith(fetch(r.url, { cache: 'no-cache', credentials: 'same-origin' }).then(function (res) {
    var copy = res.clone();
    caches.open(V).then(function (c) { c.put(r, copy); });
    return res;
  }).catch(function () {
    return caches.match(r).then(function (hit) { return hit || (r.mode === 'navigate' ? caches.match('index.html') : Promise.reject()); });
  }));
});
