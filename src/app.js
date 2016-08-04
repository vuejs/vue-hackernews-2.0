import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

export { router, store }

export const app = new Vue({
  router,
  store,
  render: h => h(App)
})
