app.controller('homeCtrl', ['$scope', 'homeService',function($scope,homeService){
    $scope.index = 1;
    $scope.changeIndex = function(index){
        $scope.index = index;
    }
}]);