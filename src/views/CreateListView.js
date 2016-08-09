import NewsList from '../components/NewsList.vue'

// factory function for creating root-level list views
// since they share most of the logic except for the type of items to display.
export function createListView (type) {
  return {
    name: `${type}-stories`,
    components: {
      NewsList
    },
    // this will be called during SSR to pre-fetch data into the store!
    preFetch (store) {
      return store.dispatch('FETCH_DATA_FOR_TYPE', { type })
    },
    created () {
      this.$store.commit('SET_ACTIVE_TYPE', { type })
    },
    render (h) {
      return h(NewsList, { props: { type }})
    }
  }
}
