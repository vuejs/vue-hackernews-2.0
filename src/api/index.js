// this is aliased in webpack config based on server/client build
import { createAPI, fetchData } from 'create-api'

const logRequests = !!process.env.DEBUG_API

const api = createAPI({
  version: '/v0',
  config: {
    databaseURL: 'https://hacker-news.firebaseio.com'
  }
})

// warm the front page cache every 15 min
// make sure to do this only once across all requests
if (api.onServer) {
  warmCache()
}

function warmCache() {
  fetchItems((api.cachedIds.top || []).slice(0, 30))
  setTimeout(warmCache, 1000 * 60 * 15)
}

function fetch(child) {
  logRequests && console.log(`fetching ${child}...`)
  const cache = api.cachedItems
  if (cache && cache.has(child)) {
    logRequests && console.log(`cache hit for ${child}.`)
    return Promise.resolve(cache.get(child))
  } else {
    return new Promise((resolve, reject) => {
      api.child(child).once('value', snapshot => {
        const val = snapshot.val()
        // mark the timestamp when this item is cached
        if (val) val.__lastUpdated = Date.now()
        cache && cache.set(child, val)
        logRequests && console.log(`fetched ${child}.`)
        resolve(val)
      }, reject)
    })
  }
}

export function fetchIdsByType(type) {
  return api.cachedIds && api.cachedIds[type]
    ? Promise.resolve(api.cachedIds[type])
    : fetch(`${type}stories`)
}

export function fetchItem(id) {
  return fetch(`item/${id}`)
}

export function fetchItems(ids) {
  return Promise.all(ids.map(id => fetchItem(id)))
}

export function fetchUser(id) {
  return fetch(`user/${id}`)
}

export function watchList(type, cb) {
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

export function fetchSimilar(queries) {
  return fetchData('https://textsimilarity.research.peltarion.com/query/batch', {
    method: 'POST',
    body: JSON.stringify({
      queries,
      dataset: 'hn-sbert',
      top_n: 3
    })
  })
    .then(resp => resp.json())
    .then(json => json.rankings.map(i => i.entries));
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export default function sendFeedBack(query, result, rating) {
  if (document.sessionId === undefined) {
    document.sessionId = uuidv4()
  }
  return fetchData('https://textsimilarity.research.peltarion.com/feedback', {
    method: 'POST',
    body: JSON.stringify({
      query: query,
      result: result,
      rating: rating,
      dataset: 'hn-sbert',
      sessionId: document.sessionId
    })
  })
}
