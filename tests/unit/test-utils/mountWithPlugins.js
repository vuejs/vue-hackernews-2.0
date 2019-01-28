import {mount, createLocalVue} from '@vue/test-utils';
import Router from 'vue-router';
import { createStore } from '@/store';
import * as filters from '@/util/filters'
import Vue from 'vue';

// does a shallow mount with a all the required stuff like vuex, i18n, router, etc...
// also allows us to mock the store state
export function mountWithPlugins(componentToMount, options = {}, mockStoreState = {}) {
    const localVue = createLocalVue();

    // register global utility filters.
    Object.keys(filters).forEach(key => {
        Vue.filter(key, filters[key])
    });

    // generate an empty router so $route will be available
    Vue.use(Router);
    const router = new Router({});


    // merge the old state with the new state, and replace it in the store
    const store = createStore();
    store.replaceState({...store.state, ...mockStoreState});

    // mount the component with all the options we added
    return mount(componentToMount, {
        localVue,
        router,
        store,
        ...options,
    });
}
