// Import firebase packages and functions
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, limit, query, where } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQRGWEEY1twtRmcc1muxWswINNLsSpbZw",
  authDomain: "calendar-website-ca638.firebaseapp.com",
  projectId: "calendar-website-ca638",
  storageBucket: "calendar-website-ca638.appspot.com",
  messagingSenderId: "870203241487",
  appId: "1:870203241487:web:d83133e8856dd10ead1f7a",
  measurementId: "G-WF5ENB2PQT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Auth
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
// Initialize Firebase Firestore
export const firestore = getFirestore(app);

// Helper functions
export async function getUserWithUsername(username) {
  const queryRef = query(
    collection(firestore, 'users'),
    limit(1),
    where('username', "==", username)
  );
  const userDoc = (await getDocs(queryRef)).docs[0];
  return userDoc;
}