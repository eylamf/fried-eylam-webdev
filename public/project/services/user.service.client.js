/**
 * Created by eylamfried on 6/15/17.
 */

(function () {
    angular
        .module('PROJ')
        .factory('userService', userService);

    function userService($http) {

        // crud operations
        var api = {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            login: login,
            checkLoggedIn: checkLoggedIn,
            logout: logout,
            register: register,
            updateUser: updateUser,
            deleteUser: deleteUser,
            addBusiness: addBusiness,
            removeBusiness: removeBusiness,
            addFriend: addFriend,
            removeFriend: removeFriend,
            findBusinessesByUserId: findBusinessesByUserId,
            findAllFriendsForUser: findAllFriendsForUser
        };
        return api;

        function checkLoggedIn() {
            var url = '/api/project/checkLoggedIn';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function register(user) {
            var url = '/api/project/register';
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                })
        }
        
        function logout() {
            var url = '/api/project/logout';
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function login(username, password) {
            var url = '/api/project/login';
            var credentials = {
                username: username,
                password: password
            };
            return $http.post(url, credentials)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllFriendsForUser(userId) {
            var url = '/api/project/user/' +userId+ '/all-friends';
            return $http.get(url)
                .then(function (response) {
                    console.log('friends: ' + response.data);
                    return response.data[0]._friends;
                });
        }


        function findBusinessesByUserId(userId) {
            var url = '/api/project/user/' + userId;
            $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createUser(user) {
            // no primary key/id because we are creating a new user
            var url = '/api/project/user';
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });

        }

        function updateUser(userId, user) {
            var url = '/api/project/user/' + userId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteUser(userId) {
            var url = '/api/project/user/' + userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });

        }

        function findUserByUsername(username) {
            var url = "/api/project/user?username=" + username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

        }

        function findUserByCredentials(username, password) {

            var url = "/api/project/user?username=" + username + "&password=" + password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

        }

        function findUserById(userId) {
            var url = "/api/project/user/" + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

        }

        // function createBusiness(userId, business) {
        //     var url = '/api/project/user/' + userId;
        //     return $http.post(url, business)
        //         .then(function (response) {
        //             return response.data;
        //         });
        // }

        function removeFriend(userId, friend) {
            var url = '/api/project/user/'+userId+'/friend';
            return $http.delete(url, friend)
                .then(function (response) {
                    return response.data;
                });
        }

        function addFriend(userId, friend) {

            var url = '/api/project/user/'+ userId +'/friend';
            return $http.post(url, friend)
                .then(function (response) {
                    return response.data;
                });
        }

        function removeBusiness(userId, businessId) {
            var url = '/api/project/user/'+userId+'/business';
            return $http.delete(url, businessId)
                .then(function (response) {
                    return response.data;
                });
        }

        function addBusiness(userId, businessId) {
            var url = '/api/project/user/' + userId;
            return $http.post(url, businessId)
                .then(function (response) {
                    return response.data;
                });
        }
    }

})();
