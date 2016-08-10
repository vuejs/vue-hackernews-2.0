<template>
  <li class="news-item">
    <span class="score">{{ item.score }}</span>
    <template v-if="item.url">
      <a :href="item.url" target="_blank">{{ item.title }}</a>
      <span>({{ item.url | host }})</span>
    </template>
    <template v-else>
      <router-link :to="'/item/' + item.id">{{ item.title }}</router-link>
    </template>
    <br>
    by
    <router-link :to="'/user/' + item.by">
      {{ item.by }}
    </router-link>
    {{ item.time | timeAgo }} ago |
    <router-link :to="'/item/' + item.id">
      {{ item.descendants }} comments
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
