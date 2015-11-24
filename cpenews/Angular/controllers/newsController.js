angular.module('app')
	.controller('newsController',function($rootScope, $routeParams, $http,$scope){
		$rootScope.menu = 'news';
		$rootScope.page = $routeParams.page;
		//$scope.layout = 'grid';
		var controller = this;
		$http({method:'GET',url:'/news'}).success(function(data){
			controller.news = data;
		});
		this.category = $routeParams.page;

		this.canamepath = function( path ) {
		  	return function( news ) {
		  		if(path == 'all') {
		  			return true;
		  		}
		    	return news.ca_name.toLowerCase().replace(/\s+/g, '') === path;
		  	};
		};
		if(!$rootScope.layout){
			$rootScope.layout = 'grid';
		}
		$scope.changeLayoutGrid = function() {
			$rootScope.layout = 'grid';
		};
		$scope.changeLayoutList = function() {
			$rootScope.layout = 'list';
		};
});
