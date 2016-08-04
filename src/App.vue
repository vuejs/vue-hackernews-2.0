<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <p>Current URL is: {{ $store.state.url }} (from the store)</p>
    <ul>
      <li><router-link to="/">News</router-link></li>
      <li><router-link to="/about">About</router-link></li>
    </ul>
    <transition name="view" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello Vue 2.0!'
    }
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
.view {
  transition: all .35s ease;
}
.view-enter, .view-leave-active {
  opacity: 0;
}
</style>
