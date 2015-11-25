angular.module('app')
  .controller('contactController', function ($rootScope) {
    delete $rootScope.menu;
  })
;