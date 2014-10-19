app.factory('Menu', function ($http, $q) {
    var restaurantApi = 'http://api.everlive.com/v1/ISDTe40ezNnnMAmk/Functions';

    return {
        getMenuByShopId: function (data, headers) {
            var deferred = $q.defer();

            $http.post(restaurantApi + '/GetMenuByShopId', data, headers)
                .success(function (success) {
                    deferred.resolve(success);
                })
                .error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        },
        getMenuEntries: function (data, headers) {
            var deferred = $q.defer();

            $http.post(restaurantApi + '/GetMenuEntry', data, headers)
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