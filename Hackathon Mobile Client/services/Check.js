app.factory('check', function ($http, $q, identity) {
    return {
        getCoordinates: function (url) {
            var deferred = $q.defer();

            $http.get(url)
                .success(function(data, status, headers) {
                    deferred.resolve(headers);
                })
                .error(function(error) {
                    deferred.reject(error);
                })

            return deferred.promise;
        },
        //calculateDistance: function (lat1, long1, lat2, long2) {
        //    console.log(lat1);
        //    console.log(long1);
        //    console.log(lat2);
        //    console.log(long2);
        //    // Translate to a distance
        //    var distance =
        //        Math.sin(lat1 * Math.PI) * Math.sin(lat2 * Math.PI) +
        //        Math.cos(lat1 * Math.PI) * Math.cos(lat2 * Math.PI) * Math.cos(Math.abs(long1 - long2) * Math.PI);

        //    // Return the distance in miles
        //    //return Math.acos(distance) * 3958.754;

        //    // Return the distance in meters
        //    return Math.acos(distance) * 6370981.162;
        //} //
        calculateDistance: function () {
            return 4;
        },
        postCheckIn: function (url, data, headers) {
            var deferred = $q.defer();

            $http.post(url, data, headers)
                .success(function (success) {
                    deferred.resolve(success);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }
    }
});