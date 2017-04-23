const ExtractTextPlugin = require('extract-text-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  loaders: {
    stylus: ExtractTextPlugin.extract({
      use: 'css-loader!stylus-loader',
      fallback: 'vue-style-loader'
    })
  },
  preserveWhitespace: false,
  postcss: [
    require('autoprefixer')({
      browsers: ['last 3 versions']
    })
  ]
}
