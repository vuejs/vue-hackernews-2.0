import Item from '../../src/components/Item.vue'
import { timeAgo } from '../../src/util/filters'
import Vue from 'vue'

const mountVue = require('cypress-vue-unit-test')
/* eslint-env mocha */
/* global cy */
describe('Item', () => {
  const template = `<news-item item="item"></news-item>`
  const components = {
    'news-item': Item,
    'router-link': Vue.component('router-link', {
      name: 'router-link'
    })
  }
  const data = {
    item: {}
  }
  const options = {
    vue: 'https://unpkg.com/vue'
  }
  beforeEach(mountVue({ template, components, data }, options))

  it('loads', () => {})
})
