// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDAqxz1H4sLAf5JW7KicI8y4lq5ezqyWh0",
    authDomain: "fir-ae89c.firebaseapp.com",
    projectId: "fir-ae89c",
    storageBucket: "fir-ae89c.appspot.com",
    messagingSenderId: "370872564943",
    appId: "1:370872564943:web:ccab9ea20e40cce6d6cbba",
    measurementId: "G-4DWBCWGE6K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const firebaseDatabase = getFirestore(app);
export const storage = getStorage(app);