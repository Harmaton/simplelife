// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAJ6jfv-Xk3iFHfc-_DTmsXRsohWCgIjA",
  authDomain: "simplelife-1b9cb.firebaseapp.com",
  projectId: "simplelife-1b9cb",
  storageBucket: "simplelife-1b9cb.appspot.com",
  messagingSenderId: "379169590325",
  appId: "1:379169590325:web:1d6945f056006aed27757c",
  measurementId: "G-WYQWW3255T"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
export const auth = getAuth(app);
// export const db = getFirestore(app)
auth.useDeviceLanguage()