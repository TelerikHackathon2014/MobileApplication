'use strict';
angular.module('App4.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var friends = [
        {
            id: 0,
            name: 'Scruff McGruff'
        },
        {
            id: 1,
            name: 'G.I. Joe'
        },
        {
            id: 2,
            name: 'Miss Frizzle'
        },
        {
            id: 3,
            name: 'Ash Ketchum'
        }
  ];

    return {
        all: function () {
            return friends;
        },
        get: function (friendId) {
            // Simple index lookup
            return friends[friendId];
        }
    };
})

.factory('restaurantServices', ['$http', '$q', 'apiEndpoint',
    function ($http, $q, apiEndpoint) {
        var restaurantApi = apiEndpoint + '/restaurants';

        return {
            getRestaurantInfo: function () {
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
}])

.factory('auth', function ($http, $q) {
    return {
        login: function (user) {
            var deferred = $q.defer();

            $http.post('http://api.everlive.com/v1/ISDTe40ezNnnMAmk/oauth/token', user)
                .success(function (response) {
                    if (response.success) {
                        deferred.resolve(responce);
                    }
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }
    }
});