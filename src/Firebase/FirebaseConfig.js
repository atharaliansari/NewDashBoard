// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsK6FVJOPf30_GvEgyhwVkt3F-L16wl5Q",
  authDomain: "newdashbord-45957.firebaseapp.com",
  projectId: "newdashbord-45957",
  storageBucket: "newdashbord-45957.firebasestorage.app",
  messagingSenderId: "277142361541",
  appId: "1:277142361541:web:3b22a1a7467e4453a167ac",
  measurementId: "G-XGDS90SW39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;