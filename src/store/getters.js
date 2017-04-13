export default {
  // ids of the items that should be currently displayed based on
  // current list type and current pagination
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

  // items that should be currently displayed.
  // this Array may not be fully fetched.
  activeItems (state, getters) {
    return getters.activeIds.map(id => state.items[id]).filter(_ => _)
  }
}
