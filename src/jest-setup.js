import Vue from 'vue'
import * as filters from './util/filters'

// We would extract this to a function that would be reused by both app.js and jest-setup but,
// we didn't want to change original production code
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

