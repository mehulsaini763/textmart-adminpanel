// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsUQ8TCktlf3dc2gOzE0UMwv9C-CQ8z1o",
  authDomain: "texmart-6c58f.firebaseapp.com",
  projectId: "texmart-6c58f",
  storageBucket: "texmart-6c58f.appspot.com",
  messagingSenderId: "640057281829",
  appId: "1:640057281829:web:d2143bfec850e7e9f4decc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app) 
