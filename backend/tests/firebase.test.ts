import * as admin from 'firebase-admin';

describe('Firebase Tests', () => {
  let db: admin.firestore.Firestore;

  beforeAll(() => {
    db = admin.firestore();
  });

  afterAll(async () => {
    await admin.app().delete();
  });

  test('Can write and read from Firestore', async () => {
    const testDoc = db.collection('test').doc('testDoc');
    await testDoc.set({ foo: 'bar' });
    const snapshot = await testDoc.get();
    expect(snapshot.data()).toEqual({ foo: 'bar' });
  });

  // Add more tests for your specific Firebase functionality
});

test('Can create and authenticate a user', async () => {
    const email = 'test@example.com';
    const password = 'testpassword';
  
    // Create a user
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
    });
  
    expect(userRecord.email).toBe(email);
  
    // Verify the user can sign in
    const signInResult = await admin.auth().getUserByEmail(email);
    expect(signInResult.email).toBe(email);
  
    // Clean up: delete the test user
    await admin.auth().deleteUser(userRecord.uid);
  });

  import { getUserPreferences, saveUserPreferences } from '../src/services/database';

test('Can save and retrieve user preferences', async () => {
  const userId = 'testUser123';
  const preferences = { destinations: ['Paris', 'Tokyo'], travelStyle: 'luxury' };

  await saveUserPreferences(userId, preferences);
  const retrievedPreferences = await getUserPreferences(userId);

  expect(retrievedPreferences).toEqual(preferences);
});