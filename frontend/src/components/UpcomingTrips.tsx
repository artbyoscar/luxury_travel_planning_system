// src/components/UpcomingTrips.tsx
import React from 'react';

const UpcomingTrips: React.FC<{ trips: any[] }> = ({ trips }) => (
  <div>
    <h3>Upcoming Trips</h3>
    {trips.map(trip => (
      <div key={trip.id}>
        <p>{trip.destination}</p>
        <p>{trip.startDate} - {trip.endDate}</p>
      </div>
    ))}
  </div>
);

export default UpcomingTrips;