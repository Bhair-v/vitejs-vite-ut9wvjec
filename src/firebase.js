import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your exact Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWglxCYadaKY-P_pXzRPhODjS4_iWGRac",
  authDomain: "forgerx.firebaseapp.com",
  databaseURL: "https://forgerx-default-rtdb.firebaseio.com",
  projectId: "forgerx",
  storageBucket: "forgerx.firebasestorage.app",
  messagingSenderId: "103614433110",
  appId: "1:103614433110:web:e238f6343fb36f9f6b78f7",
  measurementId: "G-QMRQ26Q2MY"
};

// Initialize Firebase and the Firestore Database
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);