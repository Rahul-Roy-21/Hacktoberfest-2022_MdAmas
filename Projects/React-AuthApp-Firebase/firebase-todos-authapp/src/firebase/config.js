// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
export const getFirebaseAuth = (firebaseConfig) => {
  const app = initializeApp(firebaseConfig);
  return getAuth(app);
};

export const getDBRef = (firebaseConfig) => {
  const app = initializeApp(firebaseConfig);
  return getFirestore(app);
};
