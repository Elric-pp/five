var app = angular.module('app', []);

app.controller('appCtrl', ['$scope', function($scope){
    $scope.index = 1;
    $scope.changeIndex = function(index){
        $scope.index = index;
    }
}]);
app.controller('groupCtrl', ['$scope', 'groupService', function($scope, groupService){

}]);
app.controller('homeCtrl', ['$scope', 'homeService',function($scope,homeService){
    $scope.tabIndex = 1;
    $scope.changeTab = function(index){
    	$scope.tabIndex = index;
    }
}]);
app.controller('loginCtrl', ['$scope','loginService', function($scope, loginService){
    $scope.userName= "";
    $scope.passwd = "";
    $scope.login = function(){
    
    }
}]);

app.controller('userCtrl', ['$scope', 'userService', function($scope, userService){

}]);
app.service('groupService', ['$http', function($http) {
	
}])
app.service('homeService', ['$http', function($http) {
	
}])
app.service('loginService', ['$http', function($http) {
	
}])
app.service('userService', ['$http', function($http) {
	
}])