require('es6-promise').polyfill()
import { app, store } from './app'

// prime the store with server-initialized state
store.replaceState(window.__INITIAL_STATE__)

app.$mount('#app')
