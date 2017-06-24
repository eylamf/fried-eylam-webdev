/**
 * Created by eylamfried on 6/16/17.
 */

(function() {
    angular
        .module('PROJ')
        .controller('profileController', profileController);

    function profileController(currentUser, $location, $routeParams, userService, businessService) {
        // this is instead of using $scope
        var model = this;

        var userId = currentUser._id;

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;

        // refactored: get the promise from the server
        // userService
        //     .findUserById(userId)
        //     .then(function (user) {
        //         model.user = user;
        //         model.businesses = user.businesses;
        //     });
        
        function init() {
            renderUser(currentUser);
            findAllBusinessesForUser(currentUser._id);
        }
        init();

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }

        function findAllBusinessesForUser(userId) {
            businessService
                .findAllBusinessesForUser(userId)
                .then(function (businesses) {
                    model.businesses = businesses;
                });
        }
        
        function renderUser(user) {
            model.user = user;
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


    }

})();