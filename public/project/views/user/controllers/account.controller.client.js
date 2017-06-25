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

        function init() {
            model.currentUser = currentUser;
            model.userCopy = currentUser;
        }
        init();


        function updateUser(user) {
            userService
                .updateUser(user._id, user)
                .then(function () {
                    model.message = "Account updated successfully";

                });
        }
    }
})();