// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCaHQdJavD8fvIZLkwiIRsURowES-hrCi4",
    authDomain: "osoitekirja-aa26d.firebaseapp.com",
    databaseURL: "https://osoitekirja-aa26d-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "osoitekirja-aa26d",
    storageBucket: "osoitekirja-aa26d.firebasestorage.app",
    messagingSenderId: "892221465803",
    appId: "1:892221465803:web:725a64d1b546a59fc4a74e",
    measurementId: "G-WNE8JSRQJV"
};

export const app = initializeApp(firebaseConfig);