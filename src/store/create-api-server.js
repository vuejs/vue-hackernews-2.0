import Firebase from 'firebase'
import LRU from 'lru-cache'

let api

if (process.__API__) {
  api = process.__API__
} else {
  api = process.__API__ = new Firebase('https://hacker-news.firebaseio.com/v0')

  // fetched item cache
  api.cachedItems = LRU({
    max: 1000,
    maxAge: 1000 * 60 * 15 // 15 min cache
  })

  // cache the latest story ids
  api.cachedIds = {}
  ;['top', 'new', 'show', 'ask', 'job'].forEach(type => {
    api.child(`${type}stories`).on('value', snapshot => {
      api.cachedIds[type] = snapshot.val()
    })
  })
}

export default api
