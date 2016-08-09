<template>
  <li class="news-item">{{ item.title }}</li>
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
</style>
