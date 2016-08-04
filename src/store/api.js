export function fetchItems (ids) {
  return new Promise(resolve => {
    resolve([{ id: 1, title: 'foo' }, { id: 2, title: 'bar' }])
  })
}
