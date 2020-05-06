<template>
  <div id="app">
    <header class="header">
      <nav class="inner">
        <a href="https://peltarion.com">
          <img class="logo" src="~public/logo-48.png" alt="logo" />
        </a>
        <router-link to="/top">Top</router-link>
        <router-link to="/new">New</router-link>
        <router-link to="/show">Show</router-link>
        <router-link to="/ask">Ask</router-link>
        <router-link to="/job">Jobs</router-link>
      </nav>
    </header>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<style lang="stylus">
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-style: normal;
  font-weight: normal;
  line-height: 22px;
  font-size: 15px;
  background-color: #fff;
  margin: 0;
  padding-top: 55px;
  color: #34495e;
  overflow-y: scroll;
}

footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  height: 40x;
  box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.external-link {
  text-decoration: underline;
}

a {
  color: #34495e;
  text-decoration: none;
}

.header {
  background-color: #F7955B;
  position: fixed;
  z-index: 999;
  height: 55px;
  top: 0;
  left: 0;
  right: 0;

  .inner {
    max-width: 800px;
    box-sizing: border-box;
    margin: 0px auto;
    padding: 15px 5px;
  }

  a {
    color: #111F27;
    line-height: 24px;
    transition: color 0.15s ease;
    display: inline-block;
    vertical-align: middle;
    font-weight: 300;
    letter-spacing: 0.075em;
    margin-right: 1.8em;

    &:hover {
      color: #fff;
    }

    &.router-link-active {
      color: #fff;
    }

    &:nth-child(6) {
      margin-right: 0;
    }
  }
}

.logo {
  width: 24px;
  margin-right: 10px;
  display: inline-block;
  vertical-align: middle;
}

.view {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
}

@media (max-width: 860px) {
  .header .inner {
    padding: 15px 30px;
  }
}

@media (max-width: 600px) {
  .header {
    .inner {
      padding: 15px;
    }

    a {
      margin-right: 1em;
    }
  }
}
</style>
