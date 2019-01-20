# vue-hackernews-2.0

HackerNews clone built with Vue 2.0 + vue-router + vuex, with server-side rendering.

<p align="center">
  <a href="https://vue-hn.herokuapp.com" target="_blank">
    <img src="https://cloud.githubusercontent.com/assets/499550/17546273/5aabc5fc-5eaf-11e6-8d6a-ad00937e8bd6.png" width="700px">
    <br>
    Live Demo
  </a>
</p>

## Features

> Note: in practice, it is unnecessary to code-split for an app of this size (where each async chunk is only a few kilobytes), nor is it optimal to extract an extra CSS file (which is only 1kb) -- they are used simply because this is a demo app showcasing all the supported features.

- Server Side Rendering
  - Vue + vue-router + vuex working together
  - Server-side data pre-fetching
  - Client-side state & DOM hydration
  - Automatically inlines CSS used by rendered components only
  - Preload / prefetch resource hints
  - Route-level code splitting
- Progressive Web App
  - App manifest
  - Service worker
  - 100/100 Lighthouse score
- Single-file Vue Components
  - Hot-reload in development
  - CSS extraction for production
- Animation
  - Effects when switching route views
  - Real-time list updates with FLIP Animation

## A Note on Performance

This is a demo primarily aimed at explaining how to build a server-side rendered Vue app, as a companion to our SSR documentation. There are a few things we probably won't do in production if we were optimizing for performance, for example:

- This demo uses the Firebase-based HN API to showcase real-time updates, but the Firebase API also comes with a larger bundle, more JavaScript to parse on the client, and doesn't offer an efficient way to batch-fetch pages of items, so it impacts performance quite a bit on a cold start or cache miss.

- In practice, it is unnecessary to code-split for an app of this size (where each async chunk is only a few kilobytes so the extra request isn't really worth it), nor is it optimal to extract an extra CSS file (which is only 1kb).

It is therefore not recommended to use this app as a reference for Vue SSR performance - instead, do your own benchmarking, and make sure to measure and optimize based on your actual app constraints.

## Architecture Overview

<img width="973" alt="screen shot 2016-08-11 at 6 06 57 pm" src="https://cloud.githubusercontent.com/assets/499550/17607895/786a415a-5fee-11e6-9c11-45a2cfdf085c.png">

**A detailed Vue SSR guide can be found [here](https://ssr.vuejs.org).**

## Build Setup

**Requires Node.js 7+**

``` bash
# install dependencies
npm install # or yarn

# serve in dev mode, with hot reload at localhost:8080
npm run dev

# build for production
npm run build

# serve in production mode
npm start
```

## License

MIT
