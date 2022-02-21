import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth, signInAnonymously } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyByW52i1dLoWm2DLgclrv60ONR44HeUz_E",
  authDomain: "ocproject-hrnet.firebaseapp.com",
  databaseURL: "https://ocproject-hrnet-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ocproject-hrnet",
  storageBucket: "ocproject-hrnet.appspot.com",
  messagingSenderId: "185706432352",
  appId: "1:185706432352:web:1c31da643e086412478005"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
signInAnonymously(auth)
  .then(() => {
    return true
  })
  .catch((error) => {
    console.error("Authentication failled", error)
  });

export const firestoreDb = getFirestore(app) 