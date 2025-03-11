describe('Cohort Management', () => {
  beforeEach(() => {
    cy.visit('/sign-in')

    
    cy.get('input[name="email"]').type('shaughn@foundersandcoders.com')
    cy.get('input[name="password"]').type('Brav0.sage94')
    
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/learners', { timeout: 10000 })
  })

  it('opens add cohort modal when clicking add cohort button', () => {
    cy.contains('button', 'Add Cohort').click()

    cy.get('input#cohortNumber').should('exist', )
    cy.get('input#startDate').should('exist')
    cy.get('input#endDate').should('exist')
  })
})