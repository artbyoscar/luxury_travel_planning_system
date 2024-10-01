// src/services/database.ts
import admin from '../config/firebase';

const db = admin.database();

export const saveUserPreferences = async (userId: string, preferences: any) => {
  await db.ref(`users/${userId}/preferences`).set(preferences);
};

export const getUserPreferences = async (userId: string) => {
  const snapshot = await db.ref(`users/${userId}/preferences`).once('value');
  return snapshot.val();
};