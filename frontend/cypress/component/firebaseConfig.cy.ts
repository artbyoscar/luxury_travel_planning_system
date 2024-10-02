// cypress/component/firebaseConfig.cy.ts

describe('Firebase Config Test', () => {
    it('should have access to Firebase API Key', () => {
      const apiKey = Cypress.env('REACT_APP_FIREBASE_API_KEY');
      expect(apiKey).to.exist;
    });
  });