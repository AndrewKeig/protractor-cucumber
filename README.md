protractor-cucumber
==============

protractor-cucumber allows one to drive protractor tests using cucumber

## Installation

Install npm package to dev dependencies

```
npm install protractor-cucumber --save-dev
```

## Usage


#### Install Cucumber

``` npm install -g cucumber ```

#### Install protractor

``` npm install -g protractor ```

#### Update webdriver

``` webdriver-manager update ```


#### Start Selenium

``` webdriver-manager start ```

#### Create a feature file


Below demonstrates how to use `protractor-cucumber`

`seleniumAddress` is the address of a running selenium standalone server

`protractor-cucumber` returns a `world` object; which you can configure; with options described below.


Lets create a steps file in `features/step_definitions/steps.js`

```javascript
var pc = require('protractor-cucumber');

var steps = function() {
  var seleniumAddress = 'http://localhost:4444/wd/hub';
  var options = { browser : 'chrome', timeout : 100000 };
  this.World = pc.world(seleniumAddress, options);

  this.After(function(scenario, callback) {
    this.quit(callback);
  });
};

module.exports = steps;
```

Now create a feature file, `features/homepage.feature`

```

Feature: Homepage 
  As a user
  I want to visit the homepage
  So that I can access the various features on offer

  Scenario: Visit Homepage
    Given I am on the homepage
    Then I should see a "navbar"
    And I should see a "login" link
    And I should see a "register" link

```

Now create some steps for the above feature, `features/step_definitions/homepage/steps.js`

```javascript

var support = require('../support');

var steps = function() {

  this.Given(/^I am on the homepage$/, function(callback) {
    support.get(this, 'http://localhost:5000', function(result){
      setTimeout(callback, 1000);
    });
  });

  this.Then(/^I should see a "([^"]*)" link$/, function(link, callback) {
    support.findByBinding(this, link, function(result){
      result.getText().then (function(text){
        text.trim().toLowerCase().should.equal(link.trim().toLowerCase());             
        setTimeout(callback, 1000);
      });     
    });
  });

  this.Then(/^I should not see a "([^"]*)" link$/, function(link, callback) {
    support.isElementPresent(this, link, function(result){
      result.should.equal(false);
      setTimeout(callback, 1000);
    });
  });

  this.Then(/^I should see a "([^"]*)"$/, function(link, callback) {
    support.isElementPresentByClass(this, link, function(result){
      result.should.equal(true);
      setTimeout(callback, 1000);
    });
  });

};

module.exports = steps;

```

Add some support, `features/step_definitions/support.js`

```javascript

var Support = function(){
};

Support.prototype.get = function(sut, url, callback){
  sut.browser.get(url).then(function(result) {
    callback(result)
  });
};

Support.prototype.findByBinding = function(sut, item, callback){
  sut.browser.findElement(sut.by.binding(item)).then(function(result) {
    callback(result);
  });
};

Support.prototype.isElementPresent = function(sut, find, callback){
  sut.browser.isElementPresent(sut.by.linkText(find)).then(function(result) {
     callback(result)
  });
};

Support.prototype.isElementPresentByClass = function(sut, find, callback){
  sut.browser.isElementPresent(sut.by.css('.'+find)).then(function(result) {
     callback(result)
  });
};

module.exports = new Support();

```


Now run cucumber: 

```
cucumber.js
```


## World

Below is a list of properties/methods exposed on the world object

### browser 
a wrapper around an instance of webdriver. Used for navigation and page-wide information.
### protractor
the protractor lib
### by
a collection of element locator strategies. 
### assert
our chosen assertion library, not required is using `should`
### baseUrl
allows you to set a baseurl to use in your tests
### properties
an object of anything you like to use in your tests
### quit
quits the browser used in your tests


## Options

### browser
Specifies a browser; `chrome`, `phantomjs`, defaults to `chrome`
### timeout
Specifies a timeout for setScriptTimeout, defaults to 100000
### assert
Specifies an assert module; to use within your tests
### baseUrl
Specifies a baseurl to be used within your tests
### properties
Specifies a properties object; stick whatever you like in there
### desiredCapabilities
Desired Capabilities passed to Selenium; Arbitrary object whose keys are capability names.  Is merged with capabilites created for `browser` or can be used instead of `browser`.
