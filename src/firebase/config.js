import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"


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

export const db = getDatabase(app)