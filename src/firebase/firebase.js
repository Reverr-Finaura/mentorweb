import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  getDocs,
  collection,
  updateDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app);

export { app, auth, db, analytics };

export const getMentorClients = async () => {
  try {
    let clients = [];
    await (
      await getDocs(
        collection(db, `Messages/jatin.dsquare@gmail.com/YourClients`)
      )
    ).forEach((doc) => {
      clients.push({ ...doc.data() });
    });
    return clients;
  } catch (err) {
    console.log("Err: ", err);
  }
};

export const updateMsgsInDatabase = async (uid, updatedData) => {
  try {
    return await updateDoc(
      doc(db, `Messages/jatin.dsquare@gmail.com/YourClients`, `${uid}`),
      updatedData
    );
  } catch (err) {
    console.log("Err: ", err);
  }
};
