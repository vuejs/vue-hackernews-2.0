<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <ul>
      <li><router-link to="/">News</router-link></li>
      <li><router-link to="/about">About</router-link></li>
    </ul>
    <router-view></router-view>
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
</style>
