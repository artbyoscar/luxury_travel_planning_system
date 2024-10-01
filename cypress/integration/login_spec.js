// cypress/integration/login_spec.js
describe('Login', () => {
    it('should login successfully', () => {
      cy.visit('/login')
      cy.get('#email').type('test@example.com')
      cy.get('#password').type('password123')
      cy.get('button[type="submit"]').click()
      cy.url().should('include', '/preferences')
    })
  })