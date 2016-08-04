import { app, router } from './app'

export default context => {
  router.setInitialLocation(context.url)
  return app
}
