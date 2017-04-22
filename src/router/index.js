import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// We are using Webpack code splitting here so that each route's associated
// component code is loaded on-demand only when the route is visited.
// It's actually not really necessary for a small project of this size but
// the goal is to demonstrate how to do it.
//
// Note that the dynamic import syntax should actually be just `import()`
// but buble/acorn doesn't support parsing that syntax until it's stage 4
// so we use the old System.import here instead.
//
// If using Babel, `import()` can be supported via
// babel-plugin-syntax-dynamic-import.

import lists from '../store/lists'
const ItemView = () => System.import('../views/ItemView.vue')
const UserView = () => System.import('../views/UserView.vue')
const createListView = name => () =>
  System.import('../views/CreateListView').then(m => m.createListView(name))
const createListRoutes = ()=> 
  Object.keys(lists).map( key => ({ path: `/${key}/:page(\\d+)?`, component: createListView(key) }))
  
export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [    
    { path: '/item/:id(\\d+)', component: ItemView },
    { path: '/user/:id', component: UserView },
    { path: '/', redirect: '/top' },
    ...createListRoutes()
  ]
})
