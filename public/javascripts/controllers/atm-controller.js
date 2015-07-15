angular.module('JPM').controller('ATMController', function($scope, $http, Location, JPMAPI) {

  $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 12 };  //initialize to arbitrary values
  $scope.atms = [];
  $scope.activeATM = null;

  //active ATM is the one currently showing its details
  $scope.setActiveATM = function(ind) {
    $scope.activeATM = $scope.atms[ind];
    $scope.$apply();
  }

  $scope.removeActive = function() {
    $scope.activeATM = null;
  }

  Location.get().then(function(pos) {
    $scope.lat = $scope.map.center.latitude = pos.coords.latitude;
    $scope.lng = $scope.map.center.longitude = pos.coords.longitude;
    getAtms($scope.lat, $scope.lng);
  }, function() {
    alert("Geolocation is not supported by this browser.");
  })

  function getAtms(lat, lng) {
    JPMAPI.getATMs(lat,lng).then(function(res) {
      console.log(res.data);
      $scope.atms = res.data.locations;
    })
  }
});