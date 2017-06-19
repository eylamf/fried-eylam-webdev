/**
 * Created by eylamfried on 5/28/17.
 */

(function () {
    angular
        .module('WAM')
        .controller('pageEditController', pageEditController);


    function pageEditController($routeParams, pageService, $location) {

        // this is instead of using $scope
        var model = this;

        // event handlers
        model.websiteId = $routeParams['websiteId'];
        model.userId = $routeParams['userId'];
        model.pageId = $routeParams['pageId'];
        // model.createPage = createPage;
        model.deletePage = deletePage;
        model.updatePage = updatePage;

        // this needs to execute at startup
        function init() {

            pageService
                .findPageByWebsiteId(model.websiteId)
                .then(function (pages) {
                    model.pages = pages;
                });

            pageService
                .findPageById(model.pageId)
                .then(function (page) {
                    model.page = page;
                });

        }
        init();

        // implementations
        /*function createPage(websiteId, page) {
            pageService
                .createPage(websiteId, page)
                .then(function (response) {
                    $location.url('/user/' + model.userId + '/website/' + websiteId
                        + '/page');
                });


            // page.websiteId = model.websiteId;
            // pageService.createPage(page);
            // $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');


        }
        */

        function updatePage(pageId, page) {

            if (typeof page === 'undefined') {
                model.nameErr = "Please provide a name for this page";
                return;
            }

            if (page.name === null || page.name === '' || typeof page.name === 'undefined') {
                model.nameErr = "Please provide a name for this page";
                return;
            }

            model.pageErr = null;

            pageService
                .updatePage(pageId, page)
                .then(function (response) {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
                });

            // pageService.updatePage(pageId);
            // $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
        }

        function deletePage(pageId) {

            pageService
                .deletePage(pageId)
                .then(function (response) {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
                });

            // pageService.deletePage(pageId);
            // $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
        }


    }



})();