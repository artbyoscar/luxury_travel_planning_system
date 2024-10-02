import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import DestinationSuggestions from '../../DestinationSuggestions';

describe('<DestinationSuggestions />', () => {
  it('renders', () => {
    // Wrap the component with MemoryRouter if it uses routing
    cy.mount(
      <MemoryRouter>
        <DestinationSuggestions />
      </MemoryRouter>
    );
  });
});