/**
 * Created by eylamfried on 5/28/17.
 */

(function () {
    angular
        .module('WAM')
        .factory('userService', userService);

    function userService($http) {

        // var users = [
        //     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        //     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        //     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        // ];

        // crud operations
        var api = {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findAllUsers: findAllUsers,
            login: login,
            logout: logout,
            register: register,
            checkLoggedIn: checkLoggedIn,
            checkAdmin: checkAdmin,
            updateUser: updateUser,
            deleteUser: deleteUser,
            unregister: unregister
        };
        return api;

        function register(user) {
            var url = '/api/assignment/register';
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function logout() {
            var url = '/api/assignment/logout';
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function checkLoggedIn() {
            var url = '/api/assignment/checkLoggedIn';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function checkAdmin() {
            var url = '/api/assignment/checkAdmin';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function login(username, password) {
            var url = '/api/assignment/login';
            var credentials = {
                username: username,
                password: password
            };
            return $http.post(url, credentials)
                .then(function (response) {
                    return response.data;
                });
        }

        function createUser(user) {
            // no primary key/id because we are creating a new user
            var url = '/api/assignment/user';
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });

            // old method

            // user._id = (new Date()).getTime() + "";
            // users.push(user);
        }

        function updateUser(userId, user) {
            var url = '/api/assignment/user/' + userId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function unregister(userObj) {
            var url = '/api/assignment/unregister';
            return $http.post(url, userObj)
                .then(function (response) {
                    return response.data;
                });

            // old

            // var user = users.find(function (user) {
            //     return user._id === userId;
            // });
            // var index = users.indexOf(user);
            // users.splice(index, 1);
        }

        function deleteUser(userId) {
            var url = '/api/assignment/user/' + userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });

            // old

            // var user = users.find(function (user) {
            //     return user._id === userId;
            // });
            // var index = users.indexOf(user);
            // users.splice(index, 1);
        }

        function findUserByUsername(username) {
            var url = "/api/assignment/user?username=" + username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

            /*var user = users.find(function (user) {
                return user.username === username;
            });
            if (typeof user === 'undefined') {
                return null;
            } else {
                return user;
            }*/
        }

        function findAllUsers(username, password) {
            var url = "/api/assignment/user";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByCredentials(username, password) {

            var url = "/api/assignment/user?username=" + username + "&password=" + password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

            // old version

            // for (var u in users) {
            //     var user = users[u];
            //     if (user.username === username && user.password === password) {
            //         return user;
            //     }
            // }
            // return null;
        }

        function findUserById(userId) {
            // return users.find(function (user) {
            //     return user._id === userId;
            // });

            // refactor so that instead, go to the server
            var url = "/api/assignment/user/" + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

        }
    }

})();
