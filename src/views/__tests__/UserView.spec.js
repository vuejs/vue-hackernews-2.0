import { mount } from '@vue/test-utils'
import { fakeUser } from '../../../test/fake-data'
import { resolvePromises } from '../../../test/test-utils'
import { createStore } from '../../store'
import UserView from '../UserView'

let wrapper, store, route
describe('UserView.vue', () => {

  beforeEach(() => {
    route = userRoute(fakeUser.id)
    store = createStore()
  })

  it('Renders user id', async () => {
    wrapper = await renderComponent(route)
    expect(wrapper.text()).toContain(`User : ${fakeUser.id}`)
  })

  it('Renders time since creation', async () => {
    fakeUser.created = new Date('September 07 2018')/1000
    Date.now = jest.fn(() => new Date('September 09 2018'))

    wrapper = await renderComponent(route)

    expect(wrapper.text()).toContain('2 days ago')
  })

  it('Calls the action to fetch the user by id', async () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch')

    await renderComponent(route)

    expect(dispatchSpy).toHaveBeenCalledWith('FETCH_USER', { id: fakeUser.id })
    expect(dispatchSpy.mock.calls.length).toBe(1)
  })
})

const userRoute = (id) => ({
 path: '/user',
 params: { id }
})

const renderComponent = async route => {
  const wrapper = mount(UserView, { store,
    mocks: {
      $route: route,
    }
  })

  wrapper.vm.$options.asyncData({ store, route })
  await resolvePromises()

  return wrapper
}
