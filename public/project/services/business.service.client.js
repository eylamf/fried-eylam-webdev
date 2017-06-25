/**
 * Created by eylamfried on 6/24/17.
 */
(function () {
    angular
        .module('PROJ')
        .factory('businessService', businessService);

    function businessService($http) {

        var api = {
            createBusiness: createBusiness,
            findAllBusinessesForUser: findAllBusinessesForUser
        };
        return api;

        function findAllBusinessesForUser(userId) {
            var url = '/api/project/user/' + userId + '/business';
            return $http.get(url)
                .then(function (response) {
                    return response.data[0].businesses;
                });
        }

        function createBusiness(userId, business) {
            var url = '/api/project/user/'+userId+'/business';
            return $http.post(url, business)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();