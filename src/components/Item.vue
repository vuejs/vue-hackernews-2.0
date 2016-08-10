<template>
  <li class="news-item">
    <a :href="item.url" target="_blank">{{ item.title }}</a><br>
    <router-link :to="'/item/' + item.id">
      {{ item.descendants }} comments
    </router-link>
    | by
    <router-link :to="'/user/' + item.by">
      {{ item.by }}
    </router-link>
  </li>
</template>

<script>
export default {
  name: 'NewsItem',
  props: ['item']
}
</script>

<style lang="stylus">
.news-item
  background-color #fff
  margin 10px 0
</style>
