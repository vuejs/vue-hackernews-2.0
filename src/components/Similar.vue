
<template>
  <div class="similar-posts">
    <ul class="list" v-if="story.similar && story.similar.length !== 0">
      <li v-for="sim in story.similar" :key="sim.id">
        <router-link :to="'/item/' + sim.id">
          <b>{{ new Date(sim.time * 1000).getFullYear() }}</b>
          | {{ sim.title }}
          | {{ sim.descendants }} comments
        </router-link>
        <client-only>
          <div class="stars">
            <star-rating
              v-bind:star-size="15"
              active-color="#000000"
              v-bind:show-rating="false"
              @rating-selected="setRating($event, sim.title, story.title)"
              v-bind:inline="true"
            ></star-rating>
          </div>
        </client-only>
      </li>
    </ul>
    <div v-else class="no-posts">
      <span class="title">Something went wrong retrieving similar stories 😕.</span>
    </div>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
import ClientOnly from "vue-client-only";
import sendFeedBack from "../api";

export default {
  name: "similar-posts",
  props: ["story"],
  components: {
    StarRating,
    ClientOnly
  },

  methods: {
    getColor: function(score) {
      const found = this.colorStops.find(
        cs => score.toFixed(2) >= cs.start && score.toFixed(2) < cs.stop
      );
      return found.color;
    },

    setRating: function(rating, similar, story) {
      sendFeedBack(story, similar, rating);
    }
  }
};
</script>

<style lang="stylus">
.stars {
  position: absolute;
  right: 40px;
}

.similar-posts {
  line-height: 1.2;

  .box {
    width: 12px;
    height: 0.85em;
    display: inline-block;
    margin-right: 8px;
  }

  .rank-cta {
    font-family: 'Courier New', Courier, monospace;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    position: absolute;
    right: 40px;
    width: 75px;
  }

  .similar-title {
    font-family: 'Courier New', Courier, monospace;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
  }

  ul.list, .no-posts {
    background-color: #fff;
    font-size: 0.85em;
    margin: 4px 0;
    padding: 8px 12px;
    border-radius: 4px;

    li {
      padding: 4px;
      padding-right: 80px;
      display: flex;
      align-items: center;
    }
  }

  a {
    color: #828282;
  }
}
</style>
