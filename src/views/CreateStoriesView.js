import NewsList from '../components/NewsList.vue'
import { fetchInitialData } from '../store'

export function createStoriesView (type) {
  return {
    name: `${type}-stories`,
    components: {
      NewsList
    },
    prefetch () {
      fetchInitialData(type)
    },
    render (h) {
      return h(NewsList, { props: { type }})
    }
  }
}
