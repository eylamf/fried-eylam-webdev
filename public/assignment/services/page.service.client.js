/**
 * Created by eylamfried on 5/28/17.
 */

(function () {
    angular
        .module('WAM')
        .factory('pageService', pageService);

    function pageService($http) {

        /*var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];*/


        // crud operations
        var api = {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;

        function createPage(websiteId, page) {
            var url = '/api/assignment/user/:userId/website/' + websiteId + '/page';
            return $http.post(url, page)
                .then(function (response) {
                    return response.data;
                });
            // page._id = (new Date()).getTime() + "";
            // page.created = new Date();
            // page.updated = new Date();
            // pages.push(page);
        }

        function updatePage(pageId, page) {

            var url = '/api/assignment/user/:userId/website/:websiteId/page/' + pageId;
            return $http.put(url, page)
                .then(function (response) {
                    return response.data;
                });

            /*var found = findPageById(pageId);

            var index = pages.indexOf(found);
            pages[index] = page;*/
        }

        function deletePage(pageId) {
            var url = '/api/assignment/user/:userId/website/:websiteId/page/' + pageId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });


            // var page = pages.find(function (page) {
            //     return page._id === pageId;
            // });
            // var index = pages.indexOf(page);
            // pages.splice(index, 1);
        }

        function findPageById(pageId) {
            var url = '/api/assignment/user/:userId/website/:websiteId/page/' + pageId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
            // return pages.find(function (page) {
            //     return page._id === pageId;
            // });
        }

        function findPageByWebsiteId(websiteId) {

            var url = '/api/assignment/user/:userId/website/' + websiteId + '/page';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });


            // old version

            // var results = [];
            //
            // for (var p in pages) {
            //     if (pages[p].websiteId === websiteId) {
            //         results.push(pages[p]);
            //     }
            // }
            //
            // return results;
        }
    }

})();

