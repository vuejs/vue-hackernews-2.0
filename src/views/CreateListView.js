import ItemList from '../components/ItemList.vue'

// factory function for creating root-level list views
// since they share most of the logic except for the type of items to display.
export function createListView (type) {
  return {
    name: `${type}-stories-view`,
    // this will be called during SSR to pre-fetch data into the store!
    preFetch (store) {
      return store.dispatch('FETCH_LIST_DATA', { type })
    },
    render (h) {
      return h(ItemList, { props: { type }})
    }
  }
}
