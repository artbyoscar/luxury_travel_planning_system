import * as fs from 'fs';
import admin from 'firebase-admin';

const serviceAccount = JSON.parse(
  fs.readFileSync(process.env.FIREBASE_PRIVATE_KEY_PATH, 'utf8')
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default admin;