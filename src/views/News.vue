<template>
  <div>
    <h2>News</h2>
    <p>hihihi</p>
  </div>
</template>

<script>
export default {
  name: 'news',
  prefetch (store) {
    const page = store.state.route.params.page
    return store.dispatch('FETCH_NEWS_BY_PAGE', page)
  }
}
</script>
