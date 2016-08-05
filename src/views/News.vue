<template>
  <div>
    <h2>News <spinner :show="loading"></spinner></h2>
    <ul>
      <li>
        <router-link v-if="page > 1" :to="'/news/' + (page - 1)">prev</router-link>
        <a v-else class="disabled">prev</a>
      </li>
      <li>
        <router-link v-if="hasMore" :to="'/news/' + (page + 1)">more...</router-link>
        <a v-else class="disabled">more...</a>
      </li>
    </ul>
    <transition :name="transition">
      <div class="news-list" :key="displayPage">
        <transition-group tag="ul" name="item">
          <news-item v-for="item in displayItems" :key="item.id" :item="item">
          </news-item>
        </transition-group>
      </div>
    </transition>
  </div>
</template>

<script>
import Spinner from '../components/Spinner.vue'
import NewsItem from '../components/NewsItem.vue'

const fetchInitialData = store => {
  return store
    .dispatch(`FETCH_TOP_IDS`)
    .then(() => store.dispatch(`FETCH_NEWS`))
}

export default {
  name: 'news',
  prefetch: fetchInitialData,
  components: {
    Spinner,
    NewsItem
  },
  data () {
    return {
      loading: false,
      displayPage: this.$route.params.page,
      displayItems: this.$store.getters.news,
      transition: 'slide-left'
    }
  },
  computed: {
    page () {
      return Number(this.$route.params.page)
    },
    maxPage () {
      const { storiesPerPage, topStoryIds } = this.$store.state
      return Math.floor(topStoryIds.length / storiesPerPage)
    },
    hasMore () {
      return this.page < this.maxPage
    }
  },
  mounted () {
    fetchInitialData(this.$store)
    if (this.page > this.maxPage) {
      this.$router.push('/')
    }
  },
  watch: {
    '$route' (to, from) {
      this.loading = true
      this.$store.dispatch(`FETCH_NEWS`).then(() => {
        const toPage = Number(to.params.page)
        const fromPage = Number(from.params.page)
        this.transition = toPage > fromPage ? 'slide-left' : 'slide-right'
        this.displayPage = toPage
        this.displayItems = this.$store.getters.news.slice()
        this.loading = false
      })
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
  transform: translate(30px, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
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
