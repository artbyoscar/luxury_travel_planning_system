import React, { useState, useEffect } from 'react';
import { firestore } from '../firebaseConfig'; // Ensure this path is correct

interface Destination {
  name: string;
  description: string;
  bestTimeToVisit: string;
  activities: string[];
}

const DestinationSuggestions: React.FC = () => {
  const [suggestions, setSuggestions] = useState<Destination[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<string>('');
  const [lengthOfStay, setLengthOfStay] = useState<number>(3);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const snapshot = await firestore.collection('Destinations').get();
        const destinations = snapshot.docs.map(doc => doc.data() as Destination);
        setSuggestions(destinations);
      } catch (error) {
        console.error('Failed to fetch suggestions', error);
      }
    };
    fetchSuggestions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Assuming there's a backend endpoint to handle itinerary creation
      await fetch('/api/users/create-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({
          destination: selectedDestination,
          lengthOfStay
        })
      });
      window.location.href = '/itinerary';
    } catch (error) {
      console.error('Failed to create itinerary', error);
    }
  };

  return (
    <div>
      <h2>Suggested Destinations</h2>
      {suggestions.map(destination => (
        <div key={destination.name}>
          <h3>{destination.name}</h3>
          <p>{destination.description}</p>
          <p><strong>Best Time to Visit:</strong> {destination.bestTimeToVisit}</p>
          <button onClick={() => setSelectedDestination(destination.name)}>
            Select
          </button>
        </div>
      ))}
      {selectedDestination && (
        <form onSubmit={handleSubmit}>
          <h3>Plan Your Trip to {selectedDestination}</h3>
          <label>
            Length of Stay:
            <input
              type="number"
              value={lengthOfStay}
              onChange={(e) => setLengthOfStay(parseInt(e.target.value))}
              min={1}
              max={14}
            />
          </label>
          <button type="submit">Create Itinerary</button>
        </form>
      )}
    </div>
  );
};

export default DestinationSuggestions;