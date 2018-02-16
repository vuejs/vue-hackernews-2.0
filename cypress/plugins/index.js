const join = require('path').join
const {
  onFilePreprocessor
} = require('cypress-vue-unit-test/preprocessor/webpack')
const config = join(__dirname, '../../build/webpack.cypress.config')
module.exports = on => {
  on('file:preprocessor', onFilePreprocessor(config))
}
