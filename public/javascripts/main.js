angular.module('JPM', ['uiGmapgoogle-maps'])

.controller('ATMController', function($scope, $http, Location) {

  $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 12 };
  $scope.atms = [];
  $scope.activeATM = null;

  $scope.setActiveATM = function(ind) {
    $scope.activeATM = $scope.atms[ind];
    $scope.$apply();
  }

  $scope.removeActive = function() {
    $scope.activeATM = null;
  }

  Location.get().then(function(pos) {
    lat = $scope.map.center.latitude = pos.coords.latitude;
    lng = $scope.map.center.longitude = pos.coords.longitude;
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
      $scope.atms = res.data.locations
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

.directive('atmView', function() {
  return {
    restrict: 'E',
    templateUrl: 'partials/atm-view.html',
    scope: {
      atm: '=',
      close: '&'
    },
    controller: function($scope) {
    }
  }
})