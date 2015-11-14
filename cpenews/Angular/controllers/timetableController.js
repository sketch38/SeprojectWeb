angular.module('app')
	.controller('timetableController',function($http,$scope){	
		//put code
		$http({method:'GET',url:'/time-table'}).success(function(data){
			$scope.tables = data;
			console.log(data[0]);
		});
});
