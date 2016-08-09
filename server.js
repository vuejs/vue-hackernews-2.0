process.env.VUE_ENV = 'server'

const fs = require('fs')
const path = require('path')
const express = require('express')
const favicon = require('serve-favicon')
const serialize = require('serialize-javascript')
const createBundleRenderer = require('vue-server-renderer').createBundleRenderer

const app = express()

// parse index.html template
const html = (() => {
  const template = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf-8')
  const i = template.indexOf('{{ APP }}')
  const style = process.env.NODE_ENV === 'production'
    ? '<link rel="stylesheet" href="/dist/styles.css">'
    : ''
  return {
    head: template.slice(0, i).replace('{{ STYLE }}', style),
    tail: template.slice(i + '{{ APP }}'.length)
  }
})()

// setup the server renderer, depending on dev/prod environment
let renderer
if (process.env.NODE_ENV !== 'production') {
  require('./build/setup-dev-server')(app, bundle => {
    renderer = createBundleRenderer(bundle)
  })
} else {
  // create server renderer from real fs
  const bundlePath = path.resolve(__dirname, './dist/server-bundle.js')
  renderer = createBundleRenderer(fs.readFileSync(bundlePath, 'utf-8'))
}

app.use('/dist', express.static(path.resolve(__dirname, './dist')))
app.use(favicon(path.resolve(__dirname, './src/assets/logo.png')))

app.get('*', (req, res) => {
  var s = Date.now()
  const context = { url: req.url }
  const renderStream = renderer.renderToStream(context)
  let firstChunk = true

  res.write(html.head)

  renderStream.on('data', chunk => {
    if (firstChunk) {
      // embed initial store state
      if (context.initialState) {
        res.write(
          `<script>window.__INITIAL_STATE__=${
            serialize(context.initialState, { isJSON: true })
          }</script>`
        )
      }
      firstChunk = false
    }
    res.write(chunk)
  })

  renderStream.on('end', () => {
    res.end(html.tail)
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
