import { mount } from '@vue/test-utils';
import Spinner from '@/components/Spinner.vue';

// describe a test name
describe('Spinner.vue', () => {
    // mount our spinner
    const wrapper = mount(Spinner);

    // test for having svg
    it('has svg', () => {
        expect(wrapper.contains('svg')).toBe(true)
    })
});
