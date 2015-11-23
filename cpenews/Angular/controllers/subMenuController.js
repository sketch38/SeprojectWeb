angular.module('app')
  .controller('SubMenuController', function ($rootScope, $scope, $timeout, $http) {
    $rootScope.$watch('menu', function () {
      if($rootScope.menu == 'time-table') {
        $scope.menuCSS = 'time-table';
        $scope.menuLists = [
          { name : 'ALL', link : '#/time-table/all', pathName : 'all'},
          { name : 'COURSE', link : '#/time-table/course', pathName : 'course'},
          { name : 'EVENT', link : '#/time-table/event', pathName : 'event'},
          { name : 'ROOM' , link : '#/time-table/room', pathName : 'room'}
        ];
      }
      else if($rootScope.menu == 'setting') {
        $scope.menuCSS = 'add';
        $scope.menuLists = [
          { name : 'ADD COURSE', link : '#/setting/addcourse', pathName : 'addcourse'},
          { name : 'ADD EVENT', link : '#/setting/addevent', pathName : 'addevent'},
          { name : 'SHOW ALL', link : '#/setting/showall', pathName : 'showall'},
          { name : 'SETTING' , link : '#/setting/setting', pathName : 'setting'}
        ];
      }
      else if($rootScope.menu == 'news') {
        $scope.menuCSS = 'news';
        $scope.menuLists = [
          { name : 'ALL', link : '#/news/all', pathName : 'all'}
        ];
        $http.get('/category').success(function (data) {
          data.forEach(function (category) {
            categoryName = category.ca_name.toUpperCase();
            categoryNamePath = categoryName.toLowerCase().replace(/\s+/g, '');
            $scope.menuLists.push({ name : categoryName, link : '#/news/' + categoryNamePath, pathName : categoryNamePath });
          });
        });
        // str.replace(/\s+/g, ''); remove space
      }
    });
  })
;
