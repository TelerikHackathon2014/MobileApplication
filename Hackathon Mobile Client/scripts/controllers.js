'use strict';
angular.module('App4.controllers', [])

.controller('DashCtrl', function ($scope) {})

.controller('FriendsCtrl', function ($scope, Friends) {
    $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function ($scope, $stateParams, Friends) {
    $scope.friend = Friends.get($stateParams.friendId);
})

.controller('HomeCtrl', function ($scope) {})

.controller('LoginCtrl', function ($scope, auth) {
    $scope.login = function (user) {
        user.grant_type = 'password';

        auth.login(user)
            .then(function (data) {
                console.log(JSON.stringify(data));
            }, function (error) {
                console.log(error);
            })
    }
})

.controller('RestaurantController', ['$scope', 'restaurantServices',
    function ($scope, restaurantServices) {
        $scope.restaurantInfo = restaurantInfo;

        function restaurantInfo() {
            restaurantServices.getRestaurantInfo()
                .then(function (success) {
                    console.log(success);
                }, function (error) {
                    console.log(error);
                })
        }
}])

.controller('AccountCtrl', function ($scope) {});