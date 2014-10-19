app.controller('ProfileCtrl', function ($scope, $stateParams, $ionicPopup, $location, $rootScope, Profile) {
    $scope.getUser = function(){
        Profile.getUser({ headers: { 'Authorization': 'Bearer ' + $rootScope.token } })
        .then(function (success) {
            console.dir(success.Result);
            $scope.user = success.Result;
        }, function (error) {
            console.log(error);
        });
        console.log($scope.user);
    }
});