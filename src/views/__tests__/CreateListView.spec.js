import { mount } from '@vue/test-utils'
import { addedItemId, fakeItemList, newItemListAfterAddingNewItem } from '../../../test/fake-data'
import { resolvePromises } from '../../../test/test-utils'
import { createStore } from '../../store'
import CreateListView from '../CreateListView'

const PAGE_TYPES = ['top', 'new', 'show', 'ask', 'job']

let wrapper, store, routerSpy
describe('CreateListView.vue', () => {

  beforeEach(()=> {
    store = createStore()
    routerSpy = jest.fn()
  })

  it('shows number of available pages', async () => {
    const page = 1
    wrapper = await renderComponent('top', page)

    expect(wrapper.find('.news-list-nav').text()).toBe('< prev 1/3 more >')
  })

  it('shows current page in paginator', async () => {
    const currentPage = 2
    wrapper = await renderComponent('top', currentPage)

    expect(wrapper.find('.news-list-nav').text()).toBe('< prev 2/3 more >')
  })

  PAGE_TYPES.forEach(async (type) => {
    it('calls FETCH_LIST_DATA action for page ' + type, async () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch')

        wrapper = await renderComponent(type)

        expect(dispatchSpy).toHaveBeenCalledWith('FETCH_LIST_DATA', {"type": type})
        expect(dispatchSpy.mock.calls.length).toBe(3)
    })
  })

  it('loads 20 items', async () => {
    wrapper = await renderComponent('top')

    expect(wrapper.findAll('.news-item')).toHaveLength(20)
  })

  describe('When new item is added in real time', ()=> {

    it('ENSURE_ACTIVE_ITEMS action is dispatched', async () => {
      const dispatchSpy = jest.spyOn(store, 'dispatch')

      wrapper = await renderComponent('top')

      expect(dispatchSpy).toHaveBeenCalledWith('ENSURE_ACTIVE_ITEMS')
    })

    it('The new list is set', async () => {
      const commitSpy = jest.spyOn(store, 'commit')

      wrapper = await renderComponent('top')
      expect(commitSpy).toHaveBeenCalledWith('SET_LIST', {"ids": newItemListAfterAddingNewItem, "type": "top"})
      expect(wrapper.text()).toContain(fakeItemList[addedItemId].title)
    })

    it('The title of the new added item is rendered', async () => {
      wrapper = await renderComponent('top')

      expect(wrapper.text()).toContain(fakeItemList[addedItemId].title)
    })
  })

})

async function renderComponent(type, page) {
  const $route = {
   path: '/some/path',
   params: { page }
  }
  store.state.route = $route

  const mixin = {
    beforeMount: function () {
       this.$root = {
        _isMounted: true
      }
    }
  }

  const wrapper = mount(CreateListView(type), { store,
    propsData: {
      type: 'type',
    },
    mocks: {
      $route,
      $bar: { start: jest.fn(), finish: jest.fn() }
    },
    stubs: ['router-link'],
    mixins: [mixin]
  })

  wrapper.vm.$options.asyncData({ store })
  await resolvePromises()

  return wrapper
}


