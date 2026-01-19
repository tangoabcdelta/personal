

// `window.caches` is a read-only property of the Window interface
// Returns the CacheStorage object associated with the current context
// This object enables functionality such as storing assets for offline use
// Also for generating custom responses to requests.

// Note: This feature is available only in secure contexts (HTTPS),
// in some or all supporting browsers.


(async () => {
    let c = await window.caches.open("v1").then((cache) => cache);
    console.log('c', c);
    console.log('c.add', c.add);
    console.log('c.addAll', c.addAll);
    console.log('c.delete', c.delete);
    console.log('c.keys', c.keys);
    console.log('c.match', c.match);
    console.log('c.matchAll', c.matchAll);
    console.log('c.put', c.put);
    console.log(`c.match`, await c.match("/list"));
})();