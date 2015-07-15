app.service('loginService', ['$http', function($http) {
	this.login = function(name, pwd){
		var url = '/login'
		return $http.post(
			url,
			
		)
	}
}])