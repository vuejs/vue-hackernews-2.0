<template>
  <div class="news-view">
    <div>
      <accordion class="page-accordion" title="HN Time-Machine">
        <p>HN Time-Machine is yet another HackerNews clone, but with a slight twist.</p>
        <p>
          Each story on the current HackerNews frontpage is presented with the
          top 3 most similar stories based on their titles between 2006 and
          2015. More specifically the titles are encoded into semantically
          meaningful vectors and then ranked using cosine similarity.
          If you want to learn more this, check out our
          <a
            class="external-link"
            href="https://docs.google.com/document/d/1UV4GBtMiJEgb19ucLhUGpv1frdDNZI6-qTW-1w0zNdM"
          >blog post</a>.
        </p>

        <p>
          You will probably notice that your milage may vary.
          Part of that could be attributed to there just not being a similar
          story in the past. But, likely, also part of the reason is that the
          model that encodes the sentences was trained on a different domain.
          So, you can help to (maybe) improve the results in the
          making use of the star ranking.
        </p>

        <p>
          For feedback and suggestions please reach out to
          <a
            class="external-link"
            href="https://twitter.com/phileisn"
          >@phileisn</a>.
        </p>
      </accordion>
      <p class="subtitle">Today's stories along with the most similar ones between 2006 and 2015.</p>
      <p class="credits">
        Built by
        <a
          class="external-link"
          href="https://twitter.com/phileisn"
          target="_blank"
          rel="noopener"
        >@phileisn</a> and
        <a
          class="external-link"
          href="https://twitter.com/nilpath"
          target="_blank"
          rel="noopener"
        >@nilpath</a>
        at
        <a
          class="external-link"
          href="https://peltarion.com/"
          target="_blank"
          rel="noopener"
        >Peltarion</a>
        using
        <a
          class="external-link"
          href="https://github.com/UKPLab/sentence-transformers"
          target="_blank"
          rel="noopener"
        >sentence-transformers</a>,
        <a
          class="external-link"
          href="https://github.com/vuejs/vue-hackernews-2.0"
          target="_blank"
          rel="noopener"
        >Vue.js</a> and
        <a
          class="external-link"
          href="https://github.com/nmslib/hnswlib"
          target="_blank"
          rel="noopener"
        >hnswlib</a>.
      </p>
    </div>
    <div class="footer">
      <div class="news-list-nav">
        <router-link v-if="page > 1" :to="'/' + type + '/' + (page - 1)">&lt; prev</router-link>
        <a v-else class="disabled">&lt; prev</a>
        <span>{{ page }}/{{ maxPage }}</span>
        <router-link v-if="hasMore" :to="'/' + type + '/' + (page + 1)">more &gt;</router-link>
        <a v-else class="disabled">more &gt;</a>
      </div>
    </div>

    <transition :name="transition">
      <div class="news-list" :key="displayedPage" v-if="displayedPage > 0">
        <transition-group tag="ul" name="item">
          <item v-for="item in displayedItems" :key="item.id" :item="item"></item>
        </transition-group>
      </div>
    </transition>
  </div>
</template>

<script>
import { watchList } from "../api";
import Item from "../components/Item.vue";
import Accordion from "../components/Accordion.vue";

export default {
  name: "item-list",

  components: {
    Item,
    Accordion
  },

  props: {
    type: String
  },

  data() {
    return {
      transition: "slide-right",
      displayedPage: Number(this.$route.params.page) || 1,
      displayedItems: this.$store.getters.activeItems
    };
  },

  computed: {
    page() {
      return Number(this.$route.params.page) || 1;
    },
    maxPage() {
      const { itemsPerPage, lists } = this.$store.state;
      return Math.ceil(lists[this.type].length / itemsPerPage);
    },
    hasMore() {
      return this.page < this.maxPage;
    }
  },

  beforeMount() {
    if (this.$root._isMounted) {
      this.loadItems(this.page);
    }
    // watch the current list for realtime updates
    this.unwatchList = watchList(this.type, ids => {
      this.$store.commit("SET_LIST", { type: this.type, ids });
      this.$store.dispatch("ENSURE_ACTIVE_ITEMS").then(() => {
        this.displayedItems = this.$store.getters.activeItems;
      });
    });
  },

  beforeDestroy() {
    this.unwatchList();
  },

  watch: {
    page(to, from) {
      this.loadItems(to, from);
    }
  },

  methods: {
    loadItems(to = this.page, from = -1) {
      this.$bar.start();
      this.$store
        .dispatch("FETCH_LIST_DATA", {
          type: this.type
        })
        .then(() => {
          if (this.page < 0 || this.page > this.maxPage) {
            this.$router.replace(`/${this.type}/1`);
            return;
          }
          this.transition =
            from === -1 ? null : to > from ? "slide-left" : "slide-right";
          this.displayedPage = to;
          this.displayedItems = this.$store.getters.activeItems;
          this.$bar.finish();
        });
    }
  }
};
</script>

<style lang="stylus">
.news-view {
  padding-top: 23px;
}

.page-accordion {
  padding-left: 10px;
  padding-right: 10px;
}

.news-list {
  background: #fff;
  border-radius: 2px;
}

.footer {
  background: #fff;
  padding: 10px 30px;
  position: fixed;
  text-align: center;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 998;
  box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.1);
}

.news-list-nav {
  border-radius: 2px;

  a {
    margin: 0 1em;
  }

  .disabled {
    color: #ccc;
  }
}

.subtitle {
  font-size: 18px;
  line-height: 18px;
  padding-left: 10px;
  padding-right: 10px;
}

.credits {
  font-family: 'Courier New', Courier, monospace;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 13px;
  padding-left: 10px;
  padding-right: 10px;
}

.news-list {
  position: absolute;
  margin: 30px 0;
  width: 100%;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
}

.slide-left-enter, .slide-right-leave-to {
  opacity: 0;
  transform: translate(30px, 0);
}

.slide-left-leave-to, .slide-right-enter {
  opacity: 0;
  transform: translate(-30px, 0);
}

.item-move, .item-enter-active, .item-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
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

@media (max-width: 600px) {
  .news-list {
    margin: 10px 0;
  }
}
</style>
