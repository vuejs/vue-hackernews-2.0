import { mount } from '@vue/test-utils';
import ProgressBar from '@/components/ProgressBar.vue';

describe('snapshot - Spinner.vue', () => {
    // mount our progress bar
    const wrapper = mount(ProgressBar);

    // test that the progress bar is rendering in the same way as before
    it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot()
    })
});
