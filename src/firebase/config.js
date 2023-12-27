// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCI6aNXqDAQWXbw2UB4Pe7BWPMTcMPRwDk",
  authDomain: "react-journalapp-93e11.firebaseapp.com",
  projectId: "react-journalapp-93e11",
  storageBucket: "react-journalapp-93e11.appspot.com",
  messagingSenderId: "671437169329",
  appId: "1:671437169329:web:d0c9e57295715cdc467890"
};

// Initialize Firebase
export const FirebaseApp  = initializeApp( firebaseConfig );
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp );