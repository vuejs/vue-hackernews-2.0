<template>
  <div class="user-view">
    <h2>User!</h2>
  </div>
</template>

<script>
export default {
  name: 'user-view',

  preFetch (store) {
    return store.dispatch('FETCH_USER', {
      id: store.state.route.params.id
    })
  },

  mounted () {

  }
}
</script>
