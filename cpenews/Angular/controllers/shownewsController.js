angular.module('app')
	.controller('shownewsController',function($http,$routeParams){
		var controller = this;
		$http({method:'GET',url:'/news/'+$routeParams.eid})
		.success(function(data){
			controller.newstitle = data[0];
			//console.log(controller.newstitle);
		});
	});