// config.js — Firebase (CDN) + export db (READY)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// Project: allamtechnoapp (old settings)
window.AT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyCJdGS3ZQ4-ZWsR-_m_B45uifzVKP3kXFY",
  authDomain: "allamtechnoapp.firebaseapp.com",
  projectId: "allamtechnoapp",
  storageBucket: "allamtechnoapp.appspot.com",
  messagingSenderId: "213007674911",
  appId: "1:213007674911:web:27caf05761648b82876f2a",
  measurementId: "G-TZ0BESHYE0"
};

const app = initializeApp(window.AT_FIREBASE_CONFIG);
export const db = getFirestore(app);
