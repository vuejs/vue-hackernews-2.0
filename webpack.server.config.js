const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackConfig = require('./webpack.client.config')

module.exports = merge(webpackConfig, {
  target: 'node',
  entry: './src/server-entry.js',
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
        VUE_ENV: '"server"'
      }
    })
  ]
})
