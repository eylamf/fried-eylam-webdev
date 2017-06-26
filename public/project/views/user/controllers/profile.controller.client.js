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
        model.writeComment = writeComment;
        model.createComment = createComment;
        model.trashComment = trashComment;
        model.toggleComments = toggleComments;
        model.addFriend = addFriend;
        model.removeFriend = removeFriend;


        function init() {
            renderUser(currentUser);
            findAllBusinessesForUser(currentUser._id);
            findAllFriendsForUser(currentUser._id);
        }
        init();

        function removeFriend(userId, friend) {
            userService
                .removeFriend(userId, friend)
                .then(function (response) {
                    model.message = "Removed";
                    init();
                });
        }

        function addFriend(userId, friendUsername) {

            userService
                .findUserByUsername(friendUsername)
                .then(function (friend) {

                    if (userId === friend._id) {
                        return;
                    }

                    userService
                        .addFriend(userId, friend)
                        .then(function (response) {
                            model.message = "You are now following " + friend.username;
                            init();
                        });
                });


        }

        function createComment(businessId, comment) {
            comment.user = currentUser.username;
            comment.userId = currentUser._id;
            businessService
                .createComment(businessId, comment)
                .then(function (response) {
                    model.message = "Comment posted successfully";
                    model.commentEnabled = null;
                    init();
                });
        }

        function toggleComments() {
            model.comments = null;
            model.message = null;
        }

        function trashComment() {
            model.comment = null;
            model.commentEnabled = null;
            model.comments = null;
            model.message = null;
        }

        function writeComment() {
            model.commentEnabled = true;
        }

        function removeBusiness(userId, business) {
            userService
                .removeBusiness(userId, business)
                .then(function (response) {
                    model.selectedBusiness = null;
                    init();
                });
        }

        function cancelDetails() {
            model.selectedBusiness = null;
            model.message = null;
        }

        function seeDetails(business) {
            model.selectedBusiness = business;
            model.comments = business._comments;
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