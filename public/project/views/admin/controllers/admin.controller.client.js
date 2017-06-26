/**
 * Created by eylamfried on 6/25/17.
 */
(function () {
    angular
        .module('PROJ')
        .controller('adminController', adminController);

    function adminController(currentUser, userService) {
        var model = this;
        model.currentUser = currentUser;

        model.registerUser = registerUser;
        model.deleteUser = deleteUser;

        function init() {
            findAllUsers();
            model.newUser = {};
        }
        init();
        
        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(findAllUsers());
        }

        function findAllUsers() {
            userService
                .findAllUsers()
                .then(function (users) {
                    model.users = users;
                });
        }

        function registerUser(newUser) {
            var password = newUser.password;
            var password2 = newUser.password2;
            var username = newUser.username;
            // handle errors
            if (typeof password === 'undefined' || password === null || password === ''
                || typeof password2 === 'undefined' || password2 === null || password2 === ''
                || typeof username === 'undefined' || username === null || username === '') {
                model.error = "Please fill out all inputs";
                return;
            }

            if (password !== password2) {
                model.error = "Passwords must match";
                return;
            }

            var found = null;
            userService
                .findUserByUsername(username)
                .then(function (user) {
                    if (typeof user === 'undefined' || user === null) {
                        found = null;
                        var user = {
                            username: username,
                            password: password,
                            email: newUser.email,
                            firstName: newUser.firstName,
                            lastName: newUser.lastName,
                            favCity: newUser.favCity
                        };
                        userService
                            .register(user)
                            .then(function (user) {
                                console.log("succ");
                            });
                    } else {
                        found = user;
                        model.error = "Username is unavailable";
                    }
                }, function (err) {
                    var user = {
                        username: username,
                        password: password,
                        email: newUser.email,
                        firstName: newUser.firstName,
                        lastName: newUser.lastName,
                        favCity: newUser.favCity
                    };
                    userService
                        .createUser(user)
                        .then(function (user) {
                            model.message = "User created successfully";
                            model.newUser = {};
                        });
                });


        }


    }
})();



