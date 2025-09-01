describe('Donation Flow', () => {
  beforeEach(() => {
    cy.visit('/donate')
  })

  it('should display donation page correctly', () => {
    // Check main elements are present
    cy.contains('Help Us Share Life-Changing Wisdom').should('be.visible')
    cy.contains('Make a Donation').should('be.visible')
    
    // Check donation form is present
    cy.get('form').should('be.visible')
    
    // Check predefined amounts
    cy.contains('$5').should('be.visible')
    cy.contains('$25').should('be.visible')
    cy.contains('$100').should('be.visible')
  })

  it('should allow selecting predefined amounts', () => {
    // Select $25 amount
    cy.contains('$25').click()
    cy.contains('$25').should('have.class', 'border-blue-500')
    
    // Check that donate button shows correct amount
    cy.contains('Donate $25.00').should('be.visible')
  })

  it('should allow custom amount input', () => {
    // Select custom amount
    cy.contains('Custom').click()
    
    // Enter custom amount
    cy.get('input[type="number"]').type('50')
    
    // Check that donate button shows correct amount
    cy.contains('Donate $50.00').should('be.visible')
  })

  it('should validate form inputs', () => {
    // Try to submit with invalid amount
    cy.contains('Custom').click()
    cy.get('input[type="number"]').type('0')
    cy.get('button[type="submit"]').click()
    
    // Should show validation message
    // Note: This would depend on your validation implementation
  })

  it('should handle donor information', () => {
    // Select amount
    cy.contains('$25').click()
    
    // Fill donor information
    cy.get('input[placeholder="Your name"]').type('Test Donor')
    cy.get('input[placeholder="Your email"]').type('donor@example.com')
    cy.get('textarea[placeholder*="message"]').type('Supporting your great work!')
    
    // Check anonymous option
    cy.contains('Make this donation anonymous').click()
    cy.get('input[type="checkbox"]').should('be.checked')
  })

  it('should show impact information', () => {
    // Check impact section is visible
    cy.contains('Your Impact').should('be.visible')
    cy.contains('Spread One Article').should('be.visible')
    cy.contains('Support Weekly Content').should('be.visible')
    
    // Check transparency section
    cy.contains('Our Commitment to Transparency').should('be.visible')
    cy.contains('Content Creation & Research').should('be.visible')
  })

  it('should display recent donations', () => {
    // Check recent support section
    cy.contains('Recent Support').should('be.visible')
    cy.contains('This month\'s total').should('be.visible')
  })

  it('should be responsive', () => {
    cy.checkResponsive()
    
    // Check that donation form is still usable on mobile
    cy.viewport(375, 667)
    cy.contains('$25').should('be.visible').click()
    cy.get('button[type="submit"]').should('be.visible')
  })

  it('should handle donation submission', () => {
    // Mock Stripe checkout (in real tests, you'd use Stripe test keys)
    cy.intercept('POST', '/api/donations/create-checkout', {
      statusCode: 200,
      body: { checkoutUrl: 'https://checkout.stripe.com/test' }
    })
    
    // Select amount and submit
    cy.contains('$25').click()
    cy.get('input[placeholder="Your name"]').type('Test Donor')
    cy.get('button[type="submit"]').click()
    
    // Should redirect to Stripe (mocked)
    // In real implementation, this would redirect to Stripe
  })
})
