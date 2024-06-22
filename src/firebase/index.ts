// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA5tSFPkAyN4RjvcTaCtu-EA5o76pZZYjg",
  authDomain: "sign-language-learning.firebaseapp.com",
  projectId: "sign-language-learning",
  storageBucket: "sign-language-learning.appspot.com",
  messagingSenderId: "746713987134",
  appId: "1:746713987134:web:30950ac0ae4a74e2e6b96f",
  measurementId: "G-RHZ1FHFZWB",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup };
