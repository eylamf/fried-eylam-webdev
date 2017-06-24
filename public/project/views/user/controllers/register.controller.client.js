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

        function registerUser(username, password, password2) {
            if (password !== password2) {
                model.error = "Passwords must match";
                return;
            }
            var found = null; //userService.findUserByUsername(username);

            if (found !== null) {
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
        }
    }

})();