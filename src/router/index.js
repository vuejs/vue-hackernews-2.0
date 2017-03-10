import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import { createListView } from '../views/CreateListView'
import ItemView from '../views/ItemView.vue'
import UserView from '../views/UserView.vue'
import lists from '../store/lists'
const createListRoutes = ()=> {
  return Object.keys(lists).map( key => {
    return {
      path: `/${key}/:page(\\d+)?`, 
      component: createListView(key)
    }
  })
}
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
