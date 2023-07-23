self.addEventListener('push', function(event) {
    const data = event.data.json();
  
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: 'path/to/icon.png',
        // Additional options for notification customization
        // ...
      })
    );
  });
  
  self.addEventListener('notificationclick', function(event) {
    event.notification.close();
  
    // Add custom handling for notification click event
    const clickedNotification = event.notification;
    const notificationData = clickedNotification.data;
  
    // Perform custom logic based on notificationData or open a specific URL
    // ...
  
    // You can also use event.waitUntil() to handle asynchronous operations
    // For example, opening a URL in a new window or tab:
    event.waitUntil(
      clients.openWindow('https://www.google.com')
    );
  });