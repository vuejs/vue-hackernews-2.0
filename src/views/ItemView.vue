<template>
  <div class="item-view" v-if="item">
    <div class="item-view-header">
      <a :href="item.url" target="_blank">
        <h2>{{ item.title }}</h2>
      </a>
      <span v-if="item.url">({{ item.url | host }})</span>
      <p>
        {{ item.score }} points
        | by <router-link :to="'/user/' + item.by">{{ item.by }}</router-link>
        {{ item.time | timeAgo }} ago
        | {{ item.descendants }} comments
      </p>
    </div>
    <ul class="item-view-comments">
      <comment v-for="id in item.kids" :id="id"></comment>
    </ul>
  </div>
</template>

<script>
import Comment from '../components/Comment.vue'

function fetchItem (store) {
  return store.dispatch('FETCH_ITEMS', {
    ids: [store.state.route.params.id]
  })
}

export default {
  name: 'item-view',
  components: { Comment },
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
