// src/frontend/components/DestinationSuggestions.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

interface Destination {
  name: string;
  description: string;
}

const DestinationSuggestions: React.FC = () => {
  const [suggestions, setSuggestions] = useState<Destination[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<string>('');
  const [lengthOfStay, setLengthOfStay] = useState<number>(3);
  const history = useHistory();

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await axios.get('/api/users/suggest-destinations', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setSuggestions(response.data.suggestions);
      } catch (error) {
        console.error('Failed to fetch suggestions', error);
      }
    };
    fetchSuggestions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/users/create-itinerary', {
        destination: selectedDestination,
        lengthOfStay
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      history.push('/itinerary');
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