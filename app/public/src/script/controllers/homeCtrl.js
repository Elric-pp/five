app.controller('homeCtrl', ['$scope','$timeout', 'homeService', function($scope,$timeout, homeService) {
    $scope.tabIndex = 1;
    $scope.changeTab = function(index) {
        $scope.tabIndex = index;
    }

    $scope.addmovie = function() {
    	console.log($scope.globalPopupTip)
            var obj = {
                'title': '新增电影',
                'hideCloseBtn': false,
                'type': 1,
                'isPwd': false,
                'okBtnText': '添加',
                'cancelBtnText': '取消',
                'filed': '',
                'callback': function() {
                    if ($scope.globalPopupTip.filed == '') {
                        $scope.globalTip.tip = ' 分组名不能为空 ';
                        $scope.globalTip.on = true;
                        $timeout(function() {
                            $scope.globalTip.on = false;
                        }, 3000);
                    } else {
                        var _proxy = homeService.addmovie($scope.globalPopupTip.filed);
                        _proxy.success(function(data) {
                            if (data.status == 0) {
                                var text = '添加成功';
                                $scope.closePopup();
                                $scope.globalTip.tip = text;
                                $scope.globalTip.on = true;
                                $timeout(function() {
                                    $scope.globalTip.on = false;
                                }, 1500);
                                $scope.Term.gettg();
                                $scope.Term.getterms('', 1);
                            };
                        }).error(function(data, status) {
                            var text = '添加失败';
                            $scope.closePopup();
                            $scope.globalTip.tip = text;
                            $scope.globalTip.on = true;
                            $timeout(function() {
                                $scope.globalTip.on = false;
                            }, 1500);
                        })
                        $scope.closePopup();
                    }
                },
                'cancel': $scope.closePopup,
            };
            $scope.popup(obj);
        }
        //var _proxy1 = homeService.movies();
        //var _proxy = homeService.addmovie('http://movie.douban.com/subject/25723907/?from=showing');
}]);
