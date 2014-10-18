app.factory('Register', ['$http', '$q', function ($http, $q) {
    var restaurantApi = 'http://api.everlive.com/v1/ISDTe40ezNnnMAmk/';

    return {
        postRegister: function () {
            var deferred = $q.defer();

            $http.get(restaurantApi + 'Register')
                .success(function (success) {
                    deferred.resolve(success);
                })
                .error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }
    }
}]);