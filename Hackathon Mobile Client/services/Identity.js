app.factory('identity', function() {

    return {
        userToken: '',
        isAuthenticated: function() {
            return !!this.userToken;
        },
        isAuthorizedForRole: function(role) {
            return !!this.userToken && this.userToken.roles.indexOf(role) > -1;
        }
    }
});