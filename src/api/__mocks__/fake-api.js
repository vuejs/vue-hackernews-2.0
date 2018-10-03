import { addedItemId, fakeItemList, fakeUser, newItemListAfterAddingNewItem } from '../../../test/fake-data'

export function fetchIdsByType(type) {
 return Promise.resolve(Object.keys(fakeItemList))
}

export function fetchItem (id) {
  return Promise.resolve(fakeItemList[id])
}

export function watchList (type, cb) {
  cb(newItemListAfterAddingNewItem)
}

export function fetchItems (ids) {
  return Promise.all(ids.map(id => fetchItem(id)))
}

export function fetchUser (id) {
  if (id === fakeUser.id) return Promise.resolve(fakeUser)
  return Promise.reject('User not found')
}


