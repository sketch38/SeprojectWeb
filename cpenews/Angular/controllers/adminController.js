angular.module('app')
	.controller('adminController',['$location', '$localStorage','$http',function($location,$localStorage,$http){	
		//put code
		this.loginPost = function(){
			var logindata = {
				username : this.username,
				password : this.password
			};
			$http({method:'POST', data : logindata,url:'/login'}).success(function(data){
				if(data.type) {
					//console.log(data.token);
					$localStorage.token = data.token;
					location.href="index.html";
                	// $location.path('/me');
                	$http({method:'GET',url:'/me'}).success(function(data){
						console.log(data);
					});
				}
				else {
					alert(data.data);
				}
			});
		}
		
}]);