// src/components/Dashboard.tsx

import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import UpcomingTrips from './UpcomingTrips';
import PastItineraries from './PastItineraries';
import UserPreferences from './UserPreferences';

interface Trip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
}

const Dashboard: React.FC = () => {
  const [upcomingTrips, setUpcomingTrips] = useState<Trip[]>([]);
  const [pastItineraries, setPastItineraries] = useState<Trip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'trips'));
        const tripsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Trip[];
        
        // Assuming current date logic to separate upcoming and past trips
        const currentDate = new Date();
        setUpcomingTrips(tripsData.filter(trip => new Date(trip.startDate) >= currentDate));
        setPastItineraries(tripsData.filter(trip => new Date(trip.endDate) < currentDate));
      } catch (err) {
        setError('Failed to fetch trips');
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Your Dashboard</h2>
      <UpcomingTrips trips={upcomingTrips} />
      <PastItineraries trips={pastItineraries} />
      <UserPreferences />
    </div>
  );
};

export default Dashboard;