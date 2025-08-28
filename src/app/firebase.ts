// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKmHJTJlqDDnpuRe5N5l8EvYbBKgR4wAQ",
  authDomain: "my-time-12108.firebaseapp.com",
  projectId: "my-time-12108",
  storageBucket: "my-time-12108.firebasestorage.app",
  messagingSenderId: "981407844970",
  appId: "1:981407844970:web:c838edcc146620c1db5813",
  measurementId: "G-F59GB17X51",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);
