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

        // this needs to execute at startup
        function init() {
            model.pages = pageService.findPageByWebsiteId(model.websiteId);
        }
        init();

        // implementations
        function createPage(page) {
            page.websiteId = model.websiteId;
            pageService.createPage(page);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
        }
    }



})();