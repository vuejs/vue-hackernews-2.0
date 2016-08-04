<template>
  <div>
    <h2>News</h2>
    <ul>
      <li v-for="item in news" :key="item.id">
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script>
const fetchData = store => {
  return store
    .dispatch(`FETCH_TOP_IDS`)
    .then(() => store.dispatch(`FETCH_NEWS`))
}

export default {
  name: 'news',
  prefetch: fetchData,
  mounted () {
    fetchData(this.$store)
  },
  computed: {
    news () {
      return this.$store.getters.news
    }
  }
}
</script>
