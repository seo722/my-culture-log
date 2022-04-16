import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: "my-culture-log.appspot.com",
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyCuIc_uEo9IRZOzU2cG9Li8dPrfpoMPzcQ",
  authDomain: "culture-log-d49a4.firebaseapp.com",
  projectId: "culture-log-d49a4",
  storageBucket: "culture-log-d49a4.appspot.com",
  messagingSenderId: "165559206645",
  appId: "1:165559206645:web:ce1dc417b7d23516407bbc",
};

// const app = initializeApp(firebaseConfig);
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };
