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
  apiKey: "AIzaSyAZ0dnrq_E5t9ubAbjj7geaXxeQjXrAg80",
  authDomain: "my-culture-log.firebaseapp.com",
  projectId: "my-culture-log",
  storageBucket: "my-culture-log.appspot.com",
  messagingSenderId: "609302700466",
  appId: "1:609302700466:web:98a5bea53240ed26a7c4ab",
};

// const app = initializeApp(firebaseConfig);
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };
