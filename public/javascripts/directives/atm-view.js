angular.module('JPM').directive('atmView', function() {
  return {
    restrict: 'E',
    templateUrl: 'partials/atm-view.html',
    scope: {
      atm: '=',
      close: '&'
    },
  }
});