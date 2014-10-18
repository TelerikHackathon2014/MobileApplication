app.controller('LoginCtrl', function ($scope, $ionicPopup, auth) {
    $scope.login = function (user) {
        user.grant_type = 'password';

        auth.login(user)
            .then(function (success) {

            }, function (error) {
                $ionicPopup.alert({
                    title: 'Login error!',
                    template: error.message
                });
            })
    }
})