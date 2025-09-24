import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBaWpBcksK9g7x0TS_sP7LQYDfIPMm_Zzo",
    authDomain: "shopping-list-56380.firebaseapp.com",
    databaseURL: "https://shopping-list-56380-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "shopping-list-56380",
    storageBucket: "shopping-list-56380.firebasestorage.app",
    messagingSenderId: "7678194342",
    appId: "1:7678194342:web:2291957afcd9aefccc3a67",
    measurementId: "G-QFRY2ZJ916"
};

export const app = initializeApp(firebaseConfig);