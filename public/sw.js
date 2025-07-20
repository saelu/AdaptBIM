const CACHE_NAME = 'adaptbim-v1';
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
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
}); 