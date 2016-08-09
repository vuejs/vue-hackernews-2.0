import Vue from 'vue'
import Vuex from 'vuex'
import { watchTopIds, fetchIdsByType, fetchItems } from './api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    activeType: null,
    itemsPerPage: 20,
    // fetched items by id. This also serves as a cache to some extent
    items: {/* [id: number]: Item */},
    // the id lists for each type of stories
    // will be periodically updated in realtime
    lists: {
      top: [],
      new: [],
      show: [],
      ask: [],
      job: []
    }
  },

  actions: {
    FETCH_DATA_FOR_TYPE: ({ commit, dispatch, state, getters }, { type }) => {
      commit('SET_ACTIVE_TYPE', { type })
      return fetchIdsByType(type)
        .then(ids => commit('SET_LIST', { type, ids }))
        .then(() => fetchItems(getters.activeIds.filter(id => !state.items[id])))
        .then(items => commit('SET_ITEMS', { items }))
    }
  },

  mutations: {
    SET_ACTIVE_TYPE: (state, { type }) => {
      state.activeType = type
    },

    SET_LIST: (state, { type, ids }) => {
      state.lists[type] = ids
    },

    SET_ITEMS: (state, { items }) => {
      items.forEach(item => {
        if (item) {
          Vue.set(state.items, item.id, item)
        }
      })
    }
  },

  getters: {
    activeIds (state) {
      const { activeType, itemsPerPage, lists } = state
      const page = Number(state.route.params.page) || 1
      if (activeType) {
        const start = (page - 1) * itemsPerPage
        const end = page * itemsPerPage
        return lists[activeType].slice(start, end)
      } else {
        return []
      }
    },

    activeItems (state, getters) {
      return getters.activeIds.map(id => state.items[id]).filter(_ => _)
    }
  }
})

export default store
