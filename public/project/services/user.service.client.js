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
            updateUser: updateUser,
            deleteUser: deleteUser,
            addBusiness: addBusiness,
            findBusinessesByUserId: findBusinessesByUserId
        };
        return api;

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

        function addBusiness(userId, business) {
            var url = '/api/project/user/' + userId;
            return $http.post(url, business)
                .then(function (response) {
                    return response.data;
                })
        }
    }

})();
