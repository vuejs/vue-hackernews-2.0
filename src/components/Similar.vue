
<template>
  <div class="similar-posts">
    <span class="title">Similar: </span>
    <ul class="list" v-if="story.similar && story.similar.length !== 0">
      <li  v-for="sim in story.similar" :key="sim.id">
        <span class="box" v-bind:style="{ background: `rgba(255, 165, 0, ${sim.score})`}" v-bind:title="sim.score"></span>
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

    .box
      width: 12px
      height: .85em
      display: inline-block
      margin-right: 8px

    .title
      font-size .85em
    ul.list, .no-posts
      background-color #f3f3f3
      font-size .85em
      margin 4px 0
      padding 8px 12px
      border-radius 4px
      li
        padding: 4px
        display: flex
        align-items: center
    a
      color: #828282;

</style>
