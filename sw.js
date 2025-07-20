const CACHE_NAME = 'adaptbim-v2';
const STATIC_CACHE = 'adaptbim-static-v2';
const urlsToCache = [
  '/',
  '/css/bootstrap.min.css',
  '/css/style.css',
  '/js/jquery.1.11.1.js',
  '/js/bootstrap.js',
  '/img/webp/intro-bgd.webp',
  '/img/optimized/intro-bgd.png',
  '/img/optimized/about.png',
  '/img/optimized/testimonials.png',
  '/img/optimized/logo-large.png',
  '/img/webp/about.webp',
  '/img/webp/testimonials.webp',
  '/img/webp/logo-large.webp',
  'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&family=Lato:wght@400;700&family=Raleway:wght@300;400;500;600;700;800;900&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then(cache => {
        console.log('Opened main cache');
        return cache.addAll(urlsToCache);
      }),
      caches.open(STATIC_CACHE).then(cache => {
        console.log('Opened static cache');
        return cache.addAll(urlsToCache.filter(url => 
          url.includes('/css/') || 
          url.includes('/js/') || 
          url.includes('/img/') ||
          url.includes('.js') ||
          url.includes('.css') ||
          url.includes('.png') ||
          url.includes('.jpg') ||
          url.includes('.webp') ||
          url.includes('.svg')
        ));
      })
    ])
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Handle static assets with cache-first strategy
  if (event.request.url.includes('/css/') || 
      event.request.url.includes('/js/') || 
      event.request.url.includes('/img/') ||
      event.request.url.includes('.js') ||
      event.request.url.includes('.css') ||
      event.request.url.includes('.png') ||
      event.request.url.includes('.jpg') ||
      event.request.url.includes('.webp') ||
      event.request.url.includes('.svg')) {
    
    event.respondWith(
      caches.open(STATIC_CACHE).then(cache => {
        return cache.match(event.request).then(response => {
          // Return cached version if available
          if (response) {
            return response;
          }
          
          // Fetch from network and cache
          return fetch(event.request).then(networkResponse => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
    return;
  }

  // For other requests, use network-first strategy
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Cache successful responses
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Fallback to cache
        return caches.match(event.request);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
}); 