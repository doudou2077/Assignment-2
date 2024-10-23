// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBsBSHozCKtkmQnfTfuscRGr2tdcYgVcPQ",
    authDomain: "assignment2-13597.firebaseapp.com",
    projectId: "assignment2-13597",
    storageBucket: "assignment2-13597.appspot.com",
    messagingSenderId: "102475648049",
    appId: "1:102475648049:web:00bf17afbc64ab469d5910",
    measurementId: "G-EBP0JF15Y4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);