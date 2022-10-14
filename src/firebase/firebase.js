import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  getDocs,
  getDoc,
  collection,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

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
const storage = getStorage(app);
const auth = getAuth();
const db = getFirestore(app);

export { app, auth, db, analytics };

export const getMentorClients = async (email) => {
  try {
    let clients = [];
    await (
      await getDocs(collection(db, `Messages/${email}/YourClients`))
    ).forEach((doc) => {
      clients.push({ ...doc.data() });
    });
    return clients;
  } catch (err) {
    console.log("Err: ", err);
  }
};

export const getUserFromDatabase = async (email) => {
  try {
    let user;
    await (
      await getDocs(
        query(collection(db, "Users"), where("email", "==", `${email}`))
      )
    ).forEach((doc) => {
      user = { ...doc.data() };
    });
    return user;
  } catch (err) {
    console.log(err);
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

export const uploadMedia = async (media, path) => {
  try {
    await uploadBytesResumable(ref(storage, `${path}/${media.name}`), media);
    const getMedia = await ref(storage, `${path}/${media.name}`);
    const mediaLink = await getDownloadURL(getMedia);
    return mediaLink;
  } catch (err) {
    console.log("Err: ", err);
  }
};

export const fetchTransactionsFromDatabase = async (vendorEmail) => {
  try {
    let transactions = [];
    await (
      await getDocs(
        query(
          collection(db, "Payments"),
          where("vendor", "==", `${vendorEmail}`)
        )
      )
    ).forEach((doc) => {
      transactions.push({ ...doc.data() });
    });
    return transactions;
  } catch (err) {
    console.log(err);
  }
};
