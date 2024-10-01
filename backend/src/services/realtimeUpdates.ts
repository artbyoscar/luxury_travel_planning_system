// src/services/realtimeUpdates.ts
import admin from '../config/firebase';

const db = admin.database();

export const subscribeToTripUpdates = (userId: string, callback: (data: any) => void) => {
  const tripRef = db.ref(`users/${userId}/currentTrip`);
  tripRef.on('value', (snapshot) => {
    callback(snapshot.val());
  });

  return () => tripRef.off();
};

export const updateTripStatus = async (userId: string, status: string) => {
  await db.ref(`users/${userId}/currentTrip/status`).set(status);
};

// Use in frontend component
import React, { useEffect, useState } from 'react';
import { subscribeToTripUpdates } from '../services/realtimeUpdates';

const TripStatus: React.FC<{ userId: string }> = ({ userId }) => {
  const [status, setStatus] = useState('');

  useEffect(() => {
    const unsubscribe = subscribeToTripUpdates(userId, (data) => {
      if (data && data.status) {
        setStatus(data.status);
      }
    });

    return () => unsubscribe();
  }, [userId]);

  return <div>Current Trip Status: {status}</div>;
};

export default TripStatus;