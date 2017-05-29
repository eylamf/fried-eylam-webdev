/**
 * Created by eylamfried on 5/28/17.
 */

(function () {
    angular
        .module('WAM')
        .factory('pageService', pageService);

    function pageService() {

        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];


        // crud operations
        var api = {
            createPage: createPage,
            findAllPagesForWebsite: findAllPagesForWebsite,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;

        function createPage(page) {
            page._id = (new Date()).getTime() + "";
            page.created = new Date();
            page.updated = new Date();
            pages.push(page);
        }

        function updatePage(pageId, newPageData) {

        }

        function deletePage(pageId) {
            var page = pages.find(function (page) {
                return page._id === pageId;
            });
            var index = pages.indexOf(page);
            pages.splice(index, 1);
        }

        function findPageById(pageId) {
            return pages.find(function (page) {
                return page._id === pageId;
            });
        }

        function findAllPagesForWebsite(websiteId) {
            var results = [];

            for (var p in pages) {
                if (pages[p].websiteId === websiteId) {
                    results.push(pages[p]);
                }
            }

            return results;
        }
    }

})();

