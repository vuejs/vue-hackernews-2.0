import Vue from 'vue'
import Vuex from 'vuex'
import { fetchItems } from './api'

Vue.use(Vuex)

// pre-fetched state injected by SSR
const serverState = typeof window !== 'undefined' && window.__INITIAL_STATE__

// default state
const defaultState = {
  storiesPerPage: 30,
  topStoryIds: [],
  items: {}
}

export default new Vuex.Store({
  state: serverState || defaultState,
  mutations: {
    RECEIVE_ITEMS: (state, { items }) => {
      for (const id in items) {
        Vue.set(state.items, id, items[id])
      }
    }
  },
  actions: {
    FETCH_NEWS_BY_PAGE: ({ commit, state }, { page }) => {
      const { storiesPerPage, topStoryIds } = state
      const start = (page - 1) * storiesPerPage
      const end = page * storiesPerPage
      const ids = topStoryIds.slice(start, end)
      return fetchItems(ids).then(items => {
        commit('RECEIVE_ITEMS', { items })
      })
    }
  }
})
