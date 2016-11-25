module.exports = {
  preserveWhitespace: false,
  postcss: [
    require('autoprefixer')({
      browsers: ['last 3 versions']
    })
  ]
}
