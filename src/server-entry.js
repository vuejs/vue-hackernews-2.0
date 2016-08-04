import { app, router, store } from './app'

export default context => {
  // When using vue-router, it will automatically pick up the url from the
  // context. We just need to resolve the store state.
  var s = Date.now()
  return Promise.all(router.getMatchedComponents().map(component => {
    if (component.prefetch) {
      return component.prefetch(store)
    }
  })).then(() => {
    console.log(`data pre-fetch: ${Date.now() - s}ms`)
    // set initial store on context
    // the request handler will inline the state in the HTML response.
    context.initialState = store.state
    return app
  })
}
