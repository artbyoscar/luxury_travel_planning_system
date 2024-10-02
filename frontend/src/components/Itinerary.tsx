import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
        const response = await axios.get('/api/users/itinerary', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setItinerary(response.data.itineraries);
      } catch (error) {
        console.error('Failed to fetch itinerary', error);
      }
    };
    fetchItinerary();
  }, []);

  return (
    <div>
      <h2>Your Itinerary</h2>
      {itinerary.map((item, index) => (
        <div key={index}>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <p><strong>Activities:</strong> {item.activities.join(', ')}</p>
          <p><strong>Start Date:</strong> {new Date(item.startDate).toLocaleDateString()}</p>
          <p><strong>End Date:</strong> {new Date(item.endDate).toLocaleDateString()}</p>
          <p><strong>Total Budget:</strong> ${item.totalBudget}</p>
        </div>
      ))}
    </div>
  );
};

export default Itinerary;