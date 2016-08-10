<template>
  <div class="item-view">
    <h2>Item!</h2>
    <p v-if="item">{{ item.title }}</p>
  </div>
</template>

<script>
function fetchItem (store) {
  return store.dispatch('FETCH_ITEMS', {
    ids: [store.state.route.params.id]
  })
}

export default {
  name: 'item-view',
  computed: {
    item () {
      return this.$store.state.items[this.$route.params.id]
    }
  },
  preFetch: fetchItem,
  beforeMount () {
    fetchItem(this.$store)
  }
}
</script>
