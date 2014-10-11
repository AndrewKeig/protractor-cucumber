var pc = require('../../../lib');

var steps = function() {
  var seleniumAddress = 'http://localhost:4444/wd/hub';
  var options = { browser : 'chrome', timeout : 100000 };
  this.World = pc.world(seleniumAddress, options);

  this.After(function(callback) {
    this.quit(callback);
  });
};

module.exports = steps;