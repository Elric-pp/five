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
