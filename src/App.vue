<template>
  <div id="app">
    <div class="header">
      <img class="logo" src="./assets/logo.png">
      <ul>
        <li>
          <router-link v-if="page > 1" :to="'/news/' + (page - 1)">prev</router-link>
          <a v-else class="disabled">prev</a>
        </li>
        <li>
          <router-link v-if="hasMore" :to="'/news/' + (page + 1)">more...</router-link>
          <a v-else class="disabled">more...</a>
        </li>
        <li><router-link to="/about">About</router-link></li>
      </ul>
    </div>
    <transition name="view" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  computed: {
    page () {
      return Number(this.$route.params.page)
    },
    hasMore () {
      const { storiesPerPage, topStoryIds } = this.$store.state
      return this.page < Math.ceil(topStoryIds.length / storiesPerPage)
    }
  }
}
</script>

<style>
body {
  font-family: Roboto, Helvetica, sans-serif;
}
.logo {
  width: 30px;
}
.view {
  transition: all .35s ease;
}
.view-enter, .view-leave-active {
  opacity: 0;
}
a {
  color: #4fc08d;
}
a.disabled {
  color: #999;
}
</style>
