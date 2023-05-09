importScripts(
  "https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyDeJrr2C4h4tIh7Hj0L4-qa1QwRBTfyHXM",
  authDomain: "reno-home.firebaseapp.com",
  projectId: "reno-home",
  storageBucket: "reno-home.appspot.com",
  messagingSenderId: "271291217173",
  appId: "1:271291217173:web:7a4260dcb3527e5869651c",
  measurementId: "G-FL6WQC501W",
};

firebase.initializeApp(firebaseConfig);

if (firebase.messaging.isSupported()) {
  const messaging = firebase.messaging();

  messaging.onBackgroundMessage(function (payload) {
    console.log("Received background message ", payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
}

this.addEventListener("fetch", (event) => {
  if (!navigator.onLine) {
    event.waitUntil(
      this.registration.showNotification("Internet", {
        body: "Internet not working",
      })
    );
    event.respondWith(
      caches.match(event.request).then((resp) => {
        if (resp) {
          return resp;
        }
        let requestUrl = event.request.clone();
        fetch(requestUrl);
      })
    );
  }
});
