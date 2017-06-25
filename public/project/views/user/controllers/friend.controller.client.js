/**
 * Created by eylamfried on 6/24/17.
 */

(function () {
    angular
        .module('PROJ')
        .controller('friendController', friendController);

    function friendController(currentUser, $location, userService) {
        var model = this;
        var userId = currentUser._id;

        model.findUserByUsername = findUserByUsername;
        model.addFriend = addFriend;

        function init() {
            model.currentUser = currentUser;
        }
        init();

        function addFriend(userId, friend) {
            userService
                .addFriend(userId, friend)
                .then(function (response) {
                    model.found = "You are now following " + friend.username;
                }, function (err) {
                    model.found = null;
                });
        }

        function findUserByUsername(username) {
            userService
                .findUserByUsername(username)
                .then(function (user) {
                    // check to see if you are already following this user or if its you
                    if (currentUser._friends.indexOf(user._id) > -1 || user._id === currentUser._id) {
                        model.found = "You are already following this user";
                        model.error = null;
                    } else {
                        model.found = null;
                        model.error = null;
                        model.suggestedFriend = user;
                    }
                }, function (err) {
                    model.error = "Could not find a user with this username";
                    model.found = null;
                });
        }
    }

})();