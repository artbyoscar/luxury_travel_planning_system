// src/components/PastItineraries.tsx
import React from 'react';

const PastItineraries: React.FC<{ trips: any[] }> = ({ trips }) => (
  <div>
    <h3>Past Itineraries</h3>
    {trips.map(trip => (
      <div key={trip.id}>
        <p>{trip.destination}</p>
        <p>{trip.startDate} - {trip.endDate}</p>
      </div>
    ))}
  </div>
);

export default PastItineraries;