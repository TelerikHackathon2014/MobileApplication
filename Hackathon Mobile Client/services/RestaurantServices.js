app.factory('restaurantServices', ['$http', '$q', 'apiEndpoint', function($http, $q, apiEndpoint) {
    var restaurantApi = apiEndpoint + '/restaurants';

    return {
        getRestaurantInfo: function() {
            var deferred = $q.defer();

            $http.get(restaurantApi)
                .success(function (success) {
                    deferred.resolve(success);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }
    }
}]);