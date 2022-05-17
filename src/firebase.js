import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDAeWP79CsYObRp5PG-szL3y4HNvkehGrQ",
    authDomain: "psychoexperiment-692ff.firebaseapp.com",
    projectId: "psychoexperiment-692ff",
    storageBucket: "psychoexperiment-692ff.appspot.com",
    messagingSenderId: "120282025261",
    appId: "1:120282025261:web:1f8f05408e1409895317a4",
    measurementId: "G-Q6FP005K9V"
  };

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);

export default firebaseApp;