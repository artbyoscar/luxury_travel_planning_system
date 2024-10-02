import React from 'react';
import PastItineraries from '../../PastItineraries';

describe('<PastItineraries />', () => {
  it('renders', () => {
    const mockTrips = [
      { id: '1', destination: 'Paris', startDate: '2023-01-01', endDate: '2023-01-10' },
      { id: '2', destination: 'New York', startDate: '2023-02-15', endDate: '2023-02-20' }
    ];

    // Pass mock data to the component
    cy.mount(<PastItineraries trips={mockTrips} />);
  });
});