import { app, router, store } from './app'

export default context => {
  // set router's initial location
  router.setInitialLocation(context.url)
  // resolve store state
  return store.dispatch('setURL', context.url).then(() => {
    context.initialState = store.state
    return app
  })
}
