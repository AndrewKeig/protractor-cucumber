var protractor = require('protractor')
, webdriver = require('selenium-webdriver');

var World = (function(seleniumAddress, options) {

  if (!seleniumAddress) throw new Error('Please provide a server url');

  var desiredCapabilities = options.desiredCapabilities || {};
  var browserOpt = options.browser || desiredCapabilities.browser || "chrome";
  var timeout = options.timeout || 100000;

  function World(callback) {
    var capabilities = webdriver.Capabilities[browserOpt]().merge(desiredCapabilities);
    var driver = new webdriver.Builder(capabilities)
    .usingServer(seleniumAddress)
    .withCapabilities()
    .build();

    driver.manage().timeouts().setScriptTimeout(timeout);

    var winHandleBefore;

    driver.getWindowHandle().then(function(result){
      winHandleBefore = result;
    });

    this.browser = protractor.wrapDriver(driver);
    this.protractor = protractor;
    this.by = protractor.By;

    if (options.assert) this.assert = options.assert;
    if (options.baseUrl) this.baseUrl = options.baseUrl;
    if (options.properties) this.properties = options.properties;

    callback();

    this.quit = function(callback){
      driver.quit().then(function(){
        callback();  
      });
    }
  }

  return World;
});

module.exports.world = World;
