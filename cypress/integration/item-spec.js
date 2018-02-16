import VueRouter from 'vue-router'
import router from '../../src/router'
import Item from '../../src/components/Item.vue'
import { timeAgo, host } from '../../src/util/filters'
import { createRouter } from '../../src/router'
import VueRouter from 'vue-router'
import mountVue from 'cypress-vue-unit-test'

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
    plugins: [VueRouter],
    filters: { timeAgo, host }
  }

  const options = {
    extensions
  }

  const router = createRouter()

  beforeEach(() => {
    cy.viewport(400, 200)
  })
  beforeEach(mountVue({ template, router, components, data }, options))

  it('loads news item', () => {
    cy.contains('.score', 101)
  })

  it('has link to comments', () => {
    cy.contains('.comments-link > a', '42 comments')
  })
})
