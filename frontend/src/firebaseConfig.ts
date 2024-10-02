//frontend/src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDlgw_1pSa0YbfsNRNDcG6IhS7QZ3NgMqY",
  authDomain: "luxurytravelplanningsystem.firebaseapp.com",
  projectId: "luxurytravelplanningsystem",
  storageBucket: "luxurytravelplanningsystem.appspot.com",
  messagingSenderId: "106801283144",
  appId: "1:106801283144:web:8a5a84fef8119b0ff7187d",
  measurementId: "G-EQM5PW6Q44"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };