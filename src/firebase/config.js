import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔻 PASTE your firebaseConfig object here (from Firebase console → Project settings → Your apps)
const firebaseConfig = {
  apiKey: "AIzaSyDk0g7ImUykx5-NR-0eokd9kIWxws68yi8",
  authDomain: "buisness-plan-generator.firebaseapp.com",
  projectId: "buisness-plan-generator",
  storageBucket: "buisness-plan-generator.firebasestorage.app",
  messagingSenderId: "1019525437142",
  appId: "1:1019525437142:web:9d0bdec794ac1ab221db77",
  measurementId: "G-GYXCNN1E6X"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);