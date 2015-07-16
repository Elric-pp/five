app.controller('appCtrl', ['$scope', function($scope) {
    $scope.index = 1;
    $scope.changeIndex = function(index) {
        $scope.index = index;
    }


    $scope.globalTip = {
        on: false,
        tip: '',
    };
    $scope.myalter = function(text) {
        $scope.globalTip.on = true;
        $scope.globalTip.tip = text;
        $timeout(function() {
            $scope.globalTip.on = false;
        }, 1500);
    }

}]);
