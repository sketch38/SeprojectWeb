angular.module('app')
  .controller('homeController', function ($rootScope) {
    delete $rootScope.menu;
  })
;
