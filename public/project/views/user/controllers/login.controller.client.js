/**
 * Created by eylamfried on 6/8/17.
 */

(function() {
    angular
        .module('PROJ')
        .controller('loginController', loginController);

    function loginController($location, userService) {

        var model = this;

        model.login = function(username, password) {

            if (username === null || username === '' || typeof username === 'undefined') {
                model.usernameError = 'Username is required';
                model.passError = null;
                model.message = null;
                return;
            }

            if (password === null || password === '' || typeof password === 'undefined') {
                model.passError = 'Password is required';
                model.usernameError = null;
                model.message = null;
                return;
            }

            model.usernameError = null;
            model.passError = null;

            userService
                .login(username, password)
                .then(function (user) {
                    if (user !== null) {
                        $location.url('/profile');
                    } else {
                        model.message = "Username " + username + " not found";
                    }
                }, function (err) {
                    model.message = "Username " + username + " not found";
                });

        };
    }

})();