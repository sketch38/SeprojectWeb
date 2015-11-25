angular.module('app')
  .controller('homeController', function ($rootScope,$scope,$http,$timeout) {
    delete $rootScope.menu;
    $http({method:'GET',url:'/home'}).success(function(data){
		$scope.slide = data;
	    $timeout(function () {
            $('.slider').slider({
		      full_width: true
		    });
        }, 100);
	});
	
  });
