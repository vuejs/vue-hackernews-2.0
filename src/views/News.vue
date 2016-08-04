<template>
  <div>
    <h2>News</h2>
    <transition :name="transition">
      <ul class="news-list" :key="$route.params.page">
        <li v-for="item in news" :key="item.id">
          {{ item.title }}
        </li>
      </ul>
    </transition>
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
  data () {
    return {
      transition: 'slide-left'
    }
  },
  created () {
    if (typeof window !== 'undefined') {
      fetchData(this.$store)
    }
  },
  watch: {
    '$route' (to, from) {
      this.$store.dispatch(`FETCH_NEWS`)
      this.transition = to.params.page > from.params.page
        ? 'slide-left'
        : 'slide-right'
    }
  },
  computed: {
    news () {
      return this.$store.getters.news
    }
  }
}
</script>

<style>
.news-list {
  position: absolute;
  transition: all .5s cubic-bezier(.55,0,.1,1);
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
</style>
