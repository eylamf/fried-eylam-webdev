/**
 * Created by eylamfried on 6/16/17.
 */

(function() {
    angular
        .module('PROJ')
        .controller('profileController', profileController);

    function profileController($location, $routeParams, userService) {
        // this is instead of using $scope
        var model = this;

        var userId = $routeParams['userId'];

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        // refactored: get the promise from the server
        userService
            .findUserById(userId)
            .then(function (user) {
                model.user = user;
                model.businesses = user.businesses;
            });

        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(function () {
                    $location.url('/login');
                });
        }
        function updateUser(user) {
            userService
                .updateUser(user._id, user)
                .then(function () {
                    model.message = "User updated successfully";
                });
        }


    }

})();