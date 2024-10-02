// frontend/src/components/Itinerary.tsx
import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

interface ItineraryItem {
  name: string;
  description: string;
  activities: string[];
  startDate: string;
  endDate: string;
  totalBudget: number;
}

const Itinerary: React.FC = () => {
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([]);

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const user = auth.currentUser;
        if (!user) throw new Error('User not authenticated');

        const q = query(collection(db, 'Itineraries'), where('userId', '==', user.uid));
        const snapshot = await getDocs(q);
        const itineraries: ItineraryItem[] = snapshot.docs.map(doc => doc.data() as ItineraryItem);
        setItinerary(itineraries);
      } catch (error) {
        console.error('Failed to fetch itinerary', error);
      }
    };
    fetchItinerary();
  }, []);

  return (
    <div>
      <h2>Your Itinerary</h2>
      {itinerary.length === 0 ? (
        <p>No itineraries found.</p>
      ) : (
        itinerary.map((item, index) => (
          <div key={index}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p><strong>Activities:</strong> {item.activities.join(', ')}</p>
            <p><strong>Start Date:</strong> {new Date(item.startDate).toLocaleDateString()}</p>
            <p><strong>End Date:</strong> {new Date(item.endDate).toLocaleDateString()}</p>
            <p><strong>Total Budget:</strong> ${item.totalBudget}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Itinerary;