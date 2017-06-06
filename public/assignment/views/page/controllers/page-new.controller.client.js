/**
 * Created by eylamfried on 5/28/17.
 */

(function () {
    angular
        .module('WAM')
        .controller('pageNewController', pageNewController);


    function pageNewController($routeParams, pageService, $location) {

        // this is instead of using $scope
        var model = this;

        // event handlers
        model.websiteId = $routeParams['websiteId'];
        model.userId = $routeParams['userId'];
        model.createPage = createPage;
        model.updatePage = updatePage;

        // this needs to execute at startup
        function init() {
            pageService
                .findPageByWebsiteId(model.websiteId)
                .then(function (pages) {
                    model.pages = pages;
                });


        }
        init();

        // implementations
        function createPage(websiteId, page) {
            pageService
                .createPage(websiteId, page)
                .then(function (response) {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
                });

            // page.websiteId = model.websiteId;
            // pageService.createPage(page);
            // $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
        }

        function updatePage(pageId) {
            pageService.updatePage(pageId);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
        }
    }



})();