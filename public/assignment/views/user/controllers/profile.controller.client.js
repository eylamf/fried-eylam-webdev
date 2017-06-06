/**
 * Created by eylamfried on 5/27/17.
 */

(function() {
    angular
        .module('WAM')
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
            .then(renderUser);


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

        // this comes from the controller
        function renderUser(user) {
            model.user = user;
        }
        // model.user = userService.findUserById(userId);

    }

})();