app.controller('appCtrl', ['$scope', function($scope){
    $scope.index = 1;
    $scope.changeIndex = function(index){
        $scope.index = index;
    }
}]);