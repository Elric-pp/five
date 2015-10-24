app.controller('appCtrl', ['$scope', function($scope) {
    $scope.index = 1;
    $scope.changeIndex = function(index) {
        $scope.index = index;
    }



    //全局弹窗
    //$scope.mainPopup = false;
    $scope.globalPopup = false;
    $scope.showGlobalPopupTip = true;
    $scope.globalPopupTip = {};

/*    $scope.popup = function(obj) {
        $scope.mainPopup = true;
        $scope.showGlobalPopupTip = true;
        $scope.globalPopupTip = obj;
    };*/
    $scope.closePopup = function() {
        $scope.mainPopup = false;
        $scope.showGlobalPopupTip = false;
        $scope.globalPopupTip = {};
    };
    $scope.popup = function(obj) {
        $scope.globalPopup = true;
        $scope.showGlobalPopupTip = true;
        $scope.globalPopupTip = obj;
    };

    //顶部提示
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
