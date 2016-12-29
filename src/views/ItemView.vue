<template>
  <div class="item-view" v-if="item">
    <template v-if="item">
      <div class="item-view-header">
        <a :href="item.url" target="_blank">
          <h1>{{ item.title }}</h1>
        </a>
        <span v-if="item.url" class="host">
          ({{ item.url | host }})
        </span>
        <p class="meta">
          {{ item.score }} points
          | by <router-link :to="'/user/' + item.by">{{ item.by }}</router-link>
          {{ item.time | timeAgo }} ago
        </p>
      </div>
      <div class="item-view-comments">
        <p class="item-view-comments-header">
          {{ item.kids ? item.descendants + ' comments' : 'No comments yet.'}}
          <spinner :show="loading"></spinner>
        </p>
        <ul v-if="!loading" class="comment-children">
          <comment v-for="id in item.kids" :id="id"></comment>
        </ul>
      </div>
    </template>
  </div>
</template>

<script>
import Spinner from '../components/Spinner.vue'
import Comment from '../components/Comment.vue'

function fetchItem (store) {
  return store.dispatch('FETCH_ITEMS', {
    ids: [store.state.route.params.id]
  })
}

// recursively fetch all descendent comments
function fetchComments (store, item) {
  if (item.kids) {
    return store.dispatch('FETCH_ITEMS', {
      ids: item.kids
    }).then(() => Promise.all(item.kids.map(id => {
      return fetchComments(store, store.state.items[id])
    })))
  }
}

function fetchItemAndComments (store) {
  return fetchItem(store).then(() => {
    const { items, route } = store.state
    return fetchComments(store, items[route.params.id])
  })
}

export default {
  name: 'item-view',
  components: { Spinner, Comment },
  data () {
    return {
      loading: true
    }
  },
  computed: {
    item () {
      return this.$store.state.items[this.$route.params.id]
    }
  },
  // on the server, only fetch the item itself
  preFetch: fetchItem,
  // on the client, fetch everything
  beforeMount () {
    fetchItemAndComments(this.$store).then(() => {
      this.loading = false
    })
  }
}
</script>

<style lang="stylus">
.item-view-header
  background-color #fff
  padding 1.8em 2em 1em
  box-shadow 0 1px 2px rgba(0,0,0,.1)
  h1
    display inline
    font-size 1.5em
    margin 0
    margin-right .5em
  .host, .meta, .meta a
    color #999
  .meta a
    text-decoration underline

.item-view-comments
  background-color #fff
  margin-top 10px
  padding 0 2em .5em

.item-view-comments-header
  margin 0
  font-size 1.1em
  padding 1em 0
  position relative
  .spinner
    position absolute
    top 0
    right 0
    bottom auto

.comment-children
  list-style-type none
  padding 0
  margin 0

@media (max-width 600px)
  .item-view-header
    h1
      font-size 1.25em
</style>
