'use strict';

app.controller('RestaurantController', [
                   '$scope', 'RestaurantServices', function ($scope, RestaurantServices) {
                       $scope.retrieveRestaurants = retrieveRestaurants;
                       $scope.retrieveImage = retrieveImage;

                       function retrieveRestaurants() {
                           RestaurantServices.getRestaurants()
                               .then(function (success) {
                                   $scope.data = success.Result;
                               }, function (error) {
                                   console.log(error);
                               })
                       }

                       function retrieveImage(restaurant) {
                        RestaurantServices.getImage('http://api.everlive.com/v1/ISDTe40ezNnnMAmk/Files/' + restaurant.Image)
                            .then(function (success) {
                                $scope.imageUrl = success.Result.Uri;
                            }, function (error) {
                                console.log(error);
                            })
                        }
                   }
               ]);