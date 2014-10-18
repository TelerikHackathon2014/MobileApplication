'use strict';

app.controller('RestaurantController', ['$scope', 'RestaurantServices', function ($scope, RestaurantServices) {
    $scope.retrieveRestaurants = retrieveRestaurants;

    function retrieveRestaurants() {
        RestaurantServices.getRestaurants()
            .then(function (success) {
                $scope.restaurants = success;
            }, function (error) {
                console.log(error);
            })
    }
}]);