self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('notificationclick', function(event) {
  const action = event.action;
  const tag = event.notification.tag;
  const itemId = parseInt(tag.replace('item-', ''), 10);
  const itemName = event.notification.data ? event.notification.data.item : '';

  event.notification.close();

  const price = (event.reply || '').trim();

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(list) {
      for (const client of list) {
        client.postMessage({ type: 'PRICE_REPLY', itemId: itemId, item: itemName, price: price });
      }
    })
  );
});
