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