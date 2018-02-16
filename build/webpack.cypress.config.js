const path = require('path')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')

const config = merge(base, {
  resolve: {
    alias: {
      'create-api': './create-api-client.js'
    }
  }
})

module.exports = config