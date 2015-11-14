var app = angular.module('app',['ngStorage','ngRoute']);
app.config(['$routeProvider','$httpProvider' ,function ($routeProvider,$httpProvider){
	$routeProvider
		.when('/',{
			templateUrl:'Angular/template/time-table.html',
			controller: 'timetableController'
		})
		.when('/time-table',{
			templateUrl:'Angular/template/time-table.html',
			controller: 'timetableController'
		})
		.when('/news',{
			templateUrl:'Angular/template/news.html',
			controller: 'newsController',
			controllerAs: 'indexcontroller'
		})
		.when('/admin',{
			templateUrl:'Angular/template/admin.html',
			controller: 'adminController'
		})
		.when('/news/:eid',{
			templateUrl:'Angular/template/news/show.html'
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