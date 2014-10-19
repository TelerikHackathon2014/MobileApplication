app.factory('Menu', function ($http, $q) {
    var restaurantApi = 'http://api.everlive.com/v1/ISDTe40ezNnnMAmk/Functions';

    return {
        getMenuByShopId: function (data) {
            var deferred = $q.defer();

            $http.post(restaurantApi + '/GetMenuByShopId', data)
                .success(function (succes) {
                    deferred.resolve(success);
                })
                .error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        },
        getMenuEntries: function (data) {
            $http.post(restaurantApi + '/GetMenuEntries', data)
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