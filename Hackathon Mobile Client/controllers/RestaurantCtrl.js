'use strict';

app.controller('RestaurantController', [
                   '$scope', 'RestaurantServices', function ($scope, RestaurantServices) {
                       $scope.retrieveRestaurants = retrieveRestaurants;
                       $scope.retrieveImage = retrieveImage;
                       $scope.imageUrls = [];
                       $scope.counter = 0;
                       $scope.images = [
                           'https://bs1.cdn.telerik.com/v1/ISDTe40ezNnnMAmk/3f9a5100-5639-11e4-9793-595ba64727f8',

                       ]
                       function retrieveRestaurants() {
                           RestaurantServices.getRestaurants()
                               .then(function (success) {
                                   $scope.data = success.Result;
                               }, function (error) {
                                   console.log(error);
                               })
                       }

                       function retrieveImage(restaurant) {
                           RestaurantServices.getImage('http://api.everlive.com/v1/ISDTe40ezNnnMAmk/Files/40c9f760-5639-11e4-9793-595ba64727f8')
                               .then(function (success) {
                                   console.log(success.Result.Uri);
                               }, function (error) {
                                   console.log(error);
                               })
                       }

                       function retrieveTemperature() {
                           RestaurantServices.getTemperature('https://agent.electricimp.com/Mpzd6FB1b85N?temp')
                               .then(function (headers) {
                                   var locationStr = headers()['location-data-restourant'].split(',');
                               }, function (error) {
                                   console.log(error);
                               })
                       }
                   }
               ]);