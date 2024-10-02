import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import PreferencesForm from '../../PreferencesForm';
import * as firebaseAuth from 'firebase/auth';
import * as firebaseFirestore from 'firebase/firestore';

describe('<PreferencesForm />', () => {
  beforeEach(() => {
    // Mock Firebase Auth
    cy.stub(firebaseAuth, 'getAuth').returns({
      currentUser: { uid: 'testUserId' }
    });

    // Mock Firestore and alias updateDoc
    cy.stub(firebaseFirestore, 'updateDoc').as('updateDoc').resolves();
  });

  it('saves preferences successfully', () => {
    cy.mount(
      <MemoryRouter>
        <PreferencesForm />
      </MemoryRouter>
    );

    // Select some preferences
    cy.get('input[type="checkbox"]').first().check(); // beach
    cy.get('input[type="checkbox"]').eq(1).check(); // mountain

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Assert that updateDoc was called with the correct arguments
    cy.get('@updateDoc').should('have.been.calledOnceWith',
      Cypress.sinon.match.any,
      { preferences: ['beach', 'mountain'] }
    );

    // Check for navigation (you might need to adjust this based on your routing setup)
    cy.url().should('include', '/suggestions');
  });

  it('handles errors when saving preferences', () => {
    // Mock an error in updateDoc
    cy.stub(firebaseFirestore, 'updateDoc').as('updateDoc').rejects(new Error('Update failed'));

    cy.mount(
      <MemoryRouter>
        <PreferencesForm />
      </MemoryRouter>
    );

    cy.get('input[type="checkbox"]').first().check();
    cy.get('button[type="submit"]').click();

    // Assert that an error message is displayed (adjust this based on how you handle errors)
    cy.contains('Failed to update preferences. Please try again.').should('be.visible');
  });
});