// This is a basic service worker
self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating.');
});

self.addEventListener('fetch', (event) => {
  // Basic network-first strategy
  event.respondWith(
    fetch(event.request).catch(() => {
      // If the network fails, you could return a fallback page or asset
      // For now, we'll just let the browser handle the error
    })
  );
});
