angular.module('JPM').service('Location', function() {
  this.get = function() {
    return new Promise(function(resolve, reject) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(pos) {
          resolve(pos);
        });
      } else {
        reject();
      }
    });
  }
});