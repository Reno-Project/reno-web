import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { isString } from "lodash";
import authActions from "./redux/reducers/auth/actions";
import { store } from "./redux/store/configureStore";
import { getApiData } from "./utils/APIHelper";
import { Setting } from "./utils/Setting";

const firebaseConfig = {
  apiKey: "AIzaSyDeJrr2C4h4tIh7Hj0L4-qa1QwRBTfyHXM",
  authDomain: "reno-home.firebaseapp.com",
  projectId: "reno-home",
  storageBucket: "reno-home.appspot.com",
  messagingSenderId: "271291217173",
  appId: "1:271291217173:web:7a4260dcb3527e5869651c",
  measurementId: "G-FL6WQC501W",
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const askForPermissionToReceiveNotifications = () => {
  return getToken(messaging, {
    vapidKey:
      "BFtqHYNuVLvddxFYwPjx-cFTCYC3K0vC4npL6v1QAKvPaFsd0Lip3rlsJ6oWhMIvdnMW8LBlHBiLpqSTofUHSHI",
  })
    .then((currentToken) => {
      if (currentToken) {
        // console.log("current token for client: ", currentToken);
        const { useruuid, token } = store.getState().auth;
        if (useruuid !== currentToken && isString(token) && token !== "") {
          store.dispatch(authActions.setUserUUID(currentToken));
          updateUUID(currentToken);
        }
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token.", err);
    });
};

async function updateUUID(token) {
  try {
    await getApiData(Setting.endpoints.addFCMToken, "POST", {
      token,
    });
  } catch (error) {
    console.log("🚀 updateUUID ~ error:", error);
  }
}

export function onMessageListener() {
  return new Promise((resolve, reject) => {
    onMessage(messaging, (payload) => {
      const notiData = payload?.notification;
      let metaObj = payload?.data?.meta ? JSON.parse(payload?.data?.meta) : "";
      notiData.type = metaObj?.type || "";
      store.dispatch(authActions.setNotiData(notiData));
      store.dispatch(authActions.displayNotificationPopUp(true));
      setTimeout(() => {
        store.dispatch(authActions.displayNotificationPopUp(false));
      }, 5000);
    });
  });
}
