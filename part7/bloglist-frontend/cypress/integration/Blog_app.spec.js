describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'darren',
      password: 'password',
      name: 'darren chris'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.get('#login-button').should('contain', 'login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.login({ username: 'darren', password: 'password' })
      cy.contains('darren chris logged-in')
      cy.get('#logout-button').should('contain', 'logout')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('darren')
      cy.get('#password').type('test')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain', 'password wrong')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'darren', password: 'password' })
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('A blog created by cypress')
      cy.get('#author').type('Testing')
      cy.get('#url').type('test.io')
      cy.get('#create-button').click()

      cy.contains('A blog created by cypress Testing')
      cy.get('.notification')
        .should('contain', 'a new blog A blog created by cypress by Testing added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
    })

    describe('and a blog exist', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'Testing Blog 1', author: 'T1', url: 't1.co' })
      })

      it('user can like a blog', function () {
        cy.contains('Testing Blog 1').parent().find('.blog__btn-detail').as('showBtn')
        cy.get('@showBtn').click()

        cy.get('.blog__btn-like').click()
        cy.contains('likes 1')
      })
    })

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'first blog', author: 'first', url: 'first.co', likes: 3 })
        cy.createBlog({ title: 'second blog', author: 'second', url: 'second.co', likes: 2 })
        cy.createBlog({ title: 'third blog', author: 'third', url: 'third.co', likes: 1 })
      })

      it('user who created blog can delete it', function () {
        cy.contains('second blog').parent().find('.blog__btn-detail').click()
        cy.contains('second.co').parent().find('.blog__btn-remove').click()
        cy.get('html').should('not.contain', 'second blog')
      })

      it('the blogs with the most likes are ordered first', function () {
        cy.get('.blog__btn-detail').then((btn) => {
          cy.wrap(btn[1]).click()
          cy.wrap(btn[2]).click()
        })
        cy.get('.blog__btn-like').then((btn) => {
          cy.wrap(btn[0]).click()
          cy.wrap(btn[1]).click()
          cy.wrap(btn[1]).click()
          cy.wrap(btn[1]).click()
          cy.wait(500)
        })

        cy.get('.blog').then((blog) => {
          cy.get(blog[0]).should('contain', 'third blog')
        })
      })
    })
  })
})