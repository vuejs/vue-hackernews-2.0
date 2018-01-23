/* eslint-env mocha */
/* global cy, Cypress */
describe('Without ServiceWorker', () => {
  // cleaning anything cached by the ServiceWorker
  // and preventing ServiceWorker from registering
  // https://github.com/cypress-io/cypress/issues/702
  const clearCache = (name) =>
    window.caches.delete(name)

  const clearCaches = () =>
    window.caches.keys().then(cacheNames =>
      Promise.all(cacheNames.map(clearCache)))

  // prevents new service worker registration
  const neverRegisterSW = (win) => {
    // use a promise that never resolves
    const neverResolves = new Promise(resolve => {})
    win.navigator.serviceWorker.register = () => neverResolves
  }

  // unregisters any service workers already registered
  const unregisterWorkers = (win) =>
    win.navigator.serviceWorker.getRegistrations()
    .then(registrations =>
      Cypress.Promise.map(registrations, sw => sw.unregister())
    )

  beforeEach(clearCaches)

  beforeEach(() => {
    cy.visit('/', {
      onBeforeLoad: win => {
        neverRegisterSW(win)
        return unregisterWorkers(win)
      }
    })
  })

  it('loads news items', () => {
    cy.get('.news-item').should('have.length.gt', 10)
  })
})
