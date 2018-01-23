/* eslint-env mocha */
/* global cy */
describe('HackerNews', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('loads', () => {
    cy.contains('Built with Vue.js')
  })
  it('loads news items', () => {
    cy.get('.news-item').should('have.length.gt', 10)
  })
  it('goes to the second page and back', () => {
    cy.contains('.news-list-nav a', 'more >').click()
    cy.url().should('contain', '/top/2')
    cy.go('back')
    cy.url().should('contain', '/top')
  })
  it('cannot go to the previous page', () => {
    cy.contains('.news-list-nav a', '< prev')
      .should('have.class', 'disabled')
  })
  it('goes to comments and back', () => {
    // see comments for the first story
    cy.get('.news-item')
      .first().find('.meta .comments-link')
      .click()
    // loader disappears, and comments are there
    cy.get('.item-view-comments-header .spinner').should('not.be.visible')
    // NOTE: there might be zero comments
    cy.get('.comment')
      .should('have.length.gte', 0)
      .and('be.visible')
    // go to the top news
    cy.get('nav').contains('Top').click()
    cy.url().should('contain', '/top')
  })
})
