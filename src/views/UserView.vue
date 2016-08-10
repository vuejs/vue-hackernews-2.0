<template>
  <div class="user-view">
    <template v-if="user">
      <ul>
        <li><span class="label">user:</span> {{ user.id }}</li>
        <li><span class="label">created:</span> {{ user.created | timeAgo }} ago</li>
        <li><span class="label">karma:</span> {{user.karma}}</li>
        <li>
          <span class="label">about:</span>
          <div class="about" v-html="user.about"></div>
        </li>
      </ul>
      <p class="links">
        <a :href="'https://news.ycombinator.com/submitted?id=' + user.id">submissions</a><br>
        <a :href="'https://news.ycombinator.com/threads?id=' + user.id">comments</a>
      </p>
    </template>
  </div>
</template>

<script>
function fetchUser (store) {
  return store.dispatch('FETCH_USER', {
    id: store.state.route.params.id
  })
}

export default {
  name: 'user-view',
  computed: {
    user () {
      return this.$store.state.users[this.$route.params.id]
    }
  },
  preFetch: fetchUser,
  beforeMount () {
    fetchUser(this.$store)
  }
}
</script>
