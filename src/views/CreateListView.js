import NewsList from '../components/NewsList.vue'
import { fetchInitialData } from '../store'

// factory function for creating root-level list views
// since they share most of the logic except for the type of items to display.
export function createListView (type) {
  return {
    name: `${type}-stories`,
    components: {
      NewsList
    },
    prefetch () {
      return fetchInitialData(type)
    },
    created () {
      this.$store.commit('SET_ACTIVE_TYPE', { type })
    },
    render (h) {
      return h(NewsList, { props: { type }})
    }
  }
}
