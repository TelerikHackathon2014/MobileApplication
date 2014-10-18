app.factory('RestaurantServices', ['$http', '$q', function($http, $q) {
    var restaurantApi = '';

    return {
        getRestaurants: function() {
            var deferred = $q.defer();

            $http.get(restaurantApi)
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