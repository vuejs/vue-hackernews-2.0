require('es6-promise').polyfill()
import Vue from 'vue'
import { app, store, router } from './app'

// Get matched components by route and load them
const path = getLocation(router.options.base)
const resolveComponents = flatMapComponents(router.match(path), (Component, _, match, key, index) => {
  if (typeof Component === 'function' && !Component.options) {
    return new Promise(function (resolve, reject) {
      const _resolve = (Component) => {
        match.components[key] = Component
        resolve(Component)
      }
      var res = Component(_resolve, reject)
      if (res && res.then) {
        res.then(_resolve).catch(reject)
      }
    })
  }
  return Component
})

Promise.all(resolveComponents)
.then((Components) => {
  const _app = new Vue(app)
  // prime the store with server-initialized state.
  // the state is determined during SSR and inlined in the page markup.
  store.replaceState(window.__INITIAL_STATE__)
  _app.$mount('#app')
})
.catch((err) => {
  console.error('Cannot load components', err)
})

// Imported for vue-router
export function flatMapComponents (route, fn) {
  return Array.prototype.concat.apply([], route.matched.map(function (m, index) {
    return Object.keys(m.components).map(function (key) {
      return fn(m.components[key], m.instances[key], m, key, index)
    })
  }))
}

// Imported from vue-router
export function getLocation (base) {
  var path = window.location.pathname
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length)
  }
  return (path || '/') + window.location.search + window.location.hash
}
