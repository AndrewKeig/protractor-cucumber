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