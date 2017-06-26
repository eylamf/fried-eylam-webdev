/**
 * Created by eylamfried on 6/24/17.
 */

(function () {
    angular
        .module('PROJ')
        .controller('accountController', accountController);

    function accountController(currentUser, $location, userService) {
        var model = this;

        model.updateUser = updateUser;
        model.unregister = unregister;


        function init() {
            model.currentUser = currentUser;
            model.userCopy = currentUser;
        }
        init();

        function unregister() {
            userService
                .unregister()
                .then(function () {
                    $location.url('/login');
                }, function () {
                    model.error = "Error occurred";
                });
        }

        function updateUser(user) {
            userService
                .updateUser(user._id, user)
                .then(function () {
                    model.message = "Account updated successfully";

                });
        }
    }
})();