import { Selector, ClientFunction } from 'testcafe'; // first import testcafe selectors

// the fixture declares what we are testing
fixture `Home`// declare the fixture
    .page `http://localhost:8080`;  // specify the start page

// we can define a client function, those functions will run on the client side
// find the url of the current document
const getLocation = ClientFunction(() => document.location.href);

test('can change news page', async t => {
    await t
        .click('.news-list-nav>a[href="/top/2"]')
        .expect(getLocation()).contains('/top/2')
        .expect(Selector('.news-list-nav>span').withText('2/')).ok('the news nav should show that we changed page');
});

test('can see the user page by clicking a user url', async t => {
    await t
        .click('.by>a')
        .expect(getLocation()).contains('/user/')
        .expect(Selector('.user-view.view')).ok('the user view have been loaded');
});

test('can see the comments page by clicking a comments url', async t => {
    await t
        .click('.comments-link>a')
        .expect(getLocation()).contains('/item/')
        .expect(Selector('.item-view-comments-header')).ok('there is a comments header here');
});
