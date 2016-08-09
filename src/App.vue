<template>
  <div id="app">
    <div class="header">
      <a href="http://vuejs.org" target="_blank">
        <img class="logo" src="./assets/logo.png">
      </a>
      <router-link to="/top">Top</router-link>
      <router-link to="/new">New</router-link>
      <router-link to="/show">Show</router-link>
      <router-link to="/ask">Ask</router-link>
      <router-link to="/job">Jobs</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <transition name="view" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<style lang="stylus">
body
  font-family Roboto, Helvetica, sans-serif

.logo
  width 30px

.view
  transition all .2s ease

.view-enter, .view-leave-active
  opacity 0

a
  color #333
  transition color .15s ease
  &.router-link-active
    color #4fc08d
  &.disabled
    color #999
</style>
