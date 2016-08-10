<template>
  <div class="item-view">
    <h2>Item!</h2>
    <p v-if="item">{{ item.title }}</p>
  </div>
</template>

<script>
export default {
  name: 'item-view',
  computed: {
    item () {
      return this.$store.state.items[this.$route.params.id]
    }
  },
  beforeMount () {
    this.$store.dispatch('FETCH_ITEMS', {
      ids: [this.$route.params.id]
    })
  }
}
</script>
