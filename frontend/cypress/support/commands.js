// cypress/support/commands.js

Cypress.Commands.add('mockFirestore', () => {
    cy.intercept('POST', '**/google.firestore.v1.Firestore/Listen/**', {
      statusCode: 200,
      body: {
        targetChange: {
          targetIds: [1],
          documents: [
            {
              name: 'projects/project-id/databases/(default)/documents/trips/1',
              fields: {
                destination: { stringValue: 'Paris' },
                startDate: { stringValue: '2024-10-01' },
                endDate: { stringValue: '2024-10-10' }
              }
            },
            {
              name: 'projects/project-id/databases/(default)/documents/trips/2',
              fields: {
                destination: { stringValue: 'New York' },
                startDate: { stringValue: '2024-11-15' },
                endDate: { stringValue: '2024-11-20' }
              }
            }
          ]
        }
      }
    }).as('firestoreRequest');
  });