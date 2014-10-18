app.controller('LoginCtrl', function ($scope, $ionicPopup, $location, auth, identity) {
    $scope.login = function (user) {
        user.grant_type = 'password';

        auth.login(user)
            .then(function (success) {
                identity.userToken = success.Result.access_token;
                $location.path('/restaurants');
            }, function (error) {
                $ionicPopup.alert({
                    title: 'Login error!',
                    template: error.message
                });
            })
    }
});