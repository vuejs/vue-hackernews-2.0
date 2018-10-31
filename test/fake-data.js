import news from './fake-news.json'

const arrayToObject = (array) =>
   array.reduce((obj, item) => {
     obj[item.id] = item
     return obj
   }, {})

export const fakeItemList = arrayToObject(news)

const anItemId = 17944752
export const fakeItem = fakeItemList[anItemId]

export const fakeUser = { id: 17944752}

export const addedItemId = 17938548
export const newItemListAfterAddingNewItem = [ 1, 2, 3, 4, 5, addedItemId, 6, 7, 8, 9 ]
