describe('Blog app', function () {
  const user = {
    username: 'testaaja',
    name: 'Testaaja',
    password: 'salasana'
  }

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()

      cy.contains(`${user.name} logged in`)
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('wronguser')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()
      cy.contains('Wrong username or password')

      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    const blog = {
      title: 'test blog',
      author: 'test author',
      url: 'test url'
    }

    beforeEach(function () {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()
    })

    it('A blog can be created', function () {
      cy.contains('add blog').click()

      cy.get('#title').type(blog.title)
      cy.get('#author').type(blog.author)
      cy.get('#url').type(blog.url)
      cy.get('#create-blog-button').click()

      cy.contains(`A new blog ${blog.title} by ${blog.author} added`)
      cy.get('.notification').should('have.css', 'color', 'rgb(0, 128, 0)')

      cy.contains(`${blog.title} by ${blog.author}`)
      cy.contains('view').click()
      cy.contains(blog.url)
      cy.contains('0')
    })
  })
})