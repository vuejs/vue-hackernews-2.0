# vue-hackernews-2.0 (WIP)

HackerNews clone built with Vue 2.0 + vue-router + vuex, with server-side rendering.

## Known Issue

`babel-preset-es2015-webpack` currently has a bug which will prevent the build from working. You can manually apply [this change](https://github.com/gajus/babel-preset-es2015-webpack/pull/13/files) to fix it before it gets a new release out.

## Build Setup

``` bash
# install dependencies
npm install

# serve in dev mode, with hot reload at localhost:8080
npm run dev

# build for production
npm run build

# serve in production mode
npm start
```
