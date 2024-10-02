import React from 'react';
import MapView from '../../MapView';

describe('<MapView />', () => {
  it('renders', () => {
    const mockLocations = [
      { lat: 40.7128, lng: -74.0060, name: 'New York' },
      { lat: 34.0522, lng: -118.2437, name: 'Los Angeles' }
    ];

    cy.mount(<MapView locations={mockLocations} />);
  });
});