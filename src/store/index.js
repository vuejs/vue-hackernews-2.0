import Vue from 'vue'
import Vuex from 'vuex'
import { watchTopIds, fetchTopIds, fetchItems } from './api'

Vue.use(Vuex)

const inBrowser = typeof window !== 'undefined'

// if in browser, use pre-fetched state injected by SSR
const state = (inBrowser && window.__INITIAL_STATE__) || {
  storiesPerPage: 30,
  topStoryIds: [],
  items: {}
}

const store = new Vuex.Store({
  state,

  actions: {
    FETCH_TOP_IDS: ({ commit }) => {
      return fetchTopIds().then(ids => {
        commit('RECEIVE_TOP_IDS', { ids })
      })
    },
    FETCH_NEWS: ({ commit, state }) => {
      const ids = getDisplayedIds(state).filter(id => !state.items[id])
      return fetchItems(ids).then(items => {
        commit('RECEIVE_ITEMS', { items })
      })
    }
  },

  mutations: {
    RECEIVE_TOP_IDS: (state, { ids }) => {
      state.topStoryIds = ids
    },
    RECEIVE_ITEMS: (state, { items }) => {
      items.forEach(item => {
        Vue.set(state.items, item.id, item)
      })
    }
  },

  getters: {
    news: state => {
      const ids = getDisplayedIds(state)
      return ids.map(id => state.items[id]).filter(_ => _)
    }
  }
})

// watch for realtime top IDs updates on the client
if (inBrowser) {
  watchTopIds(ids => {
    store.commit('RECEIVE_TOP_IDS', { ids })
  })
}

function getDisplayedIds (state) {
  const page = Number(state.route.params.page) || 1
  const { storiesPerPage, topStoryIds } = state
  const start = (page - 1) * storiesPerPage
  const end = page * storiesPerPage
  return topStoryIds.slice(start, end)
}

export default store
