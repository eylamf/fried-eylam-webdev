/**
 * Created by eylamfried on 5/28/17.
 */

(function () {
    angular
        .module('WAM')
        .factory('websiteService', websiteService);

    function websiteService($http, $routeParams) {

        /*var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];*/

        // crud operations
        var api = {
            createWebsite: createWebsite,
            findAllWebsitesForUser: findAllWebsitesForUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;

        function createWebsite(userId, website) {

            var url = '/api/assignment/user/' + userId +  '/website';
            return $http.post(url, website)
                .then(function (response) {
                    return response.data;
                });

            // website._id = (new Date()).getTime() + "";
            // website.created = new Date();
            // website.updated = new Date();
            // websites.push(website);
        }

        function updateWebsite(websiteId, website) {
            var url = '/api/assignment/user/:userId/website/' + websiteId;
            return $http.put(url, website)
                .then(function (response) {
                    console.log(response.data);
                    return response.data;
                });
            /*var found = findWebsiteById(websiteId);

            var index = websites.indexOf(found);
            websites[index] = website;*/
        }

        function deleteWebsite(websiteId) {
            var url = '/api/assignment/user/:userId/website/' + websiteId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
            // var website = websites.find(function (website) {
            //     return website._id === websiteId;
            // });
            // var index = websites.indexOf(website);
            // websites.splice(index, 1);
        }

        function findWebsiteById(websiteId) {
            var url = '/api/assignment/user/:userId/website/' + websiteId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

            /*
            return websites.find(function (website) {
                return website._id === websiteId;
            });*/

        }

        function findAllWebsitesForUser(userId) {
            var url = '/api/assignment/user/' + userId + '/website';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

            // old
            // var results = [];
            //
            // for (var w in websites) {
            //     if (websites[w].developerId === userId) {
            //         results.push(websites[w]);
            //     }
            // }
            // return results;
        };
    }

})();
