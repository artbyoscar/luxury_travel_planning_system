import React from 'react';
import Dashboard from '../../Dashboard';

describe('<Dashboard />', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/trips', { fixture: 'trips.json' }).as('getTrips');
  });

  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Dashboard />);
  });
});