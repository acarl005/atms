angular.module('JPM').service('JPMAPI', function($http) {
  this.getATMs = function(lat, lng) {
    var url = '/atms?';
    url += 'lat=' + lat + '&';
    url += 'lng=' + lng;             //build query string
    return $http.get(url);
  }
});