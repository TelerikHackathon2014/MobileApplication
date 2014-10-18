'use strict';

app.controller('RegisterCtrl', [
                   '$scope', '$location', function ($scope, $location) {
                       $scope.alert = function () {
                           console.log('before');
                           $location.path('/restaurants');
                           console.log('after');
                           //$ionicPopup.alert({
                           //    title: 'Successfull login',
                           //    template: error.message
                           //});
                       }
                   }
]);