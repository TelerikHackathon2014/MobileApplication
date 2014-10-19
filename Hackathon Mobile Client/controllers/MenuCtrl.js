app.controller('MenuCtrl', function ($scope, $ionicPopup, $location, $rootScope, Menu) {
    $scope.retrieveMenu = function () {
        Menu.getMenuByShopId().
            then(function (success) {

            }, function (error) {
            });
    }
});