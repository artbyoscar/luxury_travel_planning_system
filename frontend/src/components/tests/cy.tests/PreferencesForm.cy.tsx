import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import PreferencesForm from '../../PreferencesForm';
import { firebaseAuth, firebaseFirestore } from '../../../../cypress/support/firebaseMocks';

const TEST_USER_ID = 'testUserId';
const TEST_PREFERENCES = ['beach', 'mountain']; // Preferences to simulate selection
const TOTAL_PREFERENCES = 24; // Total number of checkboxes

// Mock Firebase Authentication to simulate a logged-in user
const mockAuth = () => {
    cy.stub(firebaseAuth, 'getAuth').returns({
        currentUser: { uid: TEST_USER_ID },
    }).as('getAuth');
};

// Mock Firestore update request to simulate successful updates
const mockFirestore = () => {
    cy.intercept('PATCH', '**/documents/Users/**', {
        statusCode: 200, // Simulate a successful Firestore update
        body: { updateTime: '2022-01-01T00:00:00Z' }, // Mock response body
    }).as('firestoreUpdate');
};

// Setup mocks for authentication and Firestore
const setupMocks = () => {
    mockAuth(); // Set up Firebase Auth mock
    mockFirestore(); // Set up Firestore mock
    cy.intercept('POST', '**/identitytoolkit/v3/relyingparty/verifyPassword', {
        statusCode: 200, // Mock login response
        body: { idToken: 'mock-token', localId: TEST_USER_ID },
    }).as('firebaseAuth');
};

// Utility to mount the PreferencesForm component for testing
const mountPreferencesForm = () => {
    cy.mount(
        <MemoryRouter>
            <PreferencesForm />
        </MemoryRouter>
    );
};

// Utility to check checkboxes based on their indices
const checkCheckboxes = (indices) => {
    indices.forEach(index => {
        cy.get('form input[type="checkbox"]').eq(index).check().should('be.checked');
    });
};

// Utility to uncheck checkboxes based on their indices (optional debugging)
const uncheckCheckboxes = (indices) => {
    indices.forEach(index => {
        cy.get('form input[type="checkbox"]').eq(index).uncheck().should('not.be.checked');
    });
};

// Test suite for <PreferencesForm /> component
describe('<PreferencesForm />', () => {
    // Run setup mocks before each test
    beforeEach(() => {
        setupMocks();
    });

    it('should save selected preferences successfully and navigate to suggestions', () => {
        // Add a log to confirm test flow
        cy.log("Starting 'save selected preferences successfully' test...");

        // Stub Firestore updateDoc method
        cy.stub(firebaseFirestore, 'updateDoc').as('updateDoc').resolves();

        // Mount the PreferencesForm component
        mountPreferencesForm();

        // Ensure the form renders the correct number of checkboxes
        cy.get('form input[type="checkbox"]').should('have.length', TOTAL_PREFERENCES);

        // Check the relevant checkboxes (e.g., 'beach' and 'mountain')
        checkCheckboxes([0, 1]);

        // Add additional step: uncheck a checkbox to verify change is handled (optional)
        uncheckCheckboxes([1]); // Unchecking 'mountain' to test toggling

        // Re-check the unselected checkbox
        checkCheckboxes([1]); // Re-check 'mountain'

        // Submit the form
        cy.get('button[type="submit"]').click();

        // Add explicit wait for Firestore update and ensure it occurs
        cy.wait('@firestoreUpdate').then((xhr) => {
            cy.log('Firestore update called:', xhr); // Debugging log to verify the request
        });

        // Ensure the loading state is triggered (button disabled)
        cy.get('button[type="submit"]').should('have.attr', 'disabled');

        // Verify that the updateDoc method was called with correct arguments
        cy.get('@updateDoc').should('have.been.calledOnce');
        cy.get('@updateDoc').should('have.been.calledWithMatch', Cypress.sinon.match.any, { preferences: TEST_PREFERENCES });

        // Ensure the user is redirected to the suggestions page
        cy.url().should('include', '/suggestions');
    });

    it('handles errors when saving preferences and displays appropriate message', () => {
        // Simulate Firestore update failure
        cy.stub(firebaseFirestore, 'updateDoc').as('updateDoc').rejects(new Error('Update failed'));

        // Mount the PreferencesForm component
        mountPreferencesForm();

        // Check a checkbox (e.g., 'beach')
        checkCheckboxes([0]);

        // Submit the form
        cy.get('button[type="submit"]').click();

        // Verify that an error message is displayed
        cy.contains('Failed to update preferences. Please try again.').should('be.visible');
    });

    it('logs the correct preferences array before update', () => {
        // Mount the PreferencesForm component
        mountPreferencesForm();

        // Ensure the form and button are visible
        cy.get('form').should('be.visible');
        cy.get('button[type="submit"]').should('be.visible').and('not.be.disabled');

        // Check some checkboxes (e.g., 'beach' and 'mountain')
        checkCheckboxes([0, 1]);

        // Spy on console.log to verify preferences logging
        cy.window().then((win) => {
            cy.spy(win.console, 'log').as('consoleLog');
        });

        // Submit the form
        cy.get('button[type="submit"]').click();

        // Assert that the correct preferences are logged to the console
        cy.get('@consoleLog').should('have.been.calledWith', 'Submitting preferences:', TEST_PREFERENCES);
    });

    it('debugs checkbox count and values', () => {
        // Mount the PreferencesForm component
        mountPreferencesForm();

        // Log and verify the number and values of all checkboxes
        cy.get('input[type="checkbox"]').then((checkboxes) => {
            cy.log('Checkbox elements:', checkboxes); // Log all checkboxes for debugging
            cy.wrap(checkboxes).should('have.length', TOTAL_PREFERENCES); // Assert the correct number of checkboxes

            // Log each checkbox value for debugging
            checkboxes.each((index, checkbox) => {
                cy.log(`Checkbox ${index} value:`, checkbox.value); // Log individual checkbox values
            });
        });

        // Explicitly debug individual checkboxes
        cy.get('input[type="checkbox"]').debug();
    });

    it('ensures form validation prevents submission without any preferences', () => {
        // Mount the PreferencesForm component
        mountPreferencesForm();

        // Try submitting the form without selecting any checkboxes
        cy.get('button[type="submit"]').click();

        // Ensure an error or validation message appears
        cy.contains('Please select at least one preference').should('be.visible');
    });

    it('allows deselecting and re-selecting preferences without issue', () => {
        // Mount the PreferencesForm component
        mountPreferencesForm();

        // Select and then unselect multiple checkboxes
        checkCheckboxes([0, 1, 2]); // Select 'beach', 'mountain', 'city'
        uncheckCheckboxes([0, 1]);  // Uncheck 'beach', 'mountain'

        // Ensure the right checkboxes are still checked
        cy.get('form input[type="checkbox"]').eq(2).should('be.checked'); // 'city' should remain checked
        cy.get('form input[type="checkbox"]').eq(0).should('not.be.checked'); // 'beach' should be unchecked

        // Re-check 'beach' and ensure form is valid
        checkCheckboxes([0]); // Re-check 'beach'

        // Submit the form
        cy.get('button[type="submit"]').click();

        // Add explicit wait for Firestore update
        cy.wait('@firestoreUpdate').then((xhr) => {
            cy.log('Firestore update called:', xhr); // Debugging log to verify the request
        });

        // Ensure the loading state is triggered (button disabled)
        cy.get('button[type="submit"]').should('have.attr', 'disabled');

        // Verify that the updateDoc method was called correctly
        cy.get('@updateDoc').should('have.been.calledWithMatch', Cypress.sinon.match.any, { preferences: ['beach', 'city'] });
    });
});
