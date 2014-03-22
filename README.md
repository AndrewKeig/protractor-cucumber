protractor-cucumber
==============

protractor-cucumber allows one to drive protractor tests using cucumber

## Installation

Install npm package to dev dependencies

```
npm install protractor-cucumber --save-dev
```

## Usage

Below demonstrates how to use protractor-cucumber

`seleniumAddress` is the address of a running selenium standalone server

protractor-cucumber returns a `world` object; which you can configure; with options described below.

```
var pc = require('protractor-cucumber');

var steps = function() {
  var seleniumAddress = 'http://localhost:4444/wd/hub';
  var options = { browser : 'chrome', timeout : 100000 };
  this.world = pc.world(seleniumAddress, options);

  this.After(function(callback) {
    this.quit(callback);
  });
};

module.exports = steps;
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
