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
    FETCH_ACTIVE_IDS: ({ commit, state }) => {
      const type = state.activeType
      return fetchIdsByType(type).then(ids => {
        commit('SET_IDS', { type, ids })
      })
    },
    FETCH_ACTIVE_ITEMS: ({ commit, state, getters }) => {
      return fetchItems(getters.activeIds).then(items => {
        commit('SET_ITEMS', { items })
      })
    }
  },

  mutations: {
    SET_ACTIVE_TYPE: (state, { type }) => {
      state.activeType = type
    },
    SET_IDS: (state, { type, ids }) => {
      state.lists[type] = ids
    },
    SET_ITEMS: (state, { items }) => {
      items.forEach(item => {
        Vue.set(state.items, item.id, item)
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

// watch for realtime top IDs updates on the client
if (typeof window !== 'undefined') {
  watchTopIds(ids => {
    store.commit('SET_IDS', { type: 'top', ids })
    store.dispatch('FETCH_ACTIVE_ITEMS')
  })
}

export function fetchInitialData (type) {
  store.commit('SET_ACTIVE_TYPE', { type })
  return store
    .dispatch('FETCH_ACTIVE_IDS')
    .then(() => store.dispatch('FETCH_ACTIVE_ITEMS'))
}

export default store
