// src/config/firebase.ts
import admin from 'firebase-admin';
import serviceAccount from './keys/serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
});

export default admin;