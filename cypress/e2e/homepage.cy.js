describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should load the homepage successfully', () => {
    // Check that the hero section is visible
    cy.contains('Selfless Advice').should('be.visible')
    cy.contains('Life-Changing Wisdom').should('be.visible')
    
    // Check that the main heading is present
    cy.get('h1').should('contain', 'Selfless')
    
    // Check that navigation is present
    cy.get('nav').should('be.visible')
    cy.contains('Home').should('be.visible')
    cy.contains('About').should('be.visible')
    cy.contains('Donate').should('be.visible')
  })

  it('should display article cards', () => {
    // Wait for articles to load
    cy.get('[data-testid="article-card"]').should('have.length.at.least', 1)
    
    // Check that article cards have required elements
    cy.get('[data-testid="article-card"]').first().within(() => {
      cy.get('h3').should('be.visible') // Article title
      cy.get('p').should('be.visible')  // Article excerpt
    })
  })

  it('should have working navigation links', () => {
    // Test donate link
    cy.contains('Donate').click()
    cy.url().should('include', '/donate')
    cy.go('back')

    // Test logo link
    cy.get('nav').within(() => {
      cy.contains('Selfless Advice').click()
      cy.url().should('eq', Cypress.config().baseUrl + '/')
    })
  })

  it('should be responsive', () => {
    cy.checkResponsive()
    
    // Check mobile menu functionality
    cy.viewport(375, 667)
    cy.get('[data-testid="mobile-menu-button"]').click()
    cy.get('[data-testid="mobile-menu"]').should('be.visible')
  })

  it('should have working search functionality', () => {
    // Type in search box
    cy.get('input[placeholder*="Search"]').type('happiness{enter}')
    
    // Check that URL includes search parameter
    cy.url().should('include', 'search=happiness')
    
    // Check that results are filtered
    cy.contains('happiness', { matchCase: false }).should('be.visible')
  })

  it('should have working tag filters', () => {
    // Click on a tag filter
    cy.contains('Happiness').click()
    
    // Check that URL includes tag parameter
    cy.url().should('include', 'tag=happiness')
    
    // Check that active filter is displayed
    cy.contains('Active filters').should('be.visible')
  })

  it('should have working featured filter', () => {
    // Click on featured filter
    cy.contains('Featured').click()
    
    // Check that URL includes featured parameter
    cy.url().should('include', 'featured=true')
    
    // Check that featured articles are displayed
    cy.get('[data-testid="article-card"]').should('have.length.at.least', 1)
  })

  it('should display footer with correct information', () => {
    // Scroll to footer
    cy.get('footer').scrollIntoView()
    
    // Check footer content
    cy.get('footer').within(() => {
      cy.contains('Selfless Advice').should('be.visible')
      cy.contains('Privacy Policy').should('be.visible')
      cy.contains('Terms of Service').should('be.visible')
      
      // Check social links
      cy.get('[aria-label="Twitter"]').should('be.visible')
      cy.get('[aria-label="Facebook"]').should('be.visible')
    })
  })

  it('should have proper SEO meta tags', () => {
    cy.get('head title').should('contain', 'Selfless Advice')
    cy.get('head meta[name="description"]').should('have.attr', 'content')
    cy.get('head meta[property="og:title"]').should('have.attr', 'content')
  })
})
