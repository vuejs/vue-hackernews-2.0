import Item from '../../src/components/Item.vue'
import { timeAgo, host } from '../../src/util/filters'

const mountVue = require('cypress-vue-unit-test')
/* eslint-env mocha */
/* global cy, Cypress */
describe('Item', () => {
  const template = `<news-item :item="item"></news-item>`
  const components = {
    'news-item': Item
  }
  const data = {
    item: {
      title: 'Vue unit testing with Cypress',
      score: 101,
      url: 'https://www.cypress.io',
      id: 'a0x',
      by: 'bahmutov',
      time: Cypress.moment('Jan 22 2018').unix(),
      descendants: 42
    }
  }
  const extensions = {
    filters: { timeAgo, host }
  }
  const html = `
    <html>
    <head></head>
    <body>
      <div id="app"></div>
      <script src="https://unpkg.com/vue@2.5.3"></script>
    </body>
  </html>
  `
  // <script src="https://unpkg.com/vue-router@3.0.1"></script>
  // hmm, when adding the vue router getting an error inside the RouterLink
  // render function
  // var router = this.$router;
  // var current = this.$route;
  // var ref = router.resolve(this.to, current, this.append);
  // this.$router is undefined
  // Seems VueRouter.install(Vue) did not go well
  const options = {
    html,
    extensions
  }

  beforeEach(() => {
    cy.viewport(400, 200)
  })
  beforeEach(mountVue({ template, components, data }, options))

  it('loads news item', () => {
    cy.contains('.score', 101)
  })

  it('has link to comments', () => {
    cy.contains('router-link', '42 comments')
  })
})
