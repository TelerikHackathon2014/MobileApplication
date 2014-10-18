app.controller('CheckCtrl', ['$scope', 'check', function ($scope, check, identity) {
    check.getCoordinates('https://agent.electricimp.com/Mpzd6FB1b85N?location')
    .then(function (headers) {
        var locationStr = headers()['location-data-restourant'].split(',');
        var deviceLatitude = locationStr[0] * 1;
        var deviceLongtitude = locationStr[1] * 1;

        console.log(deviceLatitude);
        console.log(deviceLongtitude);

        navigator.geolocation.getCurrentPosition(function (success) {
            var userLatitude = success.coords.latitude * 1;
            var userLongitude = success.coords.longitude * 1;

            console.log(success);

            // TODO: for presentation use same location
            var distance = check.calculateDistance(deviceLatitude, deviceLongtitude, userLatitude, userLongitude);
            $scope.isInRange = (distance <= 20 ? true : false);
        }, function (error) {
            console.log(error);
        });
    });
}]);