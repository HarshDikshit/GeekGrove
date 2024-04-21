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
  apiKey: "AIzaSyCL9gSGS1MiPoekWcUkjMADEJpowJuwnJs" ,
  authDomain: "ece-ie-42c52.firebaseapp.com",
  projectId: "ece-ie",
  storageBucket: "ece-ie.appspot.com",
  messagingSenderId: "445021713873",
  appId: "1:445021713873:web:b3cd852d158aa67f5b1cf0",
  
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app