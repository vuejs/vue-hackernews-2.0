<template>
  <div class>
    <div class="tab__header">
      <a href="#" @click.prevent="active = !active">
        <span class="accordion-title">{{title}}</span>
        <span class="expand-cta cta" v-show="!active">(click to learn more ▼)</span>
        <span class="collapse-cta cta" v-show="active">(click for more space ▲)</span>
      </a>
    </div>
    <div class="tab__content p-2" v-show="active">
      <slot />
    </div>
  </div>
</template>>


<style lang="stylus">
.accordion-title {
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 20px;
}

.cta {
  display: table;
}
</style>


<script>
export default {
  name: "accordion",
  props: ["title"],
  data() {
    return {
      active: false
    };
  }
};
</script>

