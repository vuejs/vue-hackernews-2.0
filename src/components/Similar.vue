
<template>
  <div class="similar-posts">
    <span class="title">Similar: </span>
    <ul class="list" v-if="story.similar && story.similar.length !== 0">
      <li  v-for="sim in story.similar" :key="sim.id">
        <router-link :to="'/item/' + sim.id">{{ sim.text }}</router-link>
      </li>
    </ul>
    <div v-else class="no-posts">
      <span class="title">No similar posts found.</span>
    </div>

  </div>
</template>

<script>

export default {
  name: 'similar-posts',
  props: ['story']
}
</script>

<style lang="stylus">
  .similar-posts
    line-height 1.2

    .title
      font-size .85em
    ul.list, .no-posts
      background-color #f3f3f3
      font-size .85em
      margin 4px 0
      padding 8px 12px
      border-radius 4px
      list-style circle inside
    a
      color: #828282;
      text-decoration: underline;

</style>
