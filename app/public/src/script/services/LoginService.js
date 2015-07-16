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
