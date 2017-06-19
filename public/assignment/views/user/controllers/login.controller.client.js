/**
 * Created by eylamfried on 5/27/17.
 */

(function() {
    angular
        .module('WAM')
        .controller('loginController', loginController);

    function loginController($location, userService) {
        // this is instead of using $scope
        var model = this;



        model.login = function(username, password) {

            // var found = userService.findUserByCredentials(username, password);
            userService
                // .findUserByCredentials(username, password)
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


            /*function handleError(error) {
                model.message = "Username " + username + " not found";
            }

            function loginUser(found) {
                if (found !== null) {
                    $location.url('/user/' + found._id);
                    // $scope.message = "Welcome " + username;
                } else {
                    model.message = "Username " + username + " not found";
                }
            }*/

        };

    }

})();