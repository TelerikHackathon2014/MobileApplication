'use strict';

app.controller('RestaurantController', ['$scope', 'RestaurantServices', function ($scope, RestaurantServices) {
    $scope.retrieveRestaurants = retrieveRestaurants;
    $scope.retrieveImage = retrieveImage;

    function retrieveRestaurants() {
        RestaurantServices.getRestaurants()
            .then(function (success) {
                
                $scope.data = success.Result;
                //console.log(success.Resuclt.length);
            }, function (error) {
                console.log(error);
            })
    }

    function retrieveImage(restaurant) {
        console.log(restaurant);
        console.log(restaurant.Image);
        //RestaurantServices.getImage('http://api.everlive.com/v1/ISDTe40ezNnnMAmk/Files/' + restaurant.Image)
        //    .then(function (success) {
        //        console.log(success);
        //        //return success.Uri;
        //    }, function (error) {
        //        console.log(error);
        //    })
    }
}]);