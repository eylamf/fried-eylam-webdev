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


        model.deleteUser = deleteUser;
        model.logout = logout;
        model.seeDetails = seeDetails;
        model.cancelDetails = cancelDetails;
        model.removeBusiness = removeBusiness;

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
            findAllFriendsForUser(currentUser._id);
        }
        init();

        function removeBusiness(userId, business) {
            userService
                .removeBusiness(userId, business)
                .then(function (response) {
                    init();
                    model.selectedBusiness = null;
                });
        }

        function cancelDetails() {
            model.selectedBusiness = null;
        }

        function seeDetails(business) {
            model.selectedBusiness = business;

        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }

        function findAllFriendsForUser(userId) {
            userService
                .findAllFriendsForUser(userId)
                .then(function (friends) {
                    model.friends = friends;
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



    }

})();