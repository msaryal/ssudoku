const CACHE = 'network-or-cache-v1';
const timeout = 400;

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(CACHE)
            .then((cache) => cache.addAll([
                '/ssudoku/',
                '/ssudoku/index.php',
                '/ssudoku/file.txt',
                '/ssudoku/assets/ico/favicon-96x96.png',
                '/ssudoku/assets/ico/favicon.svg',
                '/ssudoku/assets/ico/favicon.ico',
                '/ssudoku/assets/ico/apple-touch-icon.png',
                '/ssudoku/assets/ico/site.webmanifest',
                '/ssudoku/assets/css/style.css',
                '/ssudoku/assets/js/script.js',
                'https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap'
            ])
        ));
});

self.addEventListener('fetch', (event) => {
    event.respondWith(fromNetwork(event.request, timeout)
      .catch((err) => {
          console.log(`Error: ${err.message()}`);
          return fromCache(event.request);
      }));
});

function fromNetwork(request, timeout)
{
    return new Promise((fulfill, reject) => {
        var timeoutId = setTimeout(reject, timeout);
        fetch(request).then((response) => {
            clearTimeout(timeoutId);
            fulfill(response);
        }, reject);
    });
}

function fromCache(request)
{
    return caches.open(CACHE).then((cache) =>
        cache.match(request).then((matching) =>
            matching || Promise.reject('no-match')
        ));
}