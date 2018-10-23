self.addEventListener("install", function(e) {
    console.log("Service Worker Installed");
    e.waitUntil(
        caches.open('AppTest').then(function(cache) {
            return cache.addAll([

                'index.php',
                'contact.php',
                'artist.php',
                'artist_info.php',
                'info.php',
                'resources/css/main.css',
                'resources/js/app.js',
                'favicon/144x144.png',
                'favicon/256x256.png',
                'resources/js/notifications.js'
            ]);
        })
    );
});

/*
 * Aktiver Service Worker
 */
self.addEventListener("activate", function(event) {
    console.log("Service Worker Activated");
});

/*
 * Service Worker Fetch
 * Tjek cache efter match og returner hvis der er et match
 * Ellers hent fil via netværk og tilføj til cache
 */

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches.open('AppTest').then(function(cache) {
            return cache.match(event.request).then(function(response) {
                return response || fetch(event.request).then(function(response) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});

// Show network version first then return to cache
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});
