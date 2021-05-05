import { createApp } from 'vue'
import { createStore } from './store'
import { createRouter } from './router'
import { sync } from 'vuex-router-sync'
import titleMixin from './util/title'
import App from './App.vue'
import ProgressBar from './components/ProgressBar.vue'

const store = createStore()
const router = createRouter()

sync(store, router)

const app = createApp({
  router,
  ...App
})

app.use(store)

// global progress bar
const bar = createApp(ProgressBar).mount('#progress-container')
document.body.appendChild(bar.$el)
app.config.globalProperties.$bar = bar

// mixin for handling title
app.mixin(titleMixin)

// a global mixin that calls `asyncData` when a route component's params change
app.mixin({
  beforeRouteUpdate(to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      })
        .then(next)
        .catch(next)
    } else {
      next()
    }
  }
})

// Add router hook for handling asyncData.
router.beforeResolve((to, from, next) => {
  const matched = router.getMatchedComponents(to)
  const prevMatched = router.getMatchedComponents(from)
  let diffed = false
  const activated = matched.filter((c, i) => {
    return diffed || (diffed = prevMatched[i] !== c)
  })
  const asyncDataHooks = activated.map((c) => c.asyncData).filter((_) => _)
  if (!asyncDataHooks.length) {
    return next()
  }

  bar.start()
  Promise.all(asyncDataHooks.map((hook) => hook({ store, route: to })))
    .then(() => {
      bar.finish()
      next()
    })
    .catch(next)
})

// actually mount to DOM
app.mount('#app')
