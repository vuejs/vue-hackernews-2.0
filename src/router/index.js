import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import { createStoriesView } from '../views/CreateStoriesView'
import About from '../views/About.vue'

export default new Router({
  mode: 'history',
  routes: [
    { path: '/top/:page(\\d+)?', component: createStoriesView('top') },
    { path: '/new/:page(\\d+)?', component: createStoriesView('new') },
    { path: '/show/:page(\\d+)?', component: createStoriesView('show') },
    { path: '/ask/:page(\\d+)?', component: createStoriesView('ask') },
    { path: '/job/:page(\\d+)?', component: createStoriesView('job') },
    { path: '/about', component: About },
    { path: '*', redirect: '/top/1' }
  ]
})
