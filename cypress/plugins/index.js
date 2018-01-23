const join = require('path').join
const {
  onFilePreprocessor
} = require('cypress-vue-unit-test/preprocessor/webpack')
const config = join(__dirname, '../../build/webpack.base.config')
module.exports = on => {
  on('file:preprocessor', onFilePreprocessor(config))
}
