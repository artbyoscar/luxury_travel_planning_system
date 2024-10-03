// cypress/integration/dashboard.spec.js

describe('Dashboard User Flow', () => {
    beforeEach(() => {
      cy.visit('/dashboard'); // Adjust the path based on your routing setup
    });
  
    it('displays loading initially and then shows trips', () => {
      cy.contains('Loading...').should('be.visible');
      
      // Mock API response if needed
      cy.intercept('GET', '**/trips', { fixture: 'trips.json' }).as('getTrips');
  
      cy.wait('@getTrips');
      cy.contains('Paris').should('be.visible');
      cy.contains('New York').should('be.visible');
    });
  
    it('handles no trips gracefully', () => {
      cy.intercept('GET', '**/trips', { fixture: 'emptyTrips.json' }).as('getEmptyTrips');
  
      cy.wait('@getEmptyTrips');
      cy.contains('No trips available').should('be.visible');
    });
  
    it('navigates to trip details when a trip is clicked', () => {
      cy.contains('Paris').click();
      cy.url().should('include', '/trips/1'); // Adjust based on your routing logic
      cy.contains('Trip Details for Paris').should('be.visible');
    });
  });