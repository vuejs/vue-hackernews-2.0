import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// pre-fetched state injected by SSR
const serverState = typeof window !== 'undefined' && window.__INITIAL_STATE__

// default state
const defaultState = {
  url: '/'
}

export default new Vuex.Store({
  state: serverState || defaultState,
  mutations: {
    setURL: (state, url) => state.url = url
  },
  actions: {
    // just simulating an async action here
    setURL: ({ commit }, url) => new Promise(resolve => {
      commit('setURL', url)
      setTimeout(resolve, 0)
    })
  }
})
