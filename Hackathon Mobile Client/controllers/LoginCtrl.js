app.controller('LoginCtrl', function ($scope, $ionicPopup, $location, $rootScope, auth, identity) {
    $scope.login = function (user) {
        user.grant_type = 'password';

        auth.login(user)
            .then(function (success) {
                $rootScope.token = success.Result.access_token;
                $location.path('/restaurants');
            }, function (error) {
                $ionicPopup.alert({
                    title: 'Login error!',
                    template: error.message
                });
            })
    }
});