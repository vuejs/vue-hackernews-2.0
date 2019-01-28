import { Selector, ClientFunction } from 'testcafe'; // first import testcafe selectors

// the fixture declares what we are testing
fixture `Home`// declare the fixture
    .page `http://localhost:8080`;  // specify the start page

// we can define a client function, this function will run on the client side
const findText = ClientFunction((text) => Selector('*').withText(text).innerText.trim());

test('can change news page', async t => {
    await t
        .click('a[href="/top/2"]')
        // Use the assertion to check if the actual header text is equal to the expected one
        .expect(Boolean(findText('2/24'))).eql(true);
});
