import Firebase from 'firebase'
import LRU from 'lru-cache'

const inBrowser = typeof window !== 'undefined'

// When using bundleRenderer, the server-side application code runs in a new
// context for each request. To allow caching across multiple requests, we need
// to attach the cache to the process which is shared across all requests.
const cache = inBrowser
  ? null
  : (process.__API_CACHE__ || (process.__API_CACHE__ = LRU({ max: 1000 })))

// create a single api instance for all server-side requests
// and cache the latest top Ids on it.
const api = inBrowser
  ? new Firebase('https://hacker-news.firebaseio.com/v0')
  : (process.__API__ || (process.__API__ = createServerSideAPI()))

function createServerSideAPI () {
  const api = new Firebase('https://hacker-news.firebaseio.com/v0')
  api.child(`topstories`).on('value', snapshot => {
    api.__topIds__ = snapshot.val()
  })
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
  if (!forceRefresh && cache && cache.has(id)) {
    return Promise.resolve(cache.get(id))
  } else {
    return fetch(`item/${id}`).then(item => {
      cache && cache.set(id, item)
      return item
    })
  }
}

export function fetchItems (ids) {
  return Promise.all(ids.map(id => fetchItem(id)))
}
