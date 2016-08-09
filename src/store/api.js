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

  // cache the latest story ids
  api.__ids__ = {}
  ;['top', 'new', 'show', 'ask', 'job'].forEach(type => {
    api.child(`${type}stories`).on('value', snapshot => {
      api.__ids__[type] = snapshot.val()
    })
  })

  // warm the front page cache every 15 min
  warmCache()
  function warmCache () {
    fetchItems((api.__ids__.top || []).slice(0, 30))
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

export function fetchIdsByType (type) {
  return api.__ids__ && api.__ids__[type]
    ? Promise.resolve(api.__ids__[type])
    : fetch(`${type}stories`)
}

export function fetchItem (id, forceRefresh) {
  if (!forceRefresh && cache.get(id)) {
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

export function watchList (type, cb) {
  let first = true
  const ref = api.child(`${type}stories`)
  const handler = snapshot => {
    if (first) {
      first = false
    } else {
      cb(snapshot.val())
    }
  }
  ref.on('value', handler)
  return () => {
    ref.off('value', handler)
  }
}
