var app = angular.module('app', []);

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

app.controller('groupCtrl', ['$scope', 'groupService', function($scope, groupService){

}]);
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

app.controller('loginCtrl', ['$scope', '$timeout', 'loginService', function($scope, $timeout, loginService) {
    $scope.userName = "";
    $scope.passwd = "";
    $scope.login = function() {
    	if ($scope.username == "" || $scope.passwd == "" ) {
                $scope.myalter("用户名或密码不能为空");
                return false;
            };
        var _proxy = loginService.login($scope.userName, $scope.passwd);
        _proxy.success(function(data) {
                console.log(data);
                $scope.myalter(data.msg)
                if (data.status == 0) {
                    $timeout(function() {
                        window.location = data.redirect;
                    }, 1000)
                };
            })
            .error(function(data) {
                console.log(data);
                $scope.myalter('出错了')
            })
    }

    $scope.regPage = false;

    $scope.reg = {
        username: "",
        passwd: "",
        repasswd: "",
        regis: function() {
            if ($scope.reg.username == "" || $scope.reg.passwd == "" || $scope.reg.repasswd == "") {
                $scope.myalter("必填字段不能为空");
                return false;
            };
            if ($scope.reg.passwd.length <= 8) {
                $scope.myalter("密码太短");
                return false;
            };
            if ($scope.reg.passwd !== $scope.reg.repasswd) {
                $scope.myalter("两次密码不一致")
                return false;
            }
            var _proxy = loginService.regis($scope.reg.username, $scope.reg.passwd);
            _proxy.success(function(data) {
                console.log(data);
                if (data.status == 0) {
                    $scope.regPage = false;
                    $scope.myalter('注册成功')
                    $scope.reg.username = "";
                    $scope.reg.passwd = "";
                    $scope.reg.repasswd = "";
                } else {
                    $scope.myalter('用户已存在')
                }
            })
        }
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

app.controller('userCtrl', ['$scope', 'userService', function($scope, userService){

}]);
app.service('groupService', ['$http', function($http) {
	
}])
app.service('homeService', ['$http', function($http) {
    this.movies = function(){
    	var url = '/movie';
    	return $http.get(url, [])
    }

    this.addmovie = function(src) {
        var url = '/movie/add';
        return $http.post(
            url,
            'url=' + src,
 	{method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}
        )
    }
}])

app.service('loginService', ['$http', function($http) {
    this.login = function(name, pwd) {
        var url = '/users/login';
        return $http.post(
            url,
            "username=" + name +
            "&password=" + pwd,
            {method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}
        )
    };


    this.regis = function(name, pwd){
        var url = '/users/regis';
                return $http.post(
            url,
            "username=" + name +
            "&password=" + pwd,
            {method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}
        )
    }
}])

app.service('userService', ['$http', function($http) {
	
}])