import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../../Login';

describe('<Login />', () => {
  it('renders', () => {
    // Wrap the component with MemoryRouter
    cy.mount(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
  });
});