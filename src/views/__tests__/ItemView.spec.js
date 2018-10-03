import { mount } from '@vue/test-utils'
import { resolvePromises } from '../../../test/test-utils'
import { createStore } from '../../store'
import { fakeItem } from '../../../test/fake-data'
import ItemView from '../ItemView'


let wrapper, store
describe('ItemView.vue', () => {

  beforeEach(()=> {
    store = createStore()
  })

  it('Renders item title', async () => {
    wrapper = await renderComponent(fakeItem.id)
    expect(wrapper.text()).toContain(fakeItem.title)
  })

  it('Renders item host', async () => {
    fakeItem.url = 'https://www.fake.domain.com/link/fake-uri'
    wrapper = await renderComponent(fakeItem.id)
    expect(wrapper.text()).toContain('fake.domain.com')
  })

  it('Renders item user', async () => {
    wrapper = await renderComponent(fakeItem.id)
    expect(wrapper.text()).toContain('| by ' + fakeItem.by)
  })

  it('Calls the action to fetch the item by id', async () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch')
    wrapper = renderComponent(fakeItem.id)
    expect(dispatchSpy).toHaveBeenCalledWith('FETCH_ITEMS', { ids: [fakeItem.id] })
  })

  it('Calls the action to fetch the comments by id', async () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch')
    wrapper = await renderComponent(fakeItem.id)
    expect(dispatchSpy).toHaveBeenCalledWith('FETCH_ITEMS', { ids: fakeItem.kids })
  })
})

async function renderComponent(id) {
  const route = {
   path: '/item',
   params: { id }
  }
  store.state.route = route

  const wrapper = mount(ItemView, { store,
    mocks: {
      $route: route,
    },
    stubs: ['router-link']
  })

  wrapper.vm.$options.asyncData({ store, route })
  await resolvePromises()

  return wrapper
}


