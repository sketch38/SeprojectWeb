//var Category = names=[{name:'Jani',country:'Norway'},{name:'Hege',country:'Sweden'},{name:'Kai',country:'Denmark'}];

angular.module('app')
.directive("categoryselect",function(){
	return{
		//replace:true,
		restrict:'E',
		templateUrl:"angular/template/news/category-select.html",
		controller:function($scope,$http){
			this.getActiveCategory = function(){
				return $scope.activeCategory;
			};
			this.setActiveCategory = function(category){
				//var category = categories.ca_name;
				if(category=='ALL'){
					$scope.activeCategory = undefined;
				}
				else{
					$scope.activeCategory = category;
				}
			};
			$http({method:'GET',url:'/category'}).success(function(data){
				$scope.categories = data;
				$scope.categories.unshift({ca_name:'ALL'});
			});

		},
		scope:{
			activeCategory: "="
		}
	};
});

angular.module('app')
.directive("categoryitem",function(){
	return{
		restrict:'E',
		templateUrl:"angular/template/news/category-item.html",
		scope:{
			category: "="	
		},
		require: "^categoryselect",
		link: function(scope,element,attrs,categoryselectCtrl){
			scope.makeActive = function(){
				categoryselectCtrl.setActiveCategory(scope.category.ca_name);
			}
			scope.categoryActive = function(){
				return categoryselectCtrl.getActiveCategory() === scope.category.ca_name;
			}
		}
	};
});