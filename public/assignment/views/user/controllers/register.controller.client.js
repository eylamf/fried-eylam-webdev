/**
 * Created by eylamfried on 5/27/17.
 */

(function() {
    angular
        .module('WAM')
        .controller('registerController', registerController);

    function registerController($location, userService) {
        // this is instead of using $scope
        var model = this;


        // event handlers
        model.register = register;
        // implementations of event handlers
        function register(username, password, password2) {

            if (username === null || username === '' || typeof username === 'undefined') {
                model.usernameError = "Username required";
                model.passError = null;
                model.passError2 = null;
                model.error = null;
                return;
            }

            if (password === null || password === '' || typeof password === 'undefined') {
                model.usernameError = null;
                model.passError = "Password required";
                model.passError2 = null;
                model.error = null;
                return;
            }

            if (password2 === null || password2 === '' || typeof password2 === 'undefined') {
                model.usernameError = null;
                model.passError = null;
                model.passError2 = "Please verify your password";
                model.error = null;
                return;
            }

            model.usernameError = null;
            model.passError = null;
            model.passError2 = null;

            if (password !== password2) {
                model.error = "Passwords must match";
                return;
            }
            var found = null; //userService.findUserByUsername(username);

            if (found !== null || username === null) {
                model.error = "Username is not available";
            } else {
                var user = {
                    username: username,
                    password: password
                };
                userService
                    .register(user)
                    .then(function (user) {
                        $location.url('/profile');
                    });

            }

        };

    };

})();