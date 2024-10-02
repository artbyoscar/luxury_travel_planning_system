// frontend/src/firebaseConfig.ts

import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Helper function to get environment variable
const getEnvVariable = (key) => {
  if (typeof process !== 'undefined' && process.env[key]) {
    return process.env[key];
  } else if (typeof Cypress !== 'undefined') {
    return Cypress.env(key);
  }
  return undefined;
};

// Firebase configuration using the helper function
const firebaseConfig = {
  apiKey: getEnvVariable('REACT_APP_FIREBASE_API_KEY'),
  authDomain: getEnvVariable('REACT_APP_FIREBASE_AUTH_DOMAIN'),
  projectId: getEnvVariable('REACT_APP_FIREBASE_PROJECT_ID'),
  storageBucket: getEnvVariable('REACT_APP_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getEnvVariable('REACT_APP_FIREBASE_MESSAGING_SENDER_ID'),
  appId: getEnvVariable('REACT_APP_FIREBASE_APP_ID'),
  measurementId: getEnvVariable('REACT_APP_FIREBASE_MEASUREMENT_ID')
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
let analytics;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});
const db = getFirestore(app); // Firestore
const auth = getAuth(app);     // Authentication

export { app, analytics, db, auth };