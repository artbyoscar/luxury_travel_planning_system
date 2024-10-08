// src/components/MapView.tsx

import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface Location {
  lat: number;
  lng: number;
  name: string;
}

const MapView: React.FC<{ locations: Location[] }> = ({ locations }) => {
  if (locations.length === 0) return <div>No locations available</div>;

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={{ lat: locations[0].lat, lng: locations[0].lng }}
        zoom={10}
      >
        {locations.map((location, index) => (
          <Marker key={index} position={{ lat: location.lat, lng: location.lng }} title={location.name} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapView;