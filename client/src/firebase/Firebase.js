
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBdC7vmzp5NMA4Yr1gIxYqzWj2U0KDRMD0",
  authDomain: "naijacakes-416fe.firebaseapp.com",
  projectId: "naijacakes-416fe",
  storageBucket: "naijacakes-416fe.firebasestorage.app",
  messagingSenderId: "27207371542",
  appId: "1:27207371542:web:6e7e6e7de5be72684a5e37",
  measurementId: "G-2SQ18VPJ9X"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); 