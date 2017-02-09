import 'es6-promise/auto'
import { app, store } from './app'

// put a patch on server-initialized state for hash which is only available to the browser
window.__INITIAL_STATE__.route.hash = window.location.hash
// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
store.replaceState(window.__INITIAL_STATE__)

// actually mount to DOM
app.$mount('#app')

// service worker
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
}
