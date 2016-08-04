<template>
  <li class="news-item">{{ item.title }}</li>
</template>

<script>
export default {
  name: 'NewsItem',
  props: ['item']
}
</script>
