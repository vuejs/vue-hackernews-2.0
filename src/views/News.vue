<template>
  <div>
    <h2>News</h2>
    <transition :name="transition">
      <div class="news-list" :key="$route.params.page">
        <transition-group tag="ul" name="item">
          <news-item v-for="item in news" :key="item.id" :item="item">
          </news-item>
        </transition-group>
      </div>
    </transition>
  </div>
</template>

<script>
import NewsItem from '../components/NewsItem.vue'

const fetchData = store => {
  return store
    .dispatch(`FETCH_TOP_IDS`)
    .then(() => store.dispatch(`FETCH_NEWS`))
}

export default {
  name: 'news',
  prefetch: fetchData,
  components: {
    NewsItem
  },
  data () {
    return {
      transition: 'slide-left'
    }
  },
  computed: {
    news () {
      return this.$store.getters.news
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
.item-move, .item-enter-active, .item-leave-active {
  transition: all .5s cubic-bezier(.55,0,.1,1);
}
.item-enter {
  opacity: 0;
  transform: translate(30px, 0);
}
.item-leave-active {
  position: absolute;
  opacity: 0;
  transform: translate(30px, 0);
}
</style>
