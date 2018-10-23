function noti(){
  Notification.requestPermission().then(result =>{
      console.log(result);
    }).then(sendNotification =>{
    if (Notification.permission == 'granted') {
        navigator.serviceWorker.getRegistration().then(reg =>{
          var options = {
            body: 'Here is a notification body!',
            icon: './resources/img/Ted.jpg',
            vibrate: [200, 50, 100],
            data: {
              dateOfArrival: Date.now(),
              primaryKey: 10
            }
          }
         
        });
      }
  });

}

let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
});



window.addEventListener('appinstalled', (evt) => {
  app.logEvent('a2hs', 'installed');
});
