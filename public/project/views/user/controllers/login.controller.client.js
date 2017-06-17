/**
 * Created by eylamfried on 6/8/17.
 */

(function() {
    angular
        .module('PROJ')
        .controller('loginController', loginController);

    function loginController($location, userService) {

        var model = this;

        model.loginUser = function (username, password) {
            userService
                .findUserByCredentials(username, password)
                .then(function (user) {
                    if (user !== null) {
                        $location.url('/user/' + user._id);
                    } else {
                        model.message = "Username " + username + " not found";
                    }
                }, function (err) {
                    model.message = "Username " + username + " not found";
                });
        };
    }

})();