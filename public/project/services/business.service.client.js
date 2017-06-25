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
            findAllBusinessesForUser: findAllBusinessesForUser,
            createComment: createComment
        };
        return api;

        function createComment(businessId, comment) {
            var url = '/api/project/business/'+businessId;
            return $http.post(url, comment)
                .then(function (response) {
                    return response.data;
                });
        }

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