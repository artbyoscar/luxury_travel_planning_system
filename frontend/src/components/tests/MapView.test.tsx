// src/components/MapView.test.tsx

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MapView from './MapView';

describe('MapView Component', () => {
  it('renders no locations message when there are no locations', () => {
    const { getByText } = render(<MapView locations={[]} />);
    expect(getByText(/no locations available/i)).toBeInTheDocument();
  });

  it('renders map with markers when locations are provided', () => {
    const locations = [
      { lat: 48.8566, lng: 2.3522, name: 'Paris' },
      { lat: 40.7128, lng: -74.0060, name: 'New York' },
    ];

    const { getByTitle } = render(<MapView locations={locations} />);
    
    expect(getByTitle(/paris/i)).toBeInTheDocument();
    expect(getByTitle(/new york/i)).toBeInTheDocument();
  });
});