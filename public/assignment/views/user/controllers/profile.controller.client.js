/**
 * Created by eylamfried on 5/27/17.
 */

(function() {
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController(currentUser, $location, $routeParams, userService) {
        // this is instead of using $scope
        var model = this;

        // hw 6
        var userId = currentUser._id;
        // var userId = $routeParams['userId'];

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        model.logout = logout;

        // refactored: get the promise from the server
        // userService
        //     .findUserById(userId)
        //     .then(renderUser);

        function init() {
            renderUser(currentUser);
        }
        init();

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }

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