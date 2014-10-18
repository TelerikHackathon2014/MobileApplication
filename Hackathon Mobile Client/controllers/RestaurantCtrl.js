app.controller('RestaurantController', ['$scope', 'restaurantServices',
    function ($scope, restaurantServices) {
        $scope.restaurantInfo = restaurantInfo;

        function restaurantInfo() {
            restaurantServices.getRestaurantInfo()
                .then(function (success) {
                    console.log(success);
                }, function (error) {
                    console.log(error);
                })
        }
}])