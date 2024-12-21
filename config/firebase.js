// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBFtK7h3dWZ8lOZa8Lx8UhVAm5p58KI-zg",
    authDomain: "monitoring-c1e7f.firebaseapp.com", 
    projectId: "monitoring-c1e7f",
    storageBucket: "monitoring-c1e7f.firebasestorage.app",
    messagingSenderId: "72627672786",
    appId: "1:72627672786:web:e2c4335999ceb863cd7f0b",
    measurementId: "G-T6WY9CQR9F"
};

// Initialize Firebase
const Firebaseapp = initializeApp(firebaseConfig);
const Firestore_DB = getFirestore(Firebaseapp);
export {Firebaseapp, Firestore_DB};

