<template>
  <li v-if="comment">
    <div>{{ comment.by }} {{ comment.time | timeAgo }} ago</div>
    <div v-html="comment.text"></div>
    <ul>
      <comment v-for="id in comment.kids" :id="id"></comment>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'comment',
  props: ['id'],
  computed: {
    comment () {
      return this.$store.state.items[this.id]
    }
  },
  beforeMount () {
    this.$store.dispatch('FETCH_ITEMS', {
      ids: [this.id]
    })
  }
}
</script>
