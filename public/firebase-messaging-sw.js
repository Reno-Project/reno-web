importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js');

var firebaseConfig = {
  apiKey: "AIzaSyDqH08yiOS38sgbVMGCVf-nyQP9-D88hKo",
  authDomain: "direct-expertise-56038.firebaseapp.com",
  projectId: "direct-expertise-56038",
  storageBucket: "direct-expertise-56038.appspot.com",
  messagingSenderId: "232985582305",
  appId: "1:232985582305:web:c6ac37e2ca547365e635a0",
  measurementId: "G-WGTDHDNNZ2"
};

firebase.initializeApp(firebaseConfig);

if (firebase.messaging.isSupported()) {
	const messaging = firebase.messaging();

	messaging.onBackgroundMessage(function(payload) {
		console.log('Received background message ', payload);

		const notificationTitle = payload.notification.title;
		const notificationOptions = {
			body: payload.notification.body,
		};

		self.registration.showNotification(
			notificationTitle,
			notificationOptions
		);
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