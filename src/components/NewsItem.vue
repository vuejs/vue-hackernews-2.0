<template>
  <li class="news-item">{{ item.title }}</li>
</template>

<script>
export default {
  name: 'NewsItem',
  props: ['item'],
  serverCacheKey: ({ item }) => `${item.id}:${item.score}:${item.descendents}`
}
</script>
