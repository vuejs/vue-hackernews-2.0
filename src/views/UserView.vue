<template>
  <div class="user-view">
    <spinner :show="!userLoaded"></spinner>
    <template v-if="user">
      <h1>User : {{ user.id }}</h1>
      <ul class="meta">
        <li><span class="label">Created:</span> {{ user.created | timeAgo }} ago</li>
        <li><span class="label">Karma:</span> {{user.karma}}</li>
        <li v-if="user.about" v-html="user.about" class="about"></li>
      </ul>
      <p class="links">
        <a :href="'https://news.ycombinator.com/submitted?id=' + user.id">submissions</a> |
        <a :href="'https://news.ycombinator.com/threads?id=' + user.id">comments</a>
      </p>
    </template>
    <template v-else-if="user === false">
      <h1>User not found.</h1>
    </template>
  </div>
</template>

<script>
import { setTitle } from '../util/title'
import Spinner from '../components/Spinner.vue'

export default {
  name: 'user-view',
  components: { Spinner },

  computed: {
    user () {
      return this.$store.state.users[this.$route.params.id]
    },
    userLoaded () {
      return this.$route.params.id in this.$store.state.users
    }
  },

  asyncData ({ store, route: { params: { id }}, ssrContext }) {
    return store.dispatch('FETCH_USER', { id }).then(() => {
      const user = store.state.users[id]
      setTitle(user ? user.id : 'User not found', ssrContext)
    })
  }
}
</script>

<style lang="stylus">
.user-view
  background-color #fff
  box-sizing border-box
  padding 2em 3em
  h1
    margin 0
    font-size 1.5em
  .meta
    list-style-type none
    padding 0
  .label
    display inline-block
    min-width 4em
  .about
    margin 1em 0
  .links a
    text-decoration underline
</style>
