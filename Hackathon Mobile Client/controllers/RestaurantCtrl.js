'use strict';

app.controller('RestaurantController', [
                   '$scope', '$stateParams', 'RestaurantServices', function ($scope, $stateParams, RestaurantServices) {
                       $scope.retrieveRestaurants = retrieveRestaurants;
                       $scope.retrieveImage = retrieveImage;
                       $scope.retrieveSpecificRestaurant = retrieveSpecificRestaurant;
                       $scope.retrieveTemperature = retrieveTemperature;
                       $scope.retrieveHumidity = retrieveHumidity;
                       $scope.retrieveImageTags = retrieveImageTags;

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

                       function retrieveSpecificRestaurant() {
                           RestaurantServices.getSpecificRestaurant($stateParams.id)
                            .then(function (success) {
                                $scope.specificRestaurant = success.Result;
                            }, function (error) {
                                console.log(error);
                            })
                       }

                       function retrieveTemperature() {
                           RestaurantServices.getTemperature('https://agent.electricimp.com/Mpzd6FB1b85N?temp')
                               .then(function (headers) {
                                   $scope.temperature = headers()['restourant-temperature'];
                               }, function (error) {
                                   console.log(error);
                               })
                       }

                       function retrieveHumidity() {
                           RestaurantServices.getHumidity('https://agent.electricimp.com/Mpzd6FB1b85N?humidity')
                               .then(function (headers) {
                                   $scope.humidity = headers()['restourant-humidity'];
                               }, function (error) {
                                   console.log(error);
                               })
                       }

                       function retrieveImageTags() {
                           var imgUrl = 'http://chervenkovr.telerik-students.org/restaurant2.jpg';
                           RestaurantServices.getImageTags('https://agent.electricimp.com/Mpzd6FB1b85N?imagga=' + imgUrl)
                           .then(function (headers) {
                               var imageTags = JSON.parse(headers()['imagga-response']);
                               $scope.tags = imageTags.labels;
                           }, function (error) {
                               console.log(error);
                           })
                       }
                   }
               ]);