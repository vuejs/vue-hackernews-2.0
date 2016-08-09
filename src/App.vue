<template>
  <div id="app">
    <div class="header">
      <a href="http://vuejs.org" target="_blank">
        <img class="logo" src="./assets/logo.png">
      </a>
      <router-link to="/">News</router-link>
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
  transition all .35s ease

.view-enter, .view-leave-active
  opacity 0

a
  color #4fc08d

a.disabled
  color #999
</style>
