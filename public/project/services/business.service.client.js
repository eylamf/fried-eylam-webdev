/**
 * Created by eylamfried on 6/24/17.
 */

(function () {
    angular
        .module('PROJ')
        .factory('businessService', businessService);

    function businessService($http) {
        var api = {
            createBusiness: createBusiness
        };
        return api;

        function createBusiness(userId, business) {
            var url = '/api/project/user/' + userId;
            return $http.post(url, business)
                .then(function (response) {
                    return response.data;
                });
        }
    }

})();