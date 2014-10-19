app.factory('Profile', function ($http, $q) {
    var restaurantApi = 'http://api.everlive.com/v1/ISDTe40ezNnnMAmk/Users/me';

    return {
        getUser: function (headers) {
            var deferred = $q.defer();

            $http.get(restaurantApi, headers)
                .success(function (success) {
                    deferred.resolve(success);
                })
                .error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }
    }
});