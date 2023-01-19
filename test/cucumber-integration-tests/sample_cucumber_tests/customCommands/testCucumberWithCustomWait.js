const {Given, Then} = require('@cucumber/cucumber');

Given('I navigate to localhost', function() {

  return browser.url('http://localhost');
});

Then('I check if badElement is present', async function() {

  await browser.customWaitForPresent('#badElement');
  await browser.click('#webdriver');
});