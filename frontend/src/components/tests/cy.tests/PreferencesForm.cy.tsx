import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import PreferencesForm from '../../PreferencesForm';
import { firebaseAuth, firebaseFirestore } from 'cypress/support/firebaseMocks';



describe('<PreferencesForm />', () => {
  beforeEach(() => {
    // Mock Firebase Auth to return a valid user
    cy.stub(firebaseAuth, 'getAuth').returns({
      currentUser: { uid: 'testUserId' },
    });

    // Mock Firestore's updateDoc function and alias it
    cy.stub(firebaseFirestore, 'updateDoc').as('updateDoc').resolves();

    // Intercept Firebase Auth requests
    cy.intercept('POST', '**/identitytoolkit/v3/relyingparty/verifyPassword', {
      statusCode: 200,
      body: { idToken: 'mock-token', localId: 'mock-uid' }
    });

    // Intercept Firestore update requests
    cy.intercept('PATCH', '**/documents/Users/**', {
      statusCode: 200,
      body: { updateTime: '2022-01-01T00:00:00Z' }  // Mocked response for successful Firestore update
    });
  });

  it('saves preferences successfully', () => {
    // Mount the component within a router context
    cy.mount(
      <MemoryRouter>
        <PreferencesForm />
      </MemoryRouter>
    );

    // Ensure checkboxes are correctly selected
    cy.get('input[type="checkbox"]').first().check(); // beach
    cy.get('input[type="checkbox"]').eq(1).check(); // mountain

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Wait for the updateDoc call and verify it's called with correct data
    cy.get('@updateDoc', { timeout: 10000 }).should(
      'have.been.calledOnceWith',
      Cypress.sinon.match.any, // Document reference can be any value
      { preferences: ['beach', 'mountain'] }
    );

    // Assert that the URL includes the expected navigation path after form submission
    cy.url().should('include', '/suggestions');
  });

  it('handles errors when saving preferences', () => {
    // Mock an error scenario for updateDoc
    cy.stub(firebaseFirestore, 'updateDoc').as('updateDoc').rejects(new Error('Update failed'));

    // Mount the component
    cy.mount(
      <MemoryRouter>
        <PreferencesForm />
      </MemoryRouter>
    );

    // Select preferences and attempt to submit
    cy.get('input[type="checkbox"]').first().check();
    cy.get('button[type="submit"]').click();

    // Assert that the error message is displayed correctly
    cy.contains('Failed to update preferences. Please try again.').should('be.visible');
  });

  it('logs the correct preferences array before update', () => {
    // Add console log to verify the preferences array
    cy.mount(
      <MemoryRouter>
        <PreferencesForm />
      </MemoryRouter>
    );

    // Select checkboxes
    cy.get('input[type="checkbox"]').first().check(); // beach
    cy.get('input[type="checkbox"]').eq(1).check(); // mountain

    // Intercept console log
    cy.window().then((win) => {
      cy.spy(win.console, 'log');
    });

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Verify console log before calling updateDoc
    cy.window().its('console.log').should('be.calledWith', 'Preferences before update:', ['beach', 'mountain']);
  });
});
