app.factory('auth', function ($http, $q) {
    return {
        login: function (user) {
            var deferred = $q.defer();

            $http.post('http://api.everlive.com/v1/ISDTe40ezNnnMAmk/oauth/token', user)
                .success(function (success) {
                    deferred.resolve(success);
                })
                .error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }
    }
})