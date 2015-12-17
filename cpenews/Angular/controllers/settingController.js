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
			  	//console.log($scope.form.date.semesterstart);
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
				getDateSetting();
				alert("Done");
			});
		};
		var getSlide = function() {
			$http({method:'GET',url:'/home'}).success(function(data){
				$scope.slide = data;
			  	$scope.form.s = {
			  		slide:{
			  			slidelink1:data[0].s_link,
			  			slidetext1:data[0].s_text,
			  			slidelink2:data[1].s_link,
			  			slidetext2:data[1].s_text,
			  			slidelink3:data[2].s_link,
			  			slidetext3:data[2].s_text,
			  			slidelink4:data[3].s_link,
			  			slidetext4:data[3].s_text,
			  		}
			  	};
			  	console.log($scope.form.s);
			  	$('.input-field label[for=slide]').addClass("active");
			});
		};
		getSlide();
		$scope.addslide = function(id) {
			if(id==1){
				var slide = {
					s_link:$scope.form.s.slide.slidelink1,
					s_text:$scope.form.s.slide.slidetext1
				};
			}
			else if(id==2){
				var slide = {
					s_link:$scope.form.s.slide.slidelink2,
					s_text:$scope.form.s.slide.slidetext2
				};
			}
			else if(id==3){
				var slide = {
					s_link:$scope.form.s.slide.slidelink3,
					s_text:$scope.form.s.slide.slidetext3
				};
			}
			else if(id==4){
				var slide = {
					s_link:$scope.form.s.slide.slidelink4,
					s_text:$scope.form.s.slide.slidetext4
				};
			}
			else{
				return false;
			}
			$http({method:'PUT',data:slide,url:'/home/'+id}).success(function(data) {
				getSlide();
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
			if(!$scope.form.addcourse.title){
				$scope.form.validate.course.title = "please input course's name."; 
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
			$http({method:'POST',data:$scope.form.addcourse ,url:'/course'}).success(function(data) {
				$location.path('/setting/showall');
			});
		};
		if($routeParams.cid) {
			$scope.edit = true;
			$http.get('/course/' + $routeParams.cid).success(function (data) {
				$scope.form.addcourse = data;
				$scope.form.addcourse.starttime = $scope.form.addcourse.start_time;
				$scope.form.addcourse.endtime = $scope.form.addcourse.end_time;
				var days = [];
				for(var key in $scope.form.addcourse.days) {
					days[$scope.form.addcourse.days[key].day] = true;
				}
				$scope.form.addcourse.day = days;
				$('.input-field label').addClass("active");
			});
		}
		$scope.editaddcoursebutton = function() {
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
			$http({method:'PUT',data:$scope.form.addcourse ,url:'/course'}).success(function(data) {
				$location.path('/setting/showall');
			});
		};

		//
		//for add event
		//
		var nowPath = $location.path().split('/');
		if(nowPath[2] === 'addevent') {
			$http.get('/category').success(function (data) {
				$scope.categories = data.splice(1, data.length);
			});
		}
		$scope.addeventbutton = function() {
			if(!$scope.form.addevent) {
				return false;
			}
			$scope.form.addevent.ca_id = $scope.form.addevent.category.ca_id;
			console.log($scope.form.addevent.pic);
			$http({method:'POST',data:$scope.form.addevent ,url:'/event'}).success(function(data) {
				$location.path('/setting/showall');
			});
		};
		$scope.editaddeventbutton = function () {
			$scope.form.addevent.ca_id = $scope.form.addevent.category.ca_id;
			console.log($scope.form.addevent.pic);
			$http({method:'PUT',data:$scope.form.addevent ,url:'/event'}).success(function(data) {
				$location.path('/setting/showall');
			});
		};
		if($routeParams.eid) {
			$scope.edit = true;
			$http.get('/event/' + $routeParams.eid).success(function (data) {
				$scope.form.addevent = data;
				$scope.form.addevent.startdate = $scope.form.addevent.start_date;
				$scope.form.addevent.enddate = $scope.form.addevent.end_date;
				$scope.form.addevent.starttime = $scope.form.addevent.start_time;
				$scope.form.addevent.endtime = $scope.form.addevent.end_time;
				$http.get('/category').success(function (data) {
					$scope.categories = data.splice(1, data.length);
					$scope.categories.forEach(function (category) {
						if(category.ca_id == $scope.form.addevent.ca_id) {
							$scope.form.addevent.category = category;
						}
					});
				});
				$('.input-field label').addClass("active");
			});
		}
		//test for tinymce
		$scope.tinymceOptions = {
		    onChange: function(e) {
		    	// put logic here for keypress and cut/paste changes
		    },
		    inline: false,
		    plugins : 'advlist autolink link image lists charmap print preview',
		    skin: 'lightgray',
		    theme : 'modern',
		    entity_encoding : "raw",
		    font_formats: 'Arial=arial,helvetica,sans-serif;'
		};
		//


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

		$scope.editcoursebutton = function (cid) {
			$location.path('/setting/addcourse/' + cid);
		};

		$scope.editeventbutton = function (eid) {
			$location.path('/setting/addevent/' + eid);
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
