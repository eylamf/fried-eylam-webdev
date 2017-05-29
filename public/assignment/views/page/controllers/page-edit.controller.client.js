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
        model.createPage = createPage;
        model.deletePage = deletePage;

        // this needs to execute at startup
        function init() {
            model.pages = pageService.findAllPagesForWebsite(model.websiteId);
            model.page = pageService.findPageById(model.pageId);
        }
        init();

        // implementations
        function createPage(page) {
            page.websiteId = model.websiteId;
            pageService.createPage(page);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
        }

        function deletePage(pageId) {
            pageService.deletePage(pageId);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
        }


    }



})();