app.factory('RestaurantServices', ['$http', '$q', function($http, $q) {
    var restaurantApi = 'http://api.everlive.com/v1/ISDTe40ezNnnMAmk/';
    
    return {
        getRestaurants: function () {
            var deferred = $q.defer();

            $http.get(restaurantApi + 'Establishment')
                .success(function (success) {
                    deferred.resolve(success);
                })
                .error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        },
        getImage: function (url) {
            var deferred = $q.defer();

            $http.get(url)
                .success(function (success) {
                    deferred.resolve(success);
                })
                .error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        },
    }
}]);