<template>
  <div id="app">
    <div class="header">
      <img class="logo" src="./assets/logo.png">
    </div>
    <ul>
      <li><router-link to="/news/1">page 1</router-link></li>
      <li><router-link to="/news/2">page 2</router-link></li>
      <li><router-link to="/about">About</router-link></li>
    </ul>
    <transition name="view" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<style>
body {
  font-family: Roboto, Helvetica, sans-serif;
}
.logo {
  width: 30px;
}
.view {
  transition: all .35s ease;
}
.view-enter, .view-leave-active {
  opacity: 0;
}
</style>
