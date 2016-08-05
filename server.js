process.env.VUE_ENV = 'server'

const fs = require('fs')
const path = require('path')
const express = require('express')
const favicon = require('serve-favicon')
const serialize = require('serialize-javascript')
const createBundleRenderer = require('vue-server-renderer').createBundleRenderer

let renderer
function createRenderer (fs) {
  const bundlePath = path.resolve(__dirname, 'dist/server-bundle.js')
  return createBundleRenderer(fs.readFileSync(bundlePath, 'utf-8'))
}

const app = express()

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack')
  const clientConfig = require('./build/webpack.client.config')

  clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app]
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )

  const clientCompiler = webpack(clientConfig)
  app.use(require('webpack-dev-middleware')(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    stats: {
      colors: true,
      chunks: false
    }
  }))
  app.use(require('webpack-hot-middleware')(clientCompiler))

  // watch and update server renderer
  const MFS = require('memory-fs')
  const serverConfig = require('./build/webpack.server.config')
  const serverCompiler = webpack(serverConfig)
  const mfs = new MFS()
  serverCompiler.outputFileSystem = mfs
  serverCompiler.watch({}, (err, stats) => {
    if (err) throw err
    stats = stats.toJson()
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(err => console.warn(err))
    renderer = createRenderer(mfs)
  })
} else {
  app.use('/dist', express.static(path.resolve(__dirname, 'dist')))
  // create server renderer from real fs
  renderer = createRenderer(fs)
}

app.use(favicon(path.resolve(__dirname, 'src/assets/logo.png')))

app.get('*', (req, res) => {
  var s = Date.now()
  const context = { url: req.url }
  const renderStream = renderer.renderToStream(context)
  let firstChunk = true

  res.write(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>vue-hackernews-2.0</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
    ${process.env.NODE_ENV === 'production'
      ? `<link rel="stylesheet" href="/dist/styles.css">`
      : ``}
  </head>
  <body>`)

  renderStream.on('data', chunk => {
    if (firstChunk) {
      // send down initial store state
      if (context.initialState) {
        res.write(`<script>window.__INITIAL_STATE__=${
          serialize(context.initialState, { isJSON: true })
        }</script>`)
      }
      firstChunk = false
    }
    res.write(chunk)
  })

  renderStream.on('end', () => {
    res.end(`
      <script src="/dist/client-vendor-bundle.js"></script>
      <script src="/dist/client-bundle.js"></script>
      </body></html>`
    )
    console.log(`whole request: ${Date.now() - s}ms`)
  })

  renderStream.on('error', err => {
    throw err
  })
})

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})
