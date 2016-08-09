import Vue from 'vue'
import Vuex from 'vuex'
import { watchTopIds, fetchTopIds, fetchItems } from './api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    itemsPerPage: 20,
    activeItemIds: [],
    items: {}
  },

  actions: {
    FETCH_IDS: ({ commit }) => {
      return fetchTopIds().then(ids => {
        commit('SET_ACTIVE_IDS', { ids })
      })
    },
    FETCH_DISPLAYED_ITEMS: ({ commit, state }) => {
      const ids = getDisplayedIds(state)
      return fetchItems(ids).then(items => {
        commit('SET_ITEMS', { items })
      })
    }
  },

  mutations: {
    SET_ACTIVE_IDS: (state, { ids }) => {
      state.activeItemIds = ids
    },
    SET_ITEMS: (state, { items }) => {
      items.forEach(item => {
        Vue.set(state.items, item.id, item)
      })
    }
  },

  getters: {
    displayedItems: state => {
      const ids = getDisplayedIds(state)
      return ids.map(id => state.items[id]).filter(_ => _)
    }
  }
})

// watch for realtime top IDs updates on the client
if (typeof window !== 'undefined') {
  watchTopIds(ids => {
    store.commit('SET_ACTIVE_IDS', { ids })
    store.dispatch('FETCH_DISPLAYED_ITEMS')
  })
}

function getDisplayedIds (state) {
  const page = Number(state.route.params.page) || 1
  const { itemsPerPage, activeItemIds } = state
  const start = (page - 1) * itemsPerPage
  const end = page * itemsPerPage
  return activeItemIds.slice(start, end)
}

export default store
