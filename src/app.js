import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import News from './views/News.vue'
import About from './views/About.vue'

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: News },
    { path: '/about', component: About }
  ]
})

export const app = new Vue({
  router,
  render: h => h(App)
})
