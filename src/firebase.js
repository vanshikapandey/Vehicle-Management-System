import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6ZBjYm-QMZjyf_AG3KUhGnSD3K95aA7k",
  authDomain: "car-portal-34029.firebaseapp.com",
  projectId: "car-portal-34029",
  storageBucket: "car-portal-34029.appspot.com",
  messagingSenderId: "79363721672",
  appId: "1:79363721672:web:9cf9c8df0d31e012b298fd",
  measurementId: "G-BG5R711GKV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
