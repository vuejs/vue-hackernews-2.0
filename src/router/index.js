import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const createListView = process.BROWSER ? (type) => {
  return (resolve) => { System.import('../views/CreateListView').then((createListView) => resolve(createListView(type))) }
} : require('../views/CreateListView')
const ItemView = process.BROWSER  ? () => System.import('../views/ItemView.vue') : require('../views/ItemView.vue')
const UserView = process.BROWSER  ? () => System.import('../views/UserView.vue') : require('../views/UserView.vue')

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/top/:page(\\d+)?', component: createListView('top') },
    { path: '/new/:page(\\d+)?', component: createListView('new') },
    { path: '/show/:page(\\d+)?', component: createListView('show') },
    { path: '/ask/:page(\\d+)?', component: createListView('ask') },
    { path: '/job/:page(\\d+)?', component: createListView('job') },
    { path: '/item/:id(\\d+)', component: ItemView },
    { path: '/user/:id', component: UserView },
    { path: '*', redirect: '/top' }
  ]
})
