app.controller('homeCtrl', ['$scope', 'homeService',function($scope,homeService){
    $scope.tabIndex = 1;
    $scope.changeTab = function(index){
    	$scope.tabIndex = index;
    }
}]);