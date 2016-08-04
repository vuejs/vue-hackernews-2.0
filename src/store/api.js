import Firebase from 'firebase'
import LRU from 'lru-cache'

const inBrowser = typeof window !== 'undefined'

// When using bundleRenderer, the server-side application code runs in a new
// context for each request. To allow caching across multiple requests, we need
// to attach the cache to the process which is shared across all requests.
const cache = inBrowser
  ? createCache()
  : (process.__API_CACHE__ || (process.__API_CACHE__ = createCache()))

function createCache () {
  return LRU({
    max: 1000,
    maxAge: 1000 * 60 * 15 // 15 min cache
  })
}

// create a single api instance for all server-side requests
const api = inBrowser
  ? new Firebase('https://hacker-news.firebaseio.com/v0')
  : (process.__API__ || (process.__API__ = createServerSideAPI()))

function createServerSideAPI () {
  const api = new Firebase('https://hacker-news.firebaseio.com/v0')

  // cache the latest top stories' ids
  api.child(`topstories`).on('value', snapshot => {
    api.__topIds__ = snapshot.val()
  })

  // warm the cache every 15 min, since the front page changes quite often
  warmCache()
  function warmCache () {
    fetchItems((api.__topIds__ || []).slice(0, 30))
    setTimeout(warmCache, 1000 * 60 * 15)
  }

  return api
}

function fetch (child) {
  return new Promise((resolve, reject) => {
    api.child(child).once('value', snapshot => {
      resolve(snapshot.val())
    }, reject)
  })
}

export function fetchTopIds () {
  return api.__topIds__
    ? Promise.resolve(api.__topIds__)
    : fetch(`topstories`)
}

export function watchTopIds (cb) {
  api.child(`topstories`).on('value', snapshot => {
    const ids = snapshot.val()
    api.__topIds__ = ids
    cb(ids)
  })
}

export function fetchItem (id, forceRefresh) {
  if (!forceRefresh && cache.has(id)) {
    return Promise.resolve(cache.get(id))
  } else {
    return fetch(`item/${id}`).then(item => {
      cache.set(id, item)
      return item
    })
  }
}

export function fetchItems (ids) {
  return Promise.all(ids.map(id => fetchItem(id)))
}
