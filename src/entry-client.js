import Vue from 'vue'
import 'es6-promise/auto'
import { createApp } from './app'

// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next)
    } else {
      next()
    }
  }
})

const { app, router, store } = createApp()

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

// wait until router has resolved all async before hooks
// and async components...
router.onReady(() => {
  // add router hook for handling asyncData
  // doing it after initial route is resolved so that we don't double-fetch
  // the data that we already have.
  router.beforeResolve((to, from, next) => {
    Promise.all(router.getMatchedComponents(to).map(c => {
      if (c.asyncData) {
        return c.asyncData({ store, route: to })
      }
    })).then(next)
  })

  // actually mount to DOM
  app.$mount('#app')
})

// service worker
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
}
