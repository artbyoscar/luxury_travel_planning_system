// src/components/Dashboard.tsx

import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import UpcomingTrips from './UpcomingTrips';
import PastItineraries from './PastItineraries';
import UserPreferences from './UserPreferences';

const Dashboard: React.FC = () => {
  const [trips, setTrips] = useState([]);
  
  useEffect(() => {
    const fetchTrips = async () => {
      const querySnapshot = await getDocs(collection(db, 'trips'));
      setTrips(querySnapshot.docs.map(doc => doc.data()));
    };
    fetchTrips();
  }, []);
  
  return (
    <div>
      <h2>Your Dashboard</h2>
      <UpcomingTrips trips={trips} />
      <PastItineraries trips={trips} />
      <UserPreferences />
    </div>
  );
};

export default Dashboard;