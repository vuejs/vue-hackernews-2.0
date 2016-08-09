<template>
  <div>
    <ul class="news-list-nav">
      <li>
        <router-link v-if="page > 1" :to="'/' + type + '/' + (page - 1)">prev</router-link>
        <a v-else class="disabled">prev</a>
      </li>
      <li>
        <router-link v-if="hasMore" :to="'/' + type + '/' + (page + 1)">more...</router-link>
        <a v-else class="disabled">more...</a>
      </li>
      <li>
        <spinner :show="loading"></spinner>
      </li>
    </ul>
    <transition :name="transition">
      <div class="news-list" :key="displayedPage">
        <transition-group tag="ul" name="item">
          <news-item v-for="item in displayedItems" :key="item.id" :item="item">
          </news-item>
        </transition-group>
      </div>
    </transition>
  </div>
</template>

<script>
import Spinner from './Spinner.vue'
import NewsItem from './NewsItem.vue'

export default {
  name: 'NewsList',

  components: {
    Spinner,
    NewsItem
  },

  props: {
    type: String
  },

  data () {
    return {
      loading: false,
      transition: 'slide-left',
      displayedPage: Number(this.$store.state.route.params.page) || 1,
      displayedItems: this.$store.getters.activeItems
    }
  },

  computed: {
    page () {
      return Number(this.$store.state.route.params.page) || 1
    },
    maxPage () {
      const { itemsPerPage, lists } = this.$store.state
      return Math.ceil(lists[this.type].length / itemsPerPage)
    },
    hasMore () {
      return this.page < this.maxPage
    }
  },

  mounted () {
    this.loadItems(this.page, -1)
  },

  watch: {
    page (to, from) {
      this.loadItems(to, from)
    }
  },

  methods: {
    loadItems (to, from) {
      this.loading = true
      this.$store.dispatch('FETCH_DATA_FOR_TYPE', {
        type: this.type
      }).then(() => {
        if (this.page < 0 || this.page > this.maxPage) {
          this.$router.replace(`/${this.type}/1`)
          return
        }
        this.transition = to > from ? 'slide-left' : 'slide-right'
        this.displayedPage = to
        this.displayedItems = this.$store.getters.activeItems
        this.loading = false
      })
    }
  }
}
</script>

<style lang="stylus">
.news-list
  position absolute
  transition all .5s cubic-bezier(.55,0,.1,1)

.slide-left-enter, .slide-right-leave-active
  opacity 0
  transform translate(30px, 0)

.slide-left-leave-active, .slide-right-enter
  opacity 0
  transform translate(-30px, 0)

.item-move, .item-enter-active, .item-leave-active
  transition all .5s cubic-bezier(.55,0,.1,1)

.item-enter
  opacity 0
  transform translate(30px, 0)

.item-leave-active
  position absolute
  opacity 0
  transform translate(30px, 0)
</style>
