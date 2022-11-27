describe('Blog app', function() {
  const user = {
    username: 'testaaja',
    name: 'Testaaja',
    password: 'salasana'
  }

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })
  
  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()
  
      cy.contains(`${user.name} logged in`)
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('wronguser')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()
      cy.contains('Wrong username or password')

      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})