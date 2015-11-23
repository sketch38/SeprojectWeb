angular.module('app')
	.controller('newsController',function($rootScope, $routeParams, $http){
		$rootScope.menu = 'news';
		$rootScope.page = $routeParams.page;
		var controller = this;
		$http({method:'GET',url:'/news'}).success(function(data){
			controller.news = data;
		});

});
