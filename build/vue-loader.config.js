module.exports = {
  postcss: [
    require('autoprefixer')({
      browsers: ['last 3 versions']
    })
  ]
}
