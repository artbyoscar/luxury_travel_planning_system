// firebaseMocks.js
const firebaseAuth = {
    getAuth: () => ({
      currentUser: {
        uid: 'testUserId',
        email: 'test@example.com',
      },
    }),
  };
  
  const firebaseFirestore = {
    doc: () => ({}),
    updateDoc: cy.stub().as('updateDoc'), // Use a Cypress stub for updateDoc
  };
  
  export { firebaseAuth, firebaseFirestore };
  