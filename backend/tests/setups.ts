import * as admin from 'firebase-admin';

const testServiceAccount = require('../path/to/test-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(testServiceAccount),
  databaseURL: "https://your-test-project.firebaseio.com"
});