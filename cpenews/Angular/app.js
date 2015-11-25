var app = angular.module('app',['ngStorage','ngRoute']);
app.config(['$routeProvider','$httpProvider' ,function ($routeProvider,$httpProvider){
	$routeProvider
		.when('/',{
			templateUrl:'angular/template/home.html',
			controller: 'homeController'
		})
		.when('/contact',{
			templateUrl:'angular/template/contact.html',
			controller: 'contactController'
		})
		.when('/time-table/:page',{
			templateUrl:'angular/template/time-table.html',
			controller: 'timetableController'
		})
		.when('/news/:page',{
			templateUrl:'angular/template/news.html',
			controller: 'newsController',
			controllerAs: 'indexcontroller'
		})
		.when('/admin',{
			templateUrl:'angular/template/admin.html',
			controller: 'adminController'
		})
		.when('/setting/addcourse',{
			templateUrl:'angular/template/add-course.html',
			controller: 'settingController'
		})
		.when('/setting/addcourse/:cid',{
			templateUrl:'angular/template/add-course.html',
			controller: 'settingController'
		})
		.when('/setting/addevent',{
			templateUrl:'angular/template/add-event.html',
			controller: 'settingController'
		})
		.when('/setting/addevent/:eid',{
			templateUrl:'angular/template/add-event.html',
			controller: 'settingController'
		})
		.when('/setting/showall',{
			templateUrl:'angular/template/showall.html',
			controller: 'settingController'
		})
		.when('/setting/setting',{
			templateUrl:'angular/template/setting.html',
			controller: 'settingController'
		})
		.when('/news/detail/:eid',{
			templateUrl:'angular/template/news/show.html'
		})
		.otherwise({
			redirectTo:'/'
		});

		$httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        config.headers.Authorization = 'Bearer ' + $localStorage.token;
                    }
                    return config;
                },
                'responseError': function(response) {
                    if(response.status === 401 || response.status === 403) {
                        $location.path('/signin');
                    }
                    return $q.reject(response);
                }
            };
        }]);
}]);

app.controller('MenuController',['$location', '$localStorage',function($location,$localStorage){
	if($localStorage.token){
		this.isAdmin = true;
	}
	else{
		this.isAdmin = false;
	}
	this.logOut = function(){
		delete $localStorage.token;
		location.href="index.html";
	}
}]);
