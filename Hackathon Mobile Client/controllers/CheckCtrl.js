app.controller('CheckCtrl', ['$scope', '$rootScope', 'check', function ($scope, $rootScope, check, identity) {
    var userLatitude;
    var userLongitude;
    $scope.isCheckedIn = false;

    check.getCoordinates('https://agent.electricimp.com/Mpzd6FB1b85N?location')
    .then(function (headers) {
        var locationStr = headers()['location-data-restourant'].split(',');
        var deviceLatitude = locationStr[0] * 1;
        var deviceLongtitude = locationStr[1] * 1;

        navigator.geolocation.getCurrentPosition(function (success) {
            userLatitude = success.coords.latitude * 1;
            userLongitude = success.coords.longitude * 1;

            // TODO: for presentation use same location
            var distance = check.calculateDistance(deviceLatitude, deviceLongtitude, userLatitude, userLongitude);
            $scope.isInRange = (distance <= 20 ? true : false);
        }, function (error) {
            console.log(error);
        });
    });

    $scope.checkIn = function () {
        check.postCheckIn('http://api.everlive.com/v1/ISDTe40ezNnnMAmk/CheckIns', { longitude: userLongitude, latitude: userLatitude }, { headers: { 'Authorization': 'Bearer ' + $rootScope.token } })
        .then(function (success) {
            $scope.isCheckedIn = true;
            console.log($scope.isCheckedIn);

            check.getOrder().then(function (success) { console.log('beep'); console.log(success); }, function (error) { });
        }, function(error) {
            console.log(error);
        });
    }
}]);