module.exports = {
  "moduleFileExtensions": [
    "js",
    "json",
    // tell Jest to handle *.vue files
    "vue"
  ],
  "transform": {
    // process js with babel-jest
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
    // process *.vue files with vue-jest
    ".*\\.(vue)$": "<rootDir>/node_modules/vue-jest"
  },
  // support the same @ -> src alias mapping in source code
  "moduleNameMapper": {
    "^@/(.*)$": "<rootDir>/src/$1",
    '../api': '<rootDir>/src/api/__mocks__/fake-api.js'
  },
  // serializer for snapshots
  "snapshotSerializers": [
    "<rootDir>/node_modules/jest-serializer-vue"
  ],
  "setupTestFrameworkScriptFile": "<rootDir>/src/jest-setup.js"

}
