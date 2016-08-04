import Firebase from 'firebase'

const api = new Firebase('https://hacker-news.firebaseio.com/v0')

function fetch (child) {
  return new Promise((resolve, reject) => {
    api.child(child).once('value', snapshot => {
      resolve(snapshot.val())
    }, reject)
  })
}

export function fetchTopIds () {
  return fetch(`topstories`)
}

export function watchTopIds (cb) {
  api.child(`topstories`).on('value', snapshot => {
    cb(snapshot.val())
  })
}

export function fetchItem (id) {
  return fetch(`item/${id}`)
}

export function fetchItems (ids) {
  return Promise.all(ids.map(id => fetchItem(id)))
}
