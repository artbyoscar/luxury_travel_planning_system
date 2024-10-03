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
  updateDoc: async () => Promise.resolve(), // This returns a resolved Promise for successful test simulation
};

export { firebaseAuth, firebaseFirestore };
