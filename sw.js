/*
  SOP Sınav Sistemi - Service Worker (KALDIRMA/TEMİZLEME SÜRÜMÜ)
  =================================================================
  Bu proje artık service worker / offline önbellekleme kullanmıyor -
  önceki sürüm, sayfanın ilk yüklendiği andaki halini önbelleğe alıp
  her ziyarette eski/güncel-olmayan içeriği gösteriyordu.

  Bu dosya, tarayıcılarda önceden kayıtlı olan eski service worker'ı
  bulur, tüm önbelleği siler, kendini kaydı siler (unregister) ve
  açık sekmeleri güncel içeriği çekmeye zorlar. index.html artık
  hiçbir service worker kaydı yapmıyor; bu dosya yalnızca daha önce
  kaydolmuş olanları temizlemek için burada duruyor.
*/

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.matchAll({ type: 'window' }))
      .then((clients) => {
        clients.forEach((client) => client.navigate(client.url));
      })
  );
});
