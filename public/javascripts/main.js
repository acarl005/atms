angular.module('JPM', ['uiGmapgoogle-maps'])

.controller('ATMController', function($scope, $http, Location) {
  $scope.hello = 'heelo';
  $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

  Location.get().then(function(pos) {
    lat = pos.coords.latitude;
    lng = pos.coords.longitude;
    getAtms(lat, lng);
  }, function() {
    alert("Geolocation is not supported by this browser.");
  })

  function getAtms(lat, lng) {
    var url = '/atms?'
    url += 'lat=' + lat + '&';
    url += 'lng=' + lng;
    $http.get(url).then(function(res) {
      console.log(res.data);
    })
  }
})

.service('Location', function() {
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
})
