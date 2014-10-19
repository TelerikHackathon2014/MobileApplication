app.controller('MenuCtrl', function ($scope, $stateParams, $ionicPopup, $location, $rootScope, Menu) {
    $scope.menu = {};
    $scope.retrieveMenu = function () {
        Menu.getMenuByShopId({ 'Establishment': $stateParams.id }, { headers: { 'Authorization': 'Bearer ' + $rootScope.token } }).
            then(function (success) {
                $scope.menu.name = success.MenuName;

                Menu.getMenuEntries({ 'MenuId': success.Id }, { headers: { 'Authorization': 'Bearer ' + $rootScope.token } })
                .then(function (items) {
                    console.log(items);
                    $scope.menu.entries = items;
                }, function (error) {
                    console.log(error);
                })
            }, function (error) {
                console.log(error);
            });
    }
});