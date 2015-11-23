app.directive('menu', function($timeout) {
    var contentUrl;
    return {
        restrict: 'E',
        scope : {
            isadmin : "="
        },
        template:'<ng-include src="getTemplateUrl()"/>',
        controller: function($scope,$location,$localStorage) {
            $scope.getTemplateUrl = function() {
                if ($scope.isadmin){
                    return 'angular/template/adminMenu.html';
                }
                else{
                    return 'angular/template/userMenu.html';
                }
            }
            $scope.logOut = function(){
                delete $localStorage.token;
                location.href="index.html";
            }
        },
        link: function (scope) {
           $timeout(function () {
                $(".button-collapse").sideNav();
            }, 100);
        }
    }
});