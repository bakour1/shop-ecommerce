import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyAekMfMJ669UaoX_uZUySgNlrs27LaL65w",
  authDomain: "eshop-bb87a.firebaseapp.com",
  projectId: "eshop-bb87a",
  storageBucket: "eshop-bb87a.appspot.com",
  messagingSenderId: "974470100385",
  appId: "1:974470100385:web:2255bb66b979a94ef987e0"
};

// Initialize Firebase
const app = initializeApp( firebaseConfig );

export const auth = getAuth( app );
export const db = getFirestore( app );
export const storage = getStorage( app );

export default app;
