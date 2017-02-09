const path = require('path')
const webpack = require('webpack')
const MFS = require('memory-fs')
const clientConfig = require('./webpack.client.config')
const serverConfig = require('./webpack.server.config')

module.exports = function setupDevServer (app, opts) {
  // modify client config to work with hot middleware
  clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app]
  clientConfig.output.filename = '[name].js'
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )

  // dev middleware
  const clientCompiler = webpack(clientConfig)
  const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    stats: {
      colors: true,
      chunks: false
    }
  })

  app.use(devMiddleware)
  // hot middleware
  app.use(require('webpack-hot-middleware')(clientCompiler))

  // watch and update server renderer
  const serverCompiler = webpack(serverConfig)
  const mfs = new MFS()
  const outputPath = path.join(serverConfig.output.path, serverConfig.output.filename)
  serverCompiler.outputFileSystem = mfs

  let indexHTMLPromise = new Promise((resolve) => {
    let isIndexHTMLReady = false
    clientCompiler.plugin('done', () => {
      const fs = devMiddleware.fileSystem
      const filePath = path.join(clientConfig.output.path, 'index.html')
      if (fs.existsSync(filePath)) {
        const index = fs.readFileSync(filePath, 'utf-8')
        opts.indexUpdated(index)
        if (!isIndexHTMLReady) {
          isIndexHTMLReady = true
          resolve()
        }
      }
    })
  })

  let serverBundlePromise = new Promise((resolve) => {
    let isServerBundleReady = false
    serverCompiler.watch({}, (err, stats) => {
      if (err) throw err
      stats = stats.toJson()
      stats.errors.forEach(err => console.error(err))
      stats.warnings.forEach(err => console.warn(err))
      opts.bundleUpdated(mfs.readFileSync(outputPath, 'utf-8'))
      if (!isServerBundleReady) {
        isServerBundleReady = true
        resolve()
      }
    })
  })

  return Promise.all([indexHTMLPromise, serverBundlePromise])
}
