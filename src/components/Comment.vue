<template>
  <li v-if="comment" class="comment">
    <div class="by">
      <router-link :to="'/user/' + comment.by">{{ comment.by }}</router-link>
      {{ comment.time | timeAgo }} ago
      <span v-if="comment.kids && comment.kids.length">
        | <a class="expand" @click="open = !open">
          {{ (open ? 'collapse ' : 'expand ') + pluralize(comment.kids.length) }}
        </a>
      </span>
    </div>
    <div class="text" v-html="comment.text"></div>
    <ul class="comment-children" v-show="open">
      <comment v-for="id in comment.kids" :id="id"></comment>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'comment',
  props: ['id'],
  data () {
    return {
      open: true
    }
  },
  computed: {
    comment () {
      return this.$store.state.items[this.id]
    }
  },
  beforeMount () {
    this.$store.dispatch('FETCH_ITEMS', {
      ids: [this.id]
    })
  },
  methods: {
    pluralize (n) {
      return n + (n === 1 ? ' reply' : ' replies')
    }
  }
}
</script>

<style lang="stylus">
.comment-children
  .comment-children
    margin-left 1em

.comment
  border-top 1px solid #eee
  position relative
  .expand
    cursor pointer
  .by, .text
    font-size .9em
    padding 1em 0
  .by
    color #999
    padding-bottom 0
    a
      color #999
      text-decoration underline
  .text
    a:hover
      color #ff6600
</style>
