// src/frontend/components/Itinerary.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Activity {
  name: string;
  description: string;
}

const Itinerary: React.FC = () => {
  const [itinerary, setItinerary] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const response = await axios.get('/api/users/itinerary', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setItinerary(response.data.itinerary);
      } catch (error) {
        console.error('Failed to fetch itinerary', error);
      }
    };
    fetchItinerary();
  }, []);

  return (
    <div>
      <h2>Your Itinerary</h2>
      {itinerary.map((activity, index) => (
        <div key={index}>
          <h3>{activity.name}</h3>
          <p>{activity.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Itinerary;