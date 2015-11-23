function timeObjToInt(time) {
	var dateObj = new Date();
	var timeSplit = time.split(':');
	dateObj.setHours(timeSplit[0],timeSplit[1]);
	return dateObj.getTime();
}

angular.module('app')
	.controller('timetableController',function($http,$scope,$interval){
		var getData = function () {
			$http({method:'GET',url:'/time-table'}).success(function(data){
				data.sort(function (a, b) {
					return timeObjToInt(a.end_time) - timeObjToInt(b.end_time);
				});
				$scope.tables = data;
			});
		};
		getData();
		$interval(getData, 5000);
});