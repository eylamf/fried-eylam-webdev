/**
 * Created by eylamfried on 6/8/17
 */

(function() {
    angular
        .module('PROJ')
        .controller('registerController', registerController);

    function registerController($location, userService) {
        // this is instead of using $scope
        var model = this;
        model.registerUser = registerUser;

        function init() {

        }
        init();

        function registerUser(username, password, password2) {

            // handle errors
            if (typeof password === 'undefined' || password === null || password === ''
                || typeof password2 === 'undefined' || password2 === null || password2 === ''
                || typeof username === 'undefined' || username === null || username === '') {
                model.error = "Please fill out all inputs";
                return;
            }

            if (password !== password2) {
                model.error = "Passwords must match";
                return;
            }

            var found = null;
            userService
                .findUserByUsername(username)
                .then(function (user) {
                    if (typeof user === 'undefined' || user === null) {
                        found = null;
                        var user = {
                            username: username,
                            password: password
                        };
                        userService
                            .register(user)
                            .then(function (user) {
                                $location.url('/profile');
                            });
                    } else {
                        found = user;
                        model.error = "Username is unavailable";
                    }
                }, function (err) {
                    var user = {
                        username: username,
                        password: password
                    };
                    userService
                        .register(user)
                        .then(function (user) {
                            $location.url('/profile');
                        });
                });
        }
    }

})();