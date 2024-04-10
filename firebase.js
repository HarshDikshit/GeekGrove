// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getStorage} from 'firebase/storage'
import {getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjCNxq4tJyg82098MZo74o0bGWn066Xvo",
  authDomain: "iert-7f55e.firebaseapp.com",
  projectId: "iert-7f55e",
  storageBucket: "iert-7f55e.appspot.com",
  messagingSenderId: "371921895175",
  appId: "1:371921895175:web:0dfe2853083521e6200fa2",
  measurementId: "G-Y87P7MZTGY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app