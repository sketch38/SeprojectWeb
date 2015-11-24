angular.module('app')
	.controller('settingController',function($http,$scope,$timeout,$rootScope,$routeParams,$route,$location){
		$rootScope.menu = 'setting';
		$rootScope.page = $routeParams.page;

		//
		//for setting page
		//
		changeDate = function(date) { // dd/mm/yyyy
	      	var newDate = date.split('/');
	      	return newDate[2] + '-' + newDate[1] + '-' + newDate[0];
	    };
		var getCategory = function() {
			$http({method:'GET',url:'/category'}).success(function(data){
				$scope.categories = data;
				$('.collapsible').collapsible({
	  				accordion : false
	    		});
			});
		};
		getCategory();
		$scope.addcategorybutton = function() {
			var categoryname = {name:$scope.form.addcategory};
			$http({method:'POST',data:categoryname,url:'/category'}).success(function(data) {
				getCategory();
				$scope.form.addcategory = "";
			});
		};
		$scope.deletecategorybutton = function(id) {
			$http({method:'DELETE',url:'/category/'+id}).success(function(data) {
				getCategory();
			});
		};
		var getDateSetting = function() {
			$http({method:'GET',url:'/datesetting'}).success(function(data){
				$scope.datesetting = data;
				//console.log(data[0].startdate);
				$('.datepicker').pickadate({
			    	selectMonths: true, // Creates a dropdown to control month
			   		selectYears: 15, // Creates a dropdown of 15 years to control year
			   		format: 'yyyy-mm-dd'
			  	});
			  	$scope.form = {
			  		date:{
			  			semesterstart:data[2].startdate,
			  			semesterend:data[2].enddate,
			  			midtermstart:data[0].startdate,
			  			midtermend:data[0].enddate,
			  			finalstart:data[1].enddate,
			  			finalend:data[1].enddate
			  		}
			  	};
			  	$('.input-field label[for=date]').addClass("active");
			});
		};
		getDateSetting();
		$scope.adddate = function(id) {
			if(id==2){
				var date = {
					startdate:$scope.form.date.semesterstart,
					enddate:$scope.form.date.semesterend
				};
			}
			else if(id==1){
				var date = {
					startdate:$scope.form.date.finalstart,
					enddate:$scope.form.date.finalend
				};
			}
			else if(id==0){
				var date = {
					startdate:$scope.form.date.midtermstart,
					enddate:$scope.form.date.midtermend
				};
			}
			$http({method:'PUT',data:date,url:'/datesetting/'+id}).success(function(data) {
				getCategory();
				alert("Done");
			});
		};


		//
		//for add course
		//
		$scope.addcoursebutton = function() {
			if(!$scope.form.addcourse) {
				return false;
			}
			if($scope.form.addcourse.day) {
				$scope.form.addcourse.days = [];
				for(var key in $scope.form.addcourse.day) {
					if(key) {
						$scope.form.addcourse.days.push(key);
					}
				}
			}
			$http({method:'POST',data:$scope.form.addcourse ,url:'/addcourse'}).success(function(data) {
				$location.path('/setting/showall');
			});
		};

		//
		//for show all
		//
		var getall = function() {
			$http({method:'GET',url:'/getall'}).success(function(data){
				$scope.all = data;
			});
		};
		getall();
		$scope.checkeventfilter = function() {
		  	return function(event) {
		  		return event.ca_id >0;
		  	};
		};
		$scope.deletecoursebutton = function(id) {
			$http({method:'DELETE',url:'/course/'+id}).success(function(data) {
				alert("delete course done");
				getall();
			});
		};
		$scope.deleteeventbutton = function(id) {
			$http({method:'DELETE',url:'/event/'+id}).success(function(data) {
				alert("delete event done");
				getall();
			});
		};
});
