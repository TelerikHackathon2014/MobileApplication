app.factory('bookingServices', ['$http', '$q', function($http, $q) {
    var bookingApi = 'http://api.everlive.com/v1/ISDTe40ezNnnMAmk/';

    return {
        getBookingInfo: function() {
            var deferred = $q.defer();

            $http.get(bookingApi)
                .success(function (success) {
                    deferred.resolve(success);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        },
        book: function (bookingInfo) {
            var deferred = $q.defer();

            $http.post(bookingApi + 'Booking', bookingInfo)
                .success(function (success) {
                    deferred.resolve(success);
                })
                .error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }
    }
}])