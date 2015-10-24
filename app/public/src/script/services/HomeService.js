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
