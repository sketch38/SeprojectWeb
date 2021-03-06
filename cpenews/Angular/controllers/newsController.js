angular.module('app')
	.controller('newsController',function($rootScope, $routeParams, $http,$scope , $base64){
		$rootScope.menu = 'news';
		$rootScope.page = $routeParams.page;
		//$scope.layout = 'grid';
		var controller = this;
		$http({method:'GET',url:'/news'}).success(function(data){
			controller.news = data;
			console.log(controller.news[0].pic);
			// if(controller.news.pic == "undefined"){
			// 	controller.news.haspic = false;
			// }
			// else{
			// 	controller.news.haspic = true;
			// }
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

		this.base64decode = function (data) {
			decodeURIComponent(escape($base64.decode(data)));
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
