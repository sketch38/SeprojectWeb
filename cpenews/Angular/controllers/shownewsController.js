angular.module('app')
	.controller('shownewsController',function($http,$routeParams,$rootScope,$base64){
		$rootScope.menu = 'news';
		$rootScope.page = "";
		var controller = this;
		$http({method:'GET',url:'/news/'+$routeParams.eid})
		.success(function(data){
			controller.newstitle = data[0];
			controller.newstitle.detail = decodeURIComponent(escape($base64.decode(controller.newstitle.detail)));
			//console.log(controller.newstitle.pic);
		});
	});
