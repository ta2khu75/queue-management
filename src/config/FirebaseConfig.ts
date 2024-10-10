// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBk55SR8cnsItSkEuT-074mpn2Xnqu-QEU",
    authDomain: "queue-management-b8d91.firebaseapp.com",
    projectId: "queue-management-b8d91",
    storageBucket: "queue-management-b8d91.appspot.com",
    messagingSenderId: "893754412590",
    appId: "1:893754412590:web:72ee1afaf95222849ad9bf",
    measurementId: "G-QNYZ7Q33FM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);