import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import authActions from "./Redux/reducers/auth/actions";
import { store } from "./Redux/store/configureStore";

const firebaseConfig = {
  apiKey: "AIzaSyDqH08yiOS38sgbVMGCVf-nyQP9-D88hKo",
  authDomain: "direct-expertise-56038.firebaseapp.com",
  projectId: "direct-expertise-56038",
  storageBucket: "direct-expertise-56038.appspot.com",
  messagingSenderId: "232985582305",
  appId: "1:232985582305:web:c6ac37e2ca547365e635a0",
  measurementId: "G-WGTDHDNNZ2"
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const askForPermissionToReceiveNotifications = () => {
  return getToken(messaging, {vapidKey: 'BJ28czxUHXBHuPldrlYyJFXswPydeZdeOXhjHVYU4s9t7Gab1d-pxXVppr9EhFJWDwJst5Cs0TqCqMG3p0CDk2k'}).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      store.dispatch(authActions.setUserUUID(currentToken));
    } else {
      console.log('No registration token available. Request permission to generate one.');
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
  });
}

export function onMessageListener() {
  return new Promise((resolve, reject) => {
    onMessage(messaging, (payload) => {
      const notiData = payload?.notification;
      store.dispatch(authActions.setNotiData(notiData));
      store.dispatch(authActions.displayNotificationPopUp(true));
      setTimeout(() => {
        store.dispatch(authActions.displayNotificationPopUp(false));
      }, 5000);
    });
  });
}
