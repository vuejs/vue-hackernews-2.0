import { createStore as _createStore } from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export function createStore (router) {
  return _createStore({
    state: {
      get route() {
        return router.currentRoute.value
      },
      activeType: null,
      itemsPerPage: 20,
      items: {/* [id: number]: Item */},
      users: {/* [id: string]: User */},
      lists: {
        top: [/* number */],
        new: [],
        show: [],
        ask: [],
        job: []
      }
    },
    actions,
    mutations,
    getters
  })
}
