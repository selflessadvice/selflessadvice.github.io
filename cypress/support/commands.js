// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command for login
Cypress.Commands.add('login', (email = 'test@example.com', password = 'password123') => {
  cy.visit('/auth/signin')
  cy.get('input[type="email"]').type(email)
  cy.get('input[type="password"]').type(password)
  cy.get('button[type="submit"]').click()
  cy.url().should('not.include', '/auth/signin')
})

// Custom command for creating test user
Cypress.Commands.add('createTestUser', (userData = {}) => {
  const defaultUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    confirmPassword: 'password123'
  }
  
  const user = { ...defaultUser, ...userData }
  
  cy.visit('/auth/signup')
  cy.get('input[name="name"]').type(user.name)
  cy.get('input[name="email"]').type(user.email)
  cy.get('input[name="password"]').type(user.password)
  cy.get('input[name="confirmPassword"]').type(user.confirmPassword)
  cy.get('button[type="submit"]').click()
})

// Custom command to wait for page load
Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('body').should('be.visible')
  cy.get('[data-testid="loading-spinner"]').should('not.exist')
})

// Custom command to check responsive behavior
Cypress.Commands.add('checkResponsive', () => {
  // Test mobile viewport
  cy.viewport(375, 667)
  cy.wait(500)
  
  // Test tablet viewport
  cy.viewport(768, 1024)
  cy.wait(500)
  
  // Test desktop viewport
  cy.viewport(1280, 720)
  cy.wait(500)
})
