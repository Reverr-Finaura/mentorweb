import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  getDocs,
  collection,
  updateDoc,
  doc,
  query,
  where,
  getDoc,
  addDoc,
  setDoc,
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

export const getUserFromDatabase = async (email) => {
  let User;
  await (
    await getDocs(
      query(collection(db, `Users`), where("email", "==", `${email}`))
    )
  ).forEach((doc) => {
    User = { ...doc.data() };
  });
  return User;
};

export const getMentorClientsMsgs = async () => {
  try {
    let clients = [];
    await (
      await getDocs(
        collection(db, `Messages/jatin.dsquare@gmail.com/YourClients`)
      )
    ).forEach((doc) => {
      clients.push({ ...doc.data(), email: doc.id });
    });
    return clients;
  } catch (err) {
    console.log("Err: ", err);
  }
};

// export const getMentorClientsDatabase = async (email) => {
//   try {
//     const result = await getDoc(
//       doc(db, `Messages/jatin.dsquare@gmail.com/YourClients`, `${email}`)
//     );
//     return result.data();
//   } catch (err) {
//     console.log("Err: ", err);
//   }
// };

export const addMsgsInDatabase = async (email, data) => {
  try {
    return await setDoc(
      doc(db, `Messages/jatin.dsquare@gmail.com/YourClients`, `${email}`),
      data
    );
  } catch (err) {
    console.log("Err: ", err);
  }
};

export const updateMsgsInDatabase = async (email, updatedData) => {
  try {
    return await updateDoc(
      doc(db, `Messages/jatin.dsquare@gmail.com/YourClients`, `${email}`),
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
