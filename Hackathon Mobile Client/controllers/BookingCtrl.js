'use strict';

app.controller('BookingCtrl', [
                   '$scope', 'bookingServices', function ($scope, bookingServices) {
                        $scope.bookingInfo = bookingInfo;
                        $scope.book = book;
                        
                        function book(booking) {                            
                            bookingServices.book(booking)
                                .then(function (success) {
                                    $location.path('/restaurants');
                                }, function (error) {
                                    $ionicPopup.alert({
                                        title: 'Booking error!',
                                        template: error.message
                                    });
                                })
                        }
                    
                        function bookingInfo() {
                            bookingServices.getBookingInfo()
                                .then(function (success) {
                                    console.log(success);
                                }, function (error) {
                                    console.log(error);
                                })
                        }     
                   }
               ]);