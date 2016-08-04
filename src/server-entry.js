import { app, router, store } from './app'

export default context => {
  // set router's initial location
  router.setInitialLocation(context.url)
  // resolve store state
  return Promise.all(router.history.current.matched.map(m => {
    return Promise.all(Object.keys(m.components).map(key => {
      const component = m.components[key]
      if (component.prefetch) {
        return component.prefetch(store)
      }
    }))
  })).then(() => {
    context.initialState = store.state
    return app
  })
}
